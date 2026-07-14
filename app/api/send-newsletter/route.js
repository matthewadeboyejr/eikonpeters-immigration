import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { recipients, subject, body, templateType } = await request.json();

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: "Recipients list is required." }, { status: 400 });
    }
    if (!subject || !body) {
      return NextResponse.json({ error: "Subject and body are required." }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME || "Eikon Peters Immigration";

    if (!apiKey || apiKey === "your_brevo_api_key_here" || !senderEmail) {
      return NextResponse.json(
        { error: "Brevo SMTP is not fully configured on the server." },
        { status: 500 }
      );
    }

    // Helper to wrap the custom body into a premium styled HTML template
    const wrapInTemplate = (content, name, type) => {
      const currentYear = new Date().getFullYear();
      
      const formattedContent = content.replace(/\n/g, "<br>");

      if (type === "advisory") {
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; border: 1px solid #fecaca; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
              .header { background: #dc2626; color: white; padding: 24px; text-align: center; }
              .header h1 { margin: 0; font-size: 20px; font-weight: 800; tracking-wide }
              .content { padding: 32px 24px; background: #fff; }
              .callout { bg-red-50; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0; background-color: #fef2f2; border-radius: 4px; color: #991b1b; }
              .footer { text-align: center; padding: 24px; font-size: 11px; color: #6b7280; border-top: 1px solid #f3f4f6; background: #f9fafb; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>IMMIGRATION POLICY ADVISORY</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <div class="callout">
                  <strong>Important Notice:</strong> Please read this update regarding recent visa regulation adjustments and timeline requirements.
                </div>
                <div>${formattedContent}</div>
                <p style="margin-top: 30px;">Best regards,<br><strong>The Eikon Peters Team</strong></p>
              </div>
              <div class="footer">
                <p>&copy; ${currentYear} Eikon Peters Immigration Services. All rights reserved.</p>
                <p>You are receiving this official advisory as a registered client or subscriber.</p>
              </div>
            </div>
          </body>
          </html>
        `;
      }

      // Default / General Template
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
            .header { background: #1e3a8a; color: white; padding: 32px 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 800; }
            .content { padding: 32px 24px; background: #fff; }
            .footer { text-align: center; padding: 24px; font-size: 11px; color: #6b7280; border-top: 1px solid #f3f4f6; background: #f9fafb; }
            .btn { display: inline-block; background: #eab308; color: white; text-decoration: none; padding: 12px 24px; font-weight: bold; border-radius: 8px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Eikon Peters Immigration Updates</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <div>${formattedContent}</div>
              <p style="margin-top: 30px;">Best regards,<br><strong>The Eikon Peters Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${currentYear} Eikon Peters Immigration Services. All rights reserved.</p>
              <p>You received this email because you are subscribed to our newsletter or requested a guide.</p>
            </div>
          </div>
        </body>
        </html>
      `;
    };

    // Send emails sequentially or in parallel batches
    // To protect API rate limits and isolate failures, we process in parallel mapping
    const sendPromises = recipients.map(async (recipient) => {
      const payload = {
        sender: { name: senderName, email: senderEmail },
        to: [{ email: recipient.email, name: recipient.name || "Subscriber" }],
        subject: subject,
        htmlContent: wrapInTemplate(body, recipient.name || "Subscriber", templateType),
      };

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to send to ${recipient.email}: ${response.status} ${errText}`);
      }

      return { email: recipient.email, status: "success" };
    });

    const results = await Promise.allSettled(sendPromises);

    const failures = results
      .filter((r) => r.status === "rejected")
      .map((r) => r.reason.message || "Unknown error");

    if (failures.length > 0) {
      console.warn("Some newsletter deliveries failed:", failures);
      return NextResponse.json({
        success: failures.length < recipients.length,
        message: `Delivered ${recipients.length - failures.length} of ${recipients.length} emails.`,
        errors: failures,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully sent newsletter to ${recipients.length} recipients.`,
    });
  } catch (error) {
    console.error("Error in send-newsletter API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process newsletter campaign." },
      { status: 500 }
    );
  }
}
