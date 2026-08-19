import React, { useEffect, useRef, useState } from "react";

import styles from "./DropDown.module.css";
import { FaChevronDown, FaXmark } from "react-icons/fa6";

export function DropDown({
  id,
  title = "Select",
  position = "bottom",
  selected,
  onSelect,
  unselectable = true,
  children,
}) {
  const [open, setOpen] = useState(false);
  const dropdown = useRef(null);
  const childArray = React.Children.toArray(children);
  const selectedChild = childArray.find(
    (child) => child.props.value === selected,
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={styles.container} ref={dropdown}>
      <div
        className={`${styles.title} ${open ? styles.open : ""}`}
        id={id}
        onClick={() => setOpen(!open)}
      >
        <FaChevronDown className={styles.chevron} />{" "}
        {!!selectedChild ? selectedChild?.props?.children : <p>{title}</p>}
        {unselectable && selected !== undefined && (
          <FaXmark
            className={styles.clear}
            onClick={(e) => {
              e.stopPropagation();
              onSelect && onSelect(undefined);
              setOpen(false);
            }}
          />
        )}
      </div>
      <div
        className={`${styles.dropdown} ${styles[position]} ${open ? styles.open : ""}`}
      >
        {React.Children.map(children, (child) => {
          if (child.type === DropDownItem) {
            return React.cloneElement(child, {
              onClick: () => {
                onSelect && onSelect(child.props.value);
                setOpen(false);
              },
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}
export function DropDownItem({ value, children, onClick }) {
  return (
    <div className={styles.item} onClick={onClick}>
      {children}
    </div>
  );
}
