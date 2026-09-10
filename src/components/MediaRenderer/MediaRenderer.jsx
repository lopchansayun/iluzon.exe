import "./MediaRenderer.css";

export default function MediaRenderer({ media, className = "" }) {
  if (!media?.src) return null;

  if (media.type === "video") {
    return <video className={className} src={media.src} autoPlay muted loop playsInline controls={media.controls} />;
  }

  if (media.type === "youtube") {
    return (
      <iframe
        className={className}
        src={media.src}
        title={media.title || "Project video"}
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return <img className={className} src={media.src} alt={media.alt || ""} loading="lazy" />;
}
