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
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Immigration Policy Advisory</title>
          </head>
          <body style="margin: 0; padding: 20px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border: 1px solid #fee2e2;">
              <!-- Red Header Stripe -->
              <div style="height: 6px; background-color: #dc2626;"></div>
              
              <!-- Brand Header -->
              <div style="padding: 28px 24px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                <span style="font-size: 20px; font-weight: 800; color: #1e3a8a; letter-spacing: 2px; text-transform: uppercase;">
                  EIKON PETERS
                </span>
                <div style="font-size: 9px; font-weight: 600; color: #ca8a04; letter-spacing: 3px; margin-top: 4px; text-transform: uppercase;">
                  Immigration Services
                </div>
              </div>

              <!-- Banner -->
              <div style="background-color: #fef2f2; padding: 24px; text-align: center; border-bottom: 1px solid #fee2e2;">
                <h2 style="margin: 0; font-size: 16px; font-weight: 800; color: #dc2626; letter-spacing: 1px; text-transform: uppercase;">
                  ⚠️ IMMIGRATION POLICY ADVISORY
                </h2>
              </div>

              <!-- Content Area -->
              <div style="padding: 36px 32px 32px 32px; color: #334155; font-size: 15px; line-height: 1.7;">
                <p style="margin: 0 0 20px 0; font-size: 15px; font-weight: 700; color: #0f172a;">Dear ${name},</p>
                <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; margin: 0 0 24px 0; border-radius: 8px; font-size: 14px; color: #b45309; line-height: 1.6;">
                  <strong>Important Notice:</strong> Please read this update regarding recent visa regulation adjustments and timeline requirements.
                </div>
                <div style="color: #475569;">${formattedContent}</div>
                
                <!-- Call to action button -->
                <div style="text-align: center; margin-top: 32px; margin-bottom: 8px;">
                  <a href="https://www.eikonpetersimmigration.com/services" style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 12px 28px; font-weight: bold; border-radius: 8px; font-size: 14px; transition: all 0.2s;">
                    Verify My Visa Route
                  </a>
                </div>

                <!-- Signature -->
                <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid #f1f5f9;">
                  <p style="margin: 0; font-size: 14px; color: #475569; font-weight: 600;">Best regards,</p>
                  <p style="margin: 4px 0 0 0; font-size: 14px; color: #0f172a; font-weight: 800;">The Eikon Peters Team</p>
                  <p style="margin: 2px 0 0 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">UK Regulated Advisors</p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #f8fafc; padding: 28px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; line-height: 1.6;">
                <p style="margin: 0 0 8px 0; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Eikon Peters Immigration Services Ltd</p>
                <p style="margin: 0 0 16px 0; color: #94a3b8;">Regulated by the Immigration Advice Authority (IAA) to provide Level 1 services.</p>
                <div style="margin: 16px 0; border-top: 1px dashed #e2e8f0; height: 1px;"></div>
                <p style="margin: 0 0 4px 0;">&copy; ${currentYear} Eikon Peters. All rights reserved.</p>
                <p style="margin: 0; color: #94a3b8;">You are receiving this official advisory as a registered client or subscriber. If you wish to unsubscribe, please reply directly to this email.</p>
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
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Eikon Peters Immigration Updates</title>
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
            <!-- Gold Header Stripe -->
            <div style="height: 6px; background-color: #eab308;"></div>
            
            <!-- Brand Header -->
            <div style="padding: 28px 24px; text-align: center; border-bottom: 1px solid #f1f5f9;">
              <span style="font-size: 20px; font-weight: 800; color: #1e3a8a; letter-spacing: 2px; text-transform: uppercase;">
                EIKON PETERS
              </span>
              <div style="font-size: 9px; font-weight: 600; color: #ca8a04; letter-spacing: 3px; margin-top: 4px; text-transform: uppercase;">
                Immigration Services
              </div>
            </div>

            <!-- Banner -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-bottom: 1px solid #e2e8f0;">
              <h2 style="margin: 0; font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
                Weekly Portal &amp; Visa Updates
              </h2>
            </div>

            <!-- Content Area -->
            <div style="padding: 36px 32px 32px 32px; color: #334155; font-size: 15px; line-height: 1.7;">
              <p style="margin: 0 0 20px 0; font-size: 15px; font-weight: 700; color: #0f172a;">Dear ${name},</p>
              <div style="color: #475569;">${formattedContent}</div>
              
              <!-- Call to action button -->
              <div style="text-align: center; margin-top: 32px; margin-bottom: 8px;">
                <a href="https://www.eikonpetersimmigration.com/guides" style="display: inline-block; background-color: #eab308; color: #ffffff; text-decoration: none; padding: 12px 28px; font-weight: bold; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(234, 179, 8, 0.2); transition: all 0.2s;">
                  Browse Immigration Guides
                </a>
              </div>

              <!-- Signature -->
              <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid #f1f5f9;">
                <p style="margin: 0; font-size: 14px; color: #475569; font-weight: 600;">Best regards,</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #0f172a; font-weight: 800;">The Eikon Peters Team</p>
                <p style="margin: 2px 0 0 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">UK Regulated Advisors</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 28px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; line-height: 1.6;">
              <p style="margin: 0 0 8px 0; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Eikon Peters Immigration Services Ltd</p>
              <p style="margin: 0 0 16px 0; color: #94a3b8;">Regulated by the Immigration Advice Authority (IAA) to provide Level 1 services.</p>
              <div style="margin: 16px 0; border-top: 1px dashed #e2e8f0; height: 1px;"></div>
              <p style="margin: 0 0 4px 0;">&copy; ${currentYear} Eikon Peters. All rights reserved.</p>
              <p style="margin: 0; color: #94a3b8;">You received this email because you are subscribed to our newsletter or requested a guide. If you wish to unsubscribe, please reply directly to this email.</p>
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
