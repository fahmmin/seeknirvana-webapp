export function signupWelcomeHtml(data?: {
  name?: string;
  phone?: string;
  instagram?: string;
  telegram?: string;
}): string {
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: system-ui, sans-serif; background: #0a0a0f; color: #f5f5f5; padding: 24px;">
    <h1 style="color: #4dd4a8;">Welcome ${data?.name || ""}</h1>
    <p>Thanks for joining the Seek Nirvana circle.</p>
    ${data?.phone || data?.instagram || data?.telegram ? `
    <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #00d4ff;">Your details:</h3>
      ${data.phone ? `<p style="margin: 4px 0;"><strong>Phone:</strong> ${data.phone}</p>` : ""}
      ${data.instagram ? `<p style="margin: 4px 0;"><strong>Instagram:</strong> ${data.instagram}</p>` : ""}
      ${data.telegram ? `<p style="margin: 4px 0;"><strong>Telegram:</strong> ${data.telegram}</p>` : ""}
    </div>
    ` : ""}
    <p style="color: rgba(255,255,255,0.65);">You'll be the first to know about launch updates, sleep wisdom, and early access. Calm signals only.</p>
    <p style="margin-top: 32px; font-size: 12px; color: rgba(255,255,255,0.4);">Seek Nirvana — Ancient Wisdom × AI</p>
  </body>
</html>
`.trim();
}

export function signupWelcomeText(data?: {
  name?: string;
  phone?: string;
  instagram?: string;
  telegram?: string;
}): string {
  const details = [];
  if (data?.phone) details.push(`- Phone: ${data.phone}`);
  if (data?.instagram) details.push(`- Instagram: ${data.instagram}`);
  if (data?.telegram) details.push(`- Telegram: ${data.telegram}`);

  return [
    `Welcome ${data?.name || ""}`,
    "",
    "Thanks for joining the Seek Nirvana circle.",
    "",
    details.length > 0 ? "Your details:" : "",
    ...details,
    "",
    "You'll be the first to know about launch updates, sleep wisdom, and early access. Calm signals only.",
    "",
    "Seek Nirvana — Ancient Wisdom × AI",
  ].filter(Boolean).join("\n");
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
  phone?: string;
  instagram?: string;
  telegram?: string;
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
      ${data.phone ? `<p style="margin: 4px 0;"><strong>Phone:</strong> ${data.phone}</p>` : ""}
      ${data.instagram ? `<p style="margin: 4px 0;"><strong>Instagram:</strong> ${data.instagram}</p>` : ""}
      ${data.telegram ? `<p style="margin: 4px 0;"><strong>Telegram:</strong> ${data.telegram}</p>` : ""}
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
  phone?: string;
  instagram?: string;
  telegram?: string;
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
    data.phone ? `- Phone: ${data.phone}` : "",
    data.instagram ? `- Instagram: ${data.instagram}` : "",
    data.telegram ? `- Telegram: ${data.telegram}` : "",
    `- Shipping to: ${data.address}`,
    "",
    "We've reserved your spot. We'll reach out with payment instructions and shipping updates as we get closer to our Q2 2026 launch.",
    "",
    "Seek Nirvana — Ancient Wisdom × AI",
  ].join("\n");
}
