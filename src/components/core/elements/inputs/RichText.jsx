import { emojiMap } from "../../../../services/emojiMap";
import "./RichText.css";

const htmlEntities = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => htmlEntities[char]);

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const emojiShortcodes = Object.keys(emojiMap).sort(
  (a, b) => b.length - a.length,
);

const emojiRegex = emojiShortcodes.length
  ? new RegExp(emojiShortcodes.map(escapeRegExp).join("|"), "g")
  : null;

const urlRegex = /(https?:\/\/[^\s]+)/gi;

export function normalizeRichTextValue(value = "") {
  const text = String(value ?? "");

  if (!emojiRegex) return text;

  return text.replace(emojiRegex, (shortcode) => emojiMap[shortcode]);
}

function renderFormattedText(text) {
  let html = escapeHtml(text);

  html = html.replace(
    /~~([^~\n]+)~~/g,
    '<del class="rich-text-strikethrough strikethrough">$1</del>',
  );
  html = html.replace(
    /\*\*([^*\n]+)\*\*/g,
    '<strong class="rich-text-bold bold">$1</strong>',
  );
  html = html.replace(
    /(^|[^*])\*(?!\*)([^*\n]+)\*(?!\*)/g,
    '$1<em class="rich-text-italic italic">$2</em>',
  );
  html = html.replace(
    /(^|[\s([{])@([a-zA-Z0-9_]{1,32})/g,
    '$1<span class="rich-text-token rich-text-mention mention">@$2</span>',
  );
  html = html.replace(
    /(^|[\s([{])#([a-zA-Z0-9_]{1,64})/g,
    '$1<span class="rich-text-token rich-text-hashtag hashtag">#$2</span>',
  );

  return html.replace(/\n/g, "<br />");
}

function renderTextWithCode(text) {
  const parts = [];
  const codeRegex = /`([^`\n]+)`/g;
  let lastIndex = 0;

  for (const match of text.matchAll(codeRegex)) {
    parts.push(renderFormattedText(text.slice(lastIndex, match.index)));
    parts.push(
      `<code class="rich-text-code code">${escapeHtml(match[1])}</code>`,
    );
    lastIndex = match.index + match[0].length;
  }

  parts.push(renderFormattedText(text.slice(lastIndex)));

  return parts.join("");
}

export function renderRichText(value = "") {
  const text = normalizeRichTextValue(value);
  const parts = [];
  let lastIndex = 0;

  for (const match of text.matchAll(urlRegex)) {
    const url = match[0];

    parts.push(renderTextWithCode(text.slice(lastIndex, match.index)));
    parts.push(
      `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer" class="rich-text-link link">${escapeHtml(url)}</a>`,
    );
    lastIndex = match.index + url.length;
  }

  parts.push(renderTextWithCode(text.slice(lastIndex)));

  return parts.join("");
}

function getTextValue(value, initial, children) {
  if (value !== undefined) return value;
  if (initial !== undefined) return initial;
  if (typeof children === "string" || typeof children === "number") {
    return children;
  }

  return "";
}

export default function RichText({
  value,
  initial,
  children,
  placeholder = "",
  className = "",
  styled = true,
  unstyled = false,
  as: Component = "p",
}) {
  const text = getTextValue(value, initial, children);
  const displayText = text === "" || text == null ? placeholder : String(text);

  if (unstyled) {
    return (
      <Component className={className || undefined}>{displayText}</Component>
    );
  }

  const classes = [
    styled ? "core-element-rich-text" : "",
    !displayText ? "core-element-rich-text-empty" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={classes || undefined}
      dangerouslySetInnerHTML={{ __html: renderRichText(displayText) }}
    />
  );
}
