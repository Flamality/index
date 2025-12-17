import React, { useContext } from 'react';

import styles from "./Popup.module.css"
import Button from '../../../inputs/buttons/Button/Button';
import { Layers } from '../../../../../../contexts/layers';

export default function Popup({title, desc}) {
    const {hideModal} = useContext(Layers)
  return (
    <div className={styles.popup}>
        <p className={styles.title}>{title}</p>
        <p className={styles.desc}>{desc}</p>
        <Button onClick={hideModal}>Close</Button>
    </div>
  );
}
