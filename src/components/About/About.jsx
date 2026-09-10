import { useLayoutEffect, useRef } from "react";
import { sections } from "../../config";
import { gsap } from "../../animations/gsap";
import { animateIn } from "../../animations/scrollAnimations";
import "./About.css";

export default function About() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animateIn(".about__statement");
      animateIn(".about__bio", { delay: 0.1 });
      gsap.utils.toArray(".about__skills li").forEach((el, i) =>
        animateIn(el, { delay: i * 0.04, y: 16 })
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  if (!sections.about.enabled) return null;

  return (
    <section id={sections.about.id} className="about" ref={ref}>
      <div className="about__grid">
        <div>
          <h2 className="text-h1 about__statement">
            {sections.about.title}
          </h2>
          <p className="text-body about__bio">
            {sections.about.description}
          </p>
        </div>

        <ul className="about__skills">
          {sections.about.skills.map((skill) => (
            <li key={skill} className="text-h2" style={{ fontSize: "1.4rem" }}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
