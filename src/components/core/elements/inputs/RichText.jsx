import { useState, useRef, useEffect } from "react";
import { emojiMap } from "../../../../services/emojiMap";
import "./RichText.css";

export default function RichText() {
  const [html, setHtml] = useState("");
  const inputRef = useRef(null);
  const isUpdating = useRef(false);

  const saveCursorPosition = () => {
    const sel = window.getSelection();
    if (!sel.rangeCount) return 0;
    const range = sel.getRangeAt(0);
    const preCaret = range.cloneRange();
    preCaret.selectNodeContents(inputRef.current);
    preCaret.setEnd(range.endContainer, range.endOffset);
    return preCaret.toString().length;
  };

  const restoreCursorPosition = (pos) => {
    inputRef.current.focus();
    const sel = window.getSelection();
    const range = document.createRange();

    let charIndex = 0;
    let nodeStack = [inputRef.current];
    let node;
    let found = false;

    while (!found && (node = nodeStack.pop())) {
      if (node.nodeType === Node.TEXT_NODE) {
        const nextCharIndex = charIndex + node.textContent.length;
        if (pos >= charIndex && pos <= nextCharIndex) {
          range.setStart(node, pos - charIndex);
          range.setEnd(node, pos - charIndex);
          found = true;
        }
        charIndex = nextCharIndex;
      } else {
        for (let i = node.childNodes.length - 1; i >= 0; i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    if (!found) {
      range.setStart(inputRef.current, 0);
      range.setEnd(inputRef.current, 0);
    }

    sel.removeAllRanges();
    sel.addRange(range);
  };

  const processText = (text) => {
    text = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    text = text.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
    text = text.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
    text = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" class="link">$1</a>'
    );
    text = text.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="bold">**$1**</strong>'
    );
    text = text.replace(/\*(.*?)\*/g, '<em class="italic">*$1*</em>');
    text = text.replace(/`(.*?)`/g, '<code class="code">`$1`</code>');
    text = text.replace(
      /~~(.*?)~~/g,
      '<del class="strikethrough">~~$1~~</del>'
    );

    return text;
  };

  const replaceEmojisAtCaret = () => {
    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const node = range.startContainer;
    const offset = range.startOffset;

    if (node.nodeType !== Node.TEXT_NODE) return;

    let text = node.textContent;
    const emojiKeys = Object.keys(emojiMap).sort((a, b) => b.length - a.length);

    for (let shortcode of emojiKeys) {
      const regex = new RegExp(shortcode, "g");
      let match;
      while ((match = regex.exec(text)) !== null) {
        const start = match.index;
        const end = start + shortcode.length;
        if (offset >= start && offset <= end) {
          const emojiSpan = document.createElement("span");
          emojiSpan.className = "emoji";
          emojiSpan.textContent = emojiMap[shortcode];

          const after = node.splitText(end);
          const middle = node.splitText(start);
          middle.parentNode.replaceChild(emojiSpan, middle);

          const newRange = document.createRange();
          newRange.setStart(after, 0);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);

          return true;
        }
      }
    }
    return false;
  };

  const handleInput = () => {
    if (isUpdating.current) return;
    isUpdating.current = true;

    const cursorPos = saveCursorPosition();
    const plainText = inputRef.current.textContent || "";

    // First, try to replace emojis at caret
    const replaced = replaceEmojisAtCaret();

    // Then process full text for mentions, hashtags, links, etc
    let processedHtml = processText(inputRef.current.textContent || "");
    // Re-insert existing emoji spans so they don’t get overwritten
    inputRef.current.querySelectorAll("span.emoji").forEach((el) => {
      processedHtml = processedHtml.replace(el.textContent, el.outerHTML);
    });

    if (inputRef.current.innerHTML !== processedHtml) {
      inputRef.current.innerHTML = processedHtml;
      if (!replaced) restoreCursorPosition(cursorPos);
    }
    console.log(replaced);
    console.log(plainText);
    console.log(cursorPos);
    setHtml(inputRef.current.innerHTML);

    setTimeout(() => (isUpdating.current = false), 0);
  };

  useEffect(() => {
    if (inputRef.current && !isUpdating.current) {
      inputRef.current.innerHTML = html || "<br>";
    }
  }, [html]);

  return (
    <div
      ref={inputRef}
      contentEditable
      onInput={handleInput}
      className='rich-text-editor'
      data-placeholder='Type something... Try @mentions, #hashtags, :emojis:, **bold**, *italic*, `code`, ~~strikethrough~~, or URLs'
      spellCheck={false}
      suppressContentEditableWarning={true}
      style={{
        minHeight: "40px",
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "5px",
      }}
    />
  );
}
