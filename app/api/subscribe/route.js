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
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Eikon Peters Immigration</title>
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
                    Thank you for subscribing!
                  </h2>
                </div>

                <!-- Content Area -->
                <div style="padding: 36px 32px 32px 32px; color: #334155; font-size: 15px; line-height: 1.7;">
                  <p style="margin: 0 0 20px 0; font-size: 15px; font-weight: 700; color: #0f172a;">Dear Reader,</p>
                  <p style="margin: 0 0 20px 0; color: #475569;">We are thrilled to welcome you to our weekly newsletter community. You will now be among the first to receive updates on key immigration policy shifts, visa guidelines, success stories, and strategic visa pathways.</p>
                  
                  <div style="background-color: #fffbeb; border-left: 4px solid #eab308; padding: 20px; margin: 24px 0; border-radius: 8px; color: #854d0e; font-size: 14px; line-height: 1.6;">
                    <strong style="display: block; margin-bottom: 8px; font-size: 15px;">💡 What to expect:</strong>
                    <ul style="margin: 0; padding-left: 20px;">
                      <li style="margin-bottom: 4px;">Updates on global talent, work, and student visas.</li>
                      <li style="margin-bottom: 4px;">Immigration policy changes &amp; advisory warnings.</li>
                      <li>Expert guides and pathway templates.</li>
                    </ul>
                  </div>
                  
                  <p style="margin: 0 0 20px 0; color: #475569;">In the meantime, feel free to visit our guides section to browse and download our detailed immigration manuals.</p>
                  
                  <!-- Call to action button -->
                  <div style="text-align: center; margin-top: 32px; margin-bottom: 8px;">
                    <a href="https://www.eikonpetersimmigration.com/guides" style="display: inline-block; background-color: #eab308; color: #ffffff; text-decoration: none; padding: 12px 28px; font-weight: bold; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(234, 179, 8, 0.2); transition: all 0.2s;">
                      Explore Guides
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
                  <p style="margin: 0 0 4px 0;">&copy; ${new Date().getFullYear()} Eikon Peters. All rights reserved.</p>
                  <p style="margin: 0; color: #94a3b8;">You received this email because you subscribed to our newsletter. If you wish to unsubscribe, please reply directly to this email.</p>
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
