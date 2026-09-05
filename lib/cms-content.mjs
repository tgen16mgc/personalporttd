export function getDocumentText(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(getDocumentText).join(" ").trim();
  if (!value || typeof value !== "object") return "";
  if (typeof value.text === "string") return value.text;
  return getDocumentText(value.children);
}

export function getStoryItemLabel(props) {
  const fields = props.value.fields;
  const text = (name, fallback) => getDocumentText(fields[name]?.value).slice(0, 60) || fallback;
  switch (props.discriminant) {
    case "heading": return `H: ${text("body", "heading")}`;
    case "image": return `IMG: ${text("caption", "image")}`;
    case "facebook": return `FB: ${text("url", "Facebook post")}`;
    case "pdf": return `PDF: ${text("title", text("url", "Google Drive PDF"))}`;
    case "quote": return `Q: ${text("body", "quote")}`;
    case "steps": return `Steps: ${text("heading", "numbered list")}`;
    default: return text("body", "text");
  }
}
