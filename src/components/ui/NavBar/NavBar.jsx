import React, { useState, useEffect } from 'react';

import styles from './NavBar.module.css'
import Section from './components/Section/Section';
import { Link } from 'react-router-dom';
import User from './components/User/User';

function NavBar() {
    const [open, setOpen] = useState(false);
    const [atTop, setAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setAtTop(window.scrollY <=  50);
        };

        handleScroll(); // run once at start

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  return (
    <div className={`${styles.navbar} ${!atTop ? styles.scrolled : ''}`}>
        <div className={styles.left}>
            <Link to='/'><p>Flamality</p></Link>
        </div>
        <div className={styles.center} onMouseLeave={() => {setOpen(null)}}>
            {/* <Section header="Projects" setOpen={setOpen} open={open} />
            <Section header="Hm" setOpen={setOpen} open={open} /> */}
        </div>
        <div className={styles.right}>
            <User />
        </div>
    </div>
  );
}

export default NavBar;
