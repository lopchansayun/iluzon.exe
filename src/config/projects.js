export const projects = [
  {
    id: "lumen-atlas", number: "01", title: "Lumen Atlas",
    category: "Brand identity / Motion", year: "2026", color: "#d8d4c8",
    description: "A brand identity and motion system for a light-fixtures studio — logo animation, packaging, and a launch reel built around how the product bends and scatters light.",
    role: "Design & motion", stack: ["Illustrator", "After Effects", "Cinema 4D"],
    media: { type: "image", src: "" },
    thumbnail: "", hoverPreview: { type: "image", src: "" },
  },
  {
    id: "halftone", number: "02", title: "Halftone",
    category: "Music video / Edit", year: "2026", color: "#c7c2b4",
    description: "Edit and colour grade for an independent artist's single release — a halftone-driven visual language carried from the poster art into the cut itself.",
    role: "Edit, grade & motion titles", stack: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    media: { type: "image", src: "" },
    thumbnail: "", hoverPreview: { type: "image", src: "" },
  },
  {
    id: "glass-orbit", number: "03", title: "Glass Orbit",
    category: "Digital identity / Graphic design", year: "2025", color: "#e3ded0",
    description: "Brand system for a materials-science startup — an identity built around refraction, translucency and the physical properties of the glass they manufacture.",
    role: "Identity & print collateral", stack: ["Illustrator", "Photoshop", "InDesign"],
    media: { type: "image", src: "" },
    thumbnail: "", hoverPreview: { type: "image", src: "" },
  },
  {
    id: "drift-archive", number: "04", title: "Drift Archive",
    category: "Documentary / Video edit", year: "2025", color: "#cfc9b8",
    description: "Edit of a short documentary on a decommissioned research vessel — twenty years of logbooks, currents and photographs cut into a single maritime timeline.",
    role: "Edit & sound design", stack: ["Premiere Pro", "Audition", "After Effects"],
    media: { type: "image", src: "" },
    thumbnail: "", hoverPreview: { type: "image", src: "" },
  },
  {
    id: "mono-field", number: "05", title: "Mono Field",
    category: "Motion design / Self-directed", year: "2024", color: "#dad5c6",
    description: "A self-directed study in monochrome motion — a loop of procedurally lit forms exploring how far a single material can be pushed before it needs colour.",
    role: "Concept & motion", stack: ["Cinema 4D", "After Effects", "Redshift"],
    media: { type: "image", src: "" },
    thumbnail: "", hoverPreview: { type: "image", src: "" },
  },
];
export const getProjectById = (id) => projects.find((p) => p.id === id);
