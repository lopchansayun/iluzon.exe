import { forwardRef } from "react";
import "./PageTransition.css";

const PageTransitionCover = forwardRef(function PageTransitionCover(_, ref) {
  return <div ref={ref} className="page-transition-cover" aria-hidden="true" />;
});

export default PageTransitionCover;
