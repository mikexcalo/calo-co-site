"use client";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import styles from "./ContactModal.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trigger = target.closest("[data-modal-trigger]");
      if (trigger) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const reset = () => {
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
  };

  const close = () => {
    setOpen(false);
    setTimeout(reset, 300);
  };

  const submit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in name, email, and message.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const { error } = await getSupabase().from("leads").insert({
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || null,
      message: message.trim(),
      source: "site",
      status: "new",
    });

    if (error) {
      console.error("Lead insert failed:", error);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email hello@caloandco.com directly.");
      return;
    }

    setStatus("success");
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={close}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <button
          className={styles.closeBtn}
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>

        {status === "success" ? (
          <div className={styles.successState}>
            <h2 id="modalTitle" className={`${styles.title} display`}>
              <em>We&apos;ll be in touch.</em>
            </h2>
            <p className={styles.successCopy}>
              Thanks, {name.split(" ")[0] || "friend"}. We&apos;ll come back
              within 48 hours with a real conversation.
            </p>
            <button className={styles.primaryBtn} onClick={close}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="modalTitle" className={`${styles.title} display`}>
              Tell us about <em>what you&apos;re building</em>.
            </h2>
            <p className={styles.subtitle}>
              We&apos;ll come back within 48 hours.
            </p>

            <div className={styles.form}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.label}>Name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Company</span>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Optional"
                  autoComplete="organization"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>What are you looking for?</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A sentence or two — what's the project, what's the ambition. We'll get the rest on a call."
                  rows={5}
                />
              </label>

              {errorMsg && (
                <p className={styles.errorMsg}>{errorMsg}</p>
              )}

              <button
                className={styles.primaryBtn}
                onClick={submit}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send"}
                {status !== "submitting" && <span className={styles.arrow}>→</span>}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
