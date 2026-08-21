import React from "react";
import { trackEvent } from "../analytics.js";

const projectMailto = "mailto:versonkhenjoshua@gmail.com?subject=Project%20Inquiry%20from%20Portfolio";

const links = [
  {
    label: "Email",
    value: "versonkhenjoshua@gmail.com",
    href: projectMailto,
    external: false,
  },
  {
    label: "GitHub",
    value: "@khen123321",
    href: "https://github.com/khen123321",
    external: true,
  },
  {
    label: "Facebook",
    value: "Social Profile",
    href: "https://www.facebook.com/khenjosh740/",
    external: true,
  },
];

export default function Contact() {
  const trackContact = (label) => {
    trackEvent("contact", {
      method: label.toLowerCase(),
    });
  };

  return (
    <section id="contact" className="section compact-section">
      <div className="site-container contact-grid">
        <div className="reveal-on-load">
          <span className="contact-command">05 / Contact</span>
          <h2 className="contact-headline">Let's build something useful<span className="cursor-mark">_</span></h2>
          <p className="contact-copy">
            I am open to Web Developer, UI/UX Designer, and hybrid product roles. Send a direct email if you want to discuss a project, role, or collaboration.
          </p>
          <div className="contact-actions">
            <a href={projectMailto} className="btn-primary">
              &gt; start_a_project
            </a>
          </div>
        </div>

        <div className="contact-links reveal-on-load" aria-label="Contact links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="contact-link"
              onClick={link.href.startsWith("mailto:") ? undefined : () => trackContact(link.label)}
            >
              <span className="meta-label">{link.label}</span>
              <span className="contact-value">{link.value} -&gt;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
