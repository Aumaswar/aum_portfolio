import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { ScrollTextReveal } from "./TextReveal";
import MagneticButton from "./MagneticButton";

const encode = (data: Record<string, string>) =>
  new URLSearchParams(data).toString();

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    const n = name.trim();
    const e = email.trim();
    const m = message.trim();

    if (!n || !e || !m) {
      toast("Please fill in name, email, and message.");
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    if (!emailOk) {
      toast("Please enter a valid email address.");
      return;
    }

    try {
      setIsSending(true);

      // Netlify Forms submission (works when deployed on Netlify).
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          name: n,
          email: e,
          message: m,
        }),
      });

      toast("Message sent. Thank you!");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast("Couldn’t send right now. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="section-padding relative" id="contact">
      <div className="max-w-7xl mx-auto">
        <ScrollTextReveal>
          <span className="text-sm font-body text-primary tracking-widest uppercase mb-4 block">
            Contact
          </span>
        </ScrollTextReveal>
        <ScrollTextReveal delay={0.1}>
          <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-8xl leading-tight">
            Let's build
          </h2>
        </ScrollTextReveal>
        <ScrollTextReveal delay={0.2}>
          <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-8xl leading-tight text-gradient">
            something epic.
          </h2>
        </ScrollTextReveal>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <ScrollTextReveal delay={0.3}>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Got a project in mind? I'm always open to discussing new
                opportunities, creative ideas, or just having a good chat about
                the web.
              </p>
            </ScrollTextReveal>

            <div className="mt-12 space-y-6">
              {[
                { label: "Email", value: "aum.aswar06@gmail.com", href: "mailto:aum.aswar06@gmail.com" },
                { label: "GitHub", value: "github.com/Aumaswar", href: "https://github.com/Aumaswar" },
                { label: "Phone", value: "9913828306", href: "tel:+919913828306" },
              ].map((item, i) => (
                <ScrollTextReveal key={item.label} delay={0.4 + i * 0.1}>
                  <div className="flex items-center justify-between border-b border-border pb-4 group cursor-pointer">
                    <span className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </span>
                    <motion.a
                      href={item.href}
                      target={item.label === "GitHub" ? "_blank" : undefined}
                      rel={item.label === "GitHub" ? "noreferrer" : undefined}
                      className="font-body text-foreground"
                      whileHover={{ x: 5 }}
                    >
                      {item.value}
                    </motion.a>
                  </div>
                </ScrollTextReveal>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <ScrollTextReveal delay={0.3}>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-border py-4 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </ScrollTextReveal>
            <ScrollTextReveal delay={0.4}>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-border py-4 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </ScrollTextReveal>
            <ScrollTextReveal delay={0.5}>
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Tell me about your project"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-border py-4 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
            </ScrollTextReveal>
            <ScrollTextReveal delay={0.6}>
              <MagneticButton
                onClick={handleSend}
                className={`bg-primary text-primary-foreground px-10 py-4 font-body font-medium text-sm tracking-wider uppercase mt-4 ${
                  isSending ? "opacity-70 pointer-events-none" : ""
                }`}
              >
                {isSending ? "Sending..." : "Send Message"}
              </MagneticButton>
            </ScrollTextReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
