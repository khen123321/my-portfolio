import React from "react";
import { FiMail } from "react-icons/fi";
import { SiFacebook, SiGithub, SiLinkedin } from "react-icons/si";
import { trackEvent } from "../analytics.js";

const projectMailto = "mailto:versonkhenjoshua@gmail.com?subject=Project%20Inquiry%20from%20Portfolio";

const links = [
  {
    label: "Email",
    value: "versonkhenjoshua@gmail.com",
    href: projectMailto,
    external: false,
    Icon: FiMail,
  },
  {
    label: "GitHub",
    value: "@khen123321",
    href: "https://github.com/khen123321",
    external: true,
    Icon: SiGithub,
  },
  {
    label: "LinkedIn",
    value: "Khen Joshua Verson",
    href: "https://www.linkedin.com/in/khen-joshua-verson-271a57323/",
    external: true,
    Icon: SiLinkedin,
    ariaLabel: "LinkedIn profile of Khen Joshua Verson",
  },
  {
    label: "Facebook",
    value: "Social Profile",
    href: "https://www.facebook.com/khenjosh740/",
    external: true,
    Icon: SiFacebook,
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
            Open to projects, opportunities, and collaborations.
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
              aria-label={link.ariaLabel}
              onClick={link.href.startsWith("mailto:") ? undefined : () => trackContact(link.label)}
            >
              <span className="meta-label">{link.label}</span>
              <span className="contact-value">
                {React.createElement(link.Icon, {
                  className: "contact-icon",
                  "aria-hidden": "true",
                  focusable: "false",
                })}
                <span className="contact-value-text">{link.value}</span>
                <span className="contact-arrow" aria-hidden="true">-&gt;</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
