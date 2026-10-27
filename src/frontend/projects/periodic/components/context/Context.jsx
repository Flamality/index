import React from "react";

const categories = [
  {
    name: "Alkali Metals",
    class: "alkali_metal",
  },
  {
    name: "Alkaline Earth Metals",
    class: "alkaline_earth_metal",
  },
  {
    name: "Transition Metals",
    class: "transition_metal",
  },
  {
    name: "Post-Transition Metals",
    class: "post-transition_metal",
  },
  {
    name: "Metalloids",
    class: "metalloid",
  },
  {
    name: "Nonmetals",
    class: "nonmetal",
  },
  {
    name: "Halogens",
    class: "halogen",
  },
  {
    name: "Noble Gases",
    class: "noble_gas",
  },
  {
    name: "Lanthanides",
    class: "lanthanide",
  },
  {
    name: "Actinides",
    class: "actinide",
  },
];

import elem_styles from "../element/element.module.css";
import styles from "./context.module.css";
export default function Context() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div
            key={category.class}
            className={styles.category + " " + elem_styles[category.class]}
          >
            <div
              className={
                elem_styles[category.class] + " " + styles.categoryNotch
              }
            />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
