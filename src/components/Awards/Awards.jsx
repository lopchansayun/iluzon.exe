import { useLayoutEffect, useRef } from "react";
import { sections } from "../../config";
import { gsap } from "../../animations/gsap";
import { animateIn } from "../../animations/scrollAnimations";
import "./Awards.css";

export default function Awards() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animateIn(".awards__title");
      gsap.utils.toArray(".awards__row").forEach((el, i) =>
        animateIn(el, { delay: i * 0.04, y: 12 })
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  if (!sections.awards.enabled) return null;

  return (
    <section id={sections.awards.id} className="awards" ref={ref}>
      <h2 className="text-h2 awards__title">{sections.awards.title}</h2>
      <div className="awards__table">
        {sections.awards.items.map((a) => (
          <div className="awards__row" key={`${a.year}-${a.note}`}>
            <span className="text-small awards__year">{a.year}</span>
            <span className="awards__name">{a.name}</span>
            <span className="text-small awards__note">{a.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
