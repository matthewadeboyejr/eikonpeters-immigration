import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, booked_date, message } = body;

    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME || "Eikon Peters Immigration";
    const receiverEmail = process.env.BREVO_RECEIVER_EMAIL;

    // Check configuration
    if (!apiKey || apiKey === "your_brevo_api_key_here") {
      console.warn("Brevo API key is not configured in .env.local.");
      return NextResponse.json(
        { error: "Brevo API is not fully configured on the server." },
        { status: 500 }
      );
    }

    if (!senderEmail || senderEmail === "your_verified_sender_email_here") {
      console.warn("Brevo Sender Email is not configured in .env.local.");
      return NextResponse.json(
        { error: "Brevo Sender Email is not configured." },
        { status: 500 }
      );
    }

    // 1. Send Admin Notification Email
    const adminEmailPayload = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: receiverEmail || senderEmail, name: "Eikon Peters Admin" }],
      subject: `New Consultation Booking Request - ${name}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
            .header { background: #1e3a8a; color: white; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 20px; }
            .content { padding: 24px; }
            .field-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            .field-table th, .field-table td { padding: 12px; text-align: left; border-bottom: 1px solid #f3f4f6; }
            .field-table th { color: #4b5563; font-weight: 600; width: 35%; }
            .field-table td { color: #111827; }
            .message-box { background: #f9fafb; border-left: 4px solid #f59e0b; padding: 16px; margin-top: 16px; border-radius: 4px; }
            .footer { background: #f3f4f6; text-align: center; padding: 12px; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Appointment Booking Request</h1>
            </div>
            <div class="content">
              <p>A user has requested a consultation call. Here are the details:</p>
              <table class="field-table">
                <tr><th>Full Name</th><td>${name}</td></tr>
                <tr><th>Email</th><td><a href="mailto:${email}">${email}</a></td></tr>
                <tr><th>Phone Number</th><td><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><th>Service</th><td>${service}</td></tr>
                <tr><th>Preferred Date</th><td>${date}</td></tr>
                <tr><th>Preferred Time</th><td>${time}</td></tr>
                <tr><th>Booked Date</th><td>${booked_date}</td></tr>
              </table>
              <div class="message-box">
                <strong>Message:</strong><br>
                ${message ? message.replace(/\n/g, "<br>") : "No message provided."}
              </div>
            </div>
            <div class="footer">
              <p>Eikon Peters Immigration Portal</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 2. Send Client Confirmation Email
    const clientEmailPayload = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: email, name: name }],
      subject: `Consultation Booking Confirmed - Eikon Immigration`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
            .header { background: #f59e0b; color: white; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 20px; }
            .content { padding: 24px; }
            .details { background: #f3f4f6; border-radius: 8px; padding: 16px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e5e7eb; }
            .detail-row:last-child { border-bottom: none; }
            .detail-label { font-weight: 600; color: #4b5563; }
            .detail-value { color: #111827; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; border-top: 1px solid #f3f4f6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Consultation Booking Confirmed</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for requesting a consultation callback with <strong>Eikon Peters Immigration</strong>. We have received your request and have reserved your preferred appointment slot.</p>
              
              <div class="details">
                <div class="detail-row">
                  <span class="detail-label">Service</span>
                  <span class="detail-value">${service}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Preferred Date</span>
                  <span class="detail-value">${date}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Preferred Time</span>
                  <span class="detail-value">${time}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Your Phone Number</span>
                  <span class="detail-value">${phone}</span>
                </div>
              </div>
              
              <p>One of our visa and immigration experts will connect with you via phone at the scheduled time to discuss your case details.</p>
              <p>If you need to make any changes or have urgent questions, please feel free to reply to this email.</p>
              
              <p>Best regards,<br><strong>The Eikon Peters Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Eikon Peters Immigration Services. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send emails sequentially to Brevo SMTP endpoint
    const sendBrevoEmail = async (payload) => {
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
        throw new Error(`Brevo API returned status ${response.status}: ${errText}`);
      }

      return response.json();
    };

    // Send to admin
    await sendBrevoEmail(adminEmailPayload);
    // Send to client
    await sendBrevoEmail(clientEmailPayload);

    return NextResponse.json({ success: true, message: "Emails sent successfully via Brevo." });
  } catch (error) {
    console.error("Error in contact route handler:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
