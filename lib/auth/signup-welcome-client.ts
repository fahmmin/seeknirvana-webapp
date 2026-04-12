const storageKey = (email: string) => `seeknirvana-signup-welcome:${email.trim().toLowerCase()}`;

export function hasSentSignupWelcome(email: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return Boolean(window.sessionStorage.getItem(storageKey(email)));
}

export function markSignupWelcomeSent(email: string): void {
  if (typeof window === "undefined") {
    return;
  }
  window.sessionStorage.setItem(storageKey(email), "1");
}

export async function sendSignupWelcomeEmail(email: string): Promise<boolean> {
  const res = await fetch("/api/email/signup-welcome", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, website: "" }),
  });
  return res.ok;
}
