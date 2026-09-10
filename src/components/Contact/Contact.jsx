import { useLayoutEffect, useRef } from "react";
import { site, sections } from "../../config";
import { gsap } from "../../animations/gsap";
import { animateIn } from "../../animations/scrollAnimations";
import { magneticHover } from "../../animations/hoverAnimations";
import { useCursor } from "../CustomCursor/CursorContext";
import "./Contact.css";

export default function Contact() {
  const ref = useRef(null);
  const emailRef = useRef(null);
  const cursor = useCursor();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animateIn(".contact__heading");
      animateIn(".contact__email-wrap", { delay: 0.1 });
      animateIn(".contact__socials", { delay: 0.15, y: 12 });
    }, ref);

    const cleanup = magneticHover(emailRef.current, { strength: 0.25 });
    return () => {
      ctx.revert();
      cleanup();
    };
  }, []);

  if (!sections.contact.enabled) return null;

  return (
    <section id={sections.contact.id} className="contact" ref={ref}>
      <h2 className="text-h1 contact__heading">{sections.contact.title}</h2>

      <div className="contact__email-wrap">
        <a
          ref={emailRef}
          className="contact__email"
          href={`mailto:${site.email}`}
          onMouseEnter={() => cursor.setView("Say hi")}
          onMouseLeave={() => cursor.setDefault()}
        >
          {site.email}
        </a>
      </div>

      <div className="contact__socials">
        {site.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="contact__social-link"
            onMouseEnter={() => cursor.setRing()}
            onMouseLeave={() => cursor.setDefault()}
          >
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
