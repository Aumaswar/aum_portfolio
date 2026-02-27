import { motion } from "framer-motion";
import { ScrollTextReveal } from "./TextReveal";
import MagneticButton from "./MagneticButton";

const ContactSection = () => {
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
                { label: "Email", value: "hello@alexrivera.dev" },
                { label: "GitHub", value: "github.com/alexrivera" },
                { label: "Twitter", value: "@alexrivera_dev" },
              ].map((item, i) => (
                <ScrollTextReveal key={item.label} delay={0.4 + i * 0.1}>
                  <div className="flex items-center justify-between border-b border-border pb-4 group cursor-pointer">
                    <span className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </span>
                    <motion.span
                      className="font-body text-foreground"
                      whileHover={{ x: 5 }}
                    >
                      {item.value}
                    </motion.span>
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
                  placeholder="Your name"
                  className="w-full bg-transparent border-b border-border py-4 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </ScrollTextReveal>
            <ScrollTextReveal delay={0.4}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-transparent border-b border-border py-4 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </ScrollTextReveal>
            <ScrollTextReveal delay={0.5}>
              <div className="relative">
                <textarea
                  placeholder="Tell me about your project"
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-4 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
            </ScrollTextReveal>
            <ScrollTextReveal delay={0.6}>
              <MagneticButton className="bg-primary text-primary-foreground px-10 py-4 font-body font-medium text-sm tracking-wider uppercase mt-4">
                Send Message
              </MagneticButton>
            </ScrollTextReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
