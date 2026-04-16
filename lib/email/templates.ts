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
