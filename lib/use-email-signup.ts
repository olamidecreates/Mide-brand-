import { useState, type FormEvent } from "react";

/**
 * Shared email-capture state + submit handler. Both the newsletter section
 * and the footer's mini-signup render their own markup (different layouts
 * by design) but were duplicating identical state/validation logic —
 * this hook is the single source of truth for that behavior.
 */
export function useEmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return { email, setEmail, submitted, handleSubmit };
}
