import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // 1. Insert into Supabase leads table
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Database configuration is missing." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if the user is already subscribed under the 'Newsletter Subscription' category
    const { data: existingLead, error: checkError } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .eq("guide", "Newsletter Subscription")
      .maybeSingle();

    if (checkError) {
      console.error("Error checking existing subscription:", checkError);
    }

    if (existingLead) {
      return NextResponse.json({
        success: true,
        message: "You are already subscribed to our newsletter!",
      });
    }

    const { error: insertError } = await supabase.from("leads").insert({
      name: "Newsletter Subscriber",
      email: email,
      guide: "Newsletter Subscription",
      status: "New",
    });

    if (insertError) {
      console.error("Error inserting lead:", insertError);
      return NextResponse.json(
        { error: "Failed to save subscription. Please try again." },
        { status: 500 }
      );
    }

    // 2. Send Welcome Email via Brevo
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME || "Eikon Peters Immigration";

    if (apiKey && senderEmail && apiKey !== "your_brevo_api_key_here") {
      try {
        const welcomeEmailPayload = {
          sender: { name: senderName, email: senderEmail },
          to: [{ email: email, name: "Subscriber" }],
          subject: "Welcome to Eikon Peters Immigration Updates!",
          htmlContent: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
                .header { background: #1e3a8a; color: white; padding: 32px 24px; text-align: center; }
                .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
                .content { padding: 32px 24px; }
                .welcome-banner { background: #fdfaf2; border-left: 4px solid #eab308; padding: 16px; margin: 20px 0; border-radius: 4px; }
                .welcome-banner p { margin: 0; font-weight: 600; color: #854d0e; }
                .button { display: inline-block; background: #eab308; color: white; text-decoration: none; padding: 12px 24px; font-weight: bold; border-radius: 8px; margin-top: 20px; }
                .button:hover { background: #ca8a04; }
                .footer { text-align: center; padding: 24px; font-size: 12px; color: #6b7280; border-top: 1px solid #f3f4f6; background: #f9fafb; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Eikon Peters Immigration</h1>
                </div>
                <div class="content">
                  <h2>Thank you for subscribing!</h2>
                  <p>Dear Reader,</p>
                  <p>We are thrilled to welcome you to our weekly newsletter community. You will now be among the first to receive updates on key immigration policy shifts, visa guidelines, success stories, and strategic visa pathways.</p>
                  
                  <div class="welcome-banner">
                    <p>💡 What to expect:</p>
                    <ul style="margin: 8px 0 0 20px; padding: 0; color: #854d0e;">
                      <li>Updates on global talent, work, and student visas.</li>
                      <li>Immigration policy breakdowns.</li>
                      <li>Expert guides and templates.</li>
                    </ul>
                  </div>
                  
                  <p>In the meantime, feel free to visit our guides section to browse and download our detailed immigration manuals.</p>
                  
                  <div style="text-align: center;">
                    <a href="https://www.eikonpetersimmigration.com/guides" class="button">Explore Guides</a>
                  </div>
                  
                  <p style="margin-top: 30px;">Best regards,<br><strong>The Eikon Peters Team</strong></p>
                </div>
                <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} Eikon Peters Immigration Services. All rights reserved.</p>
                  <p>You received this email because you subscribed to our newsletter. If you wish to unsubscribe, please reply to this email.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        };

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "api-key": apiKey,
          },
          body: JSON.stringify(welcomeEmailPayload),
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error("Brevo API returned status when sending welcome email:", response.status, errText);
        }
      } catch (err) {
        console.error("Error sending welcome email via Brevo:", err);
      }
    } else {
      console.warn("Brevo API key is not configured. Skipping welcome email.");
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the newsletter!",
    });
  } catch (error) {
    console.error("Error in newsletter subscription endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
