import React from 'react';
import styles from './Section.module.css';

export default function Section({open, setOpen, header, children}) {
  return (
    <div 
    className={`${styles.section}  ${open === header && styles.open}`} 
    onMouseEnter={() => {
        setOpen(header)
    }}
    onMouseLeave={() => {
        setOpen(null)
    }}
    >
        <div className={styles.section_header}>
            <p>{header}</p>
        </div>
        <div className={styles.links}>
            <a href=''>Random Link</a>
            <a href=''>Random Link</a>
            <a href=''>Random Link</a>
            <a href=''>Random Link</a>
        </div>
    </div>
  );
};

