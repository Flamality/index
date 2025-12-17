import { useState, useEffect } from "react";

import "./ContextMenu.css";

export default function ContextMenu() {
  const [menu, setMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    selection: "",
  });

  useEffect(() => {
    const handleContextMenu = (e) => {
      // e.preventDefault();
      const selection = window.getSelection().toString();
      setMenu({ visible: true, x: e.pageX, y: e.pageY, selection });
    };

    const handleClick = () => setMenu((prev) => ({ ...prev, visible: false }));

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const copyText = async () => {
    if (menu.selection) await navigator.clipboard.writeText(menu.selection);
    setMenu({ ...menu, visible: false });
  };

  const pasteText = async () => {
    const text = await navigator.clipboard.readText();
    const activeEl = document.activeElement;
    if (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA") {
      const start = activeEl.selectionStart;
      const end = activeEl.selectionEnd;
      const val = activeEl.value;
      activeEl.value = val.slice(0, start) + text + val.slice(end);
      activeEl.selectionStart = activeEl.selectionEnd = start + text.length;
    }
    setMenu({ ...menu, visible: false });
  };

  const goBack = () => {
    window.history.back();
    setMenu({ ...menu, visible: false });
  };

  const reloadPage = () => {
    window.location.reload();
    setMenu({ ...menu, visible: false });
  };

  return menu.visible ? (
    <ul className='context-menu' style={{ left: menu.x, top: menu.y }}>
      {menu.selection && <li onClick={copyText}>Copy</li>}
      <li onClick={goBack}>Back</li>
      <li onClick={reloadPage}>Reload</li>
    </ul>
  ) : null;
}
