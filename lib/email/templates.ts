/** Transactional welcome after account sign-up (Reown / email), not cohort-specific. */
export function signupWelcomeHtml(): string {
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: system-ui, sans-serif; background: #0a0a0f; color: #f5f5f5; padding: 24px;">
    <h1 style="color: #4dd4a8;">Welcome</h1>
    <p>Thanks for creating your Seek Nirvana account.</p>
    <p style="color: rgba(255,255,255,0.65);">You can explore programs and devices from the site whenever you are ready.</p>
    <p style="margin-top: 32px; font-size: 12px; color: rgba(255,255,255,0.4);">Seek Nirvana</p>
  </body>
</html>
`.trim();
}

export function signupWelcomeText(): string {
  return [
    "Welcome",
    "",
    "Thanks for creating your Seek Nirvana account.",
    "",
    "You can explore programs and devices from the site whenever you are ready.",
    "",
    "Seek Nirvana",
  ].join("\n");
}

/** Sent once when a member completes preorder dashboard onboarding (personal details). */
export function memberHubWelcomeHtml(): string {
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: system-ui, sans-serif; background: #0a0a0f; color: #f5f5f5; padding: 24px;">
    <h1 style="color: #c9a227;">You are in</h1>
    <p>Thank you for pre-ordering Seek Nirvana.</p>
    <p style="color: rgba(255,255,255,0.65);">Your member hub is ready. We will share product updates here as we get closer to shipping.</p>
    <p style="margin-top: 32px; font-size: 12px; color: rgba(255,255,255,0.4);">Seek Nirvana</p>
  </body>
</html>
`.trim();
}

export function memberHubWelcomeText(): string {
  return [
    "You are in",
    "",
    "Thank you for pre-ordering Seek Nirvana.",
    "",
    "Your member hub is ready. We will share product updates here as we get closer to shipping.",
    "",
    "Seek Nirvana",
  ].join("\n");
}

/** Sent when a user completes the simplified preorder form. */
export function preorderConfirmationHtml(data: {
  name: string;
  color: string;
  size: number;
  address: string;
}): string {
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: system-ui, sans-serif; background: #0a0a0f; color: #f5f5f5; padding: 24px;">
    <h1 style="color: #c9a227;">Pre-order Confirmed</h1>
    <p>Hi ${data.name},</p>
    <p>Thank you for pre-ordering the Seek Nirvana Ring!</p>
    <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #00d4ff;">Order Details:</h3>
      <p style="margin: 4px 0;"><strong>Color:</strong> ${data.color}</p>
      <p style="margin: 4px 0;"><strong>Size:</strong> ${data.size}</p>
      <p style="margin: 4px 0;"><strong>Shipping to:</strong><br/>${data.address}</p>
    </div>
    <p style="color: rgba(255,255,255,0.65);">We've reserved your spot. We'll reach out with payment instructions and shipping updates as we get closer to our Q2 2026 launch.</p>
    <p style="margin-top: 32px; font-size: 12px; color: rgba(255,255,255,0.4);">Seek Nirvana — Ancient Wisdom × AI</p>
  </body>
</html>
`.trim();
}

export function preorderConfirmationText(data: {
  name: string;
  color: string;
  size: number;
  address: string;
}): string {
  return [
    "Pre-order Confirmed",
    "",
    `Hi ${data.name},`,
    "",
    "Thank you for pre-ordering the Seek Nirvana Ring!",
    "",
    "Order Details:",
    `- Color: ${data.color}`,
    `- Size: ${data.size}`,
    `- Shipping to: ${data.address}`,
    "",
    "We've reserved your spot. We'll reach out with payment instructions and shipping updates as we get closer to our Q2 2026 launch.",
    "",
    "Seek Nirvana — Ancient Wisdom × AI",
  ].join("\n");
}
