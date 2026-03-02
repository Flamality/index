import React, { Suspense, useEffect, useState, useRef } from "react";
import Spinner from "../../components/core/elements/Spinner";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../../Landing/Components/Footer/Footer";
import { databases } from "../../services/appwrite";

import styles from "./DocViewer.module.css";
import { useMemo } from "react";
import { slugify } from "../../services/slugify";

// Lazy imports for built-in MDX docs
const builtinDocs = {
  terms: () => import("../components/builtin/Terms.mdx"),
  privacy: () => import("../components/builtin/Privacy.mdx"),
  guidelines: () => import("../components/builtin/Guidelines.mdx"),
};

export default function DocViewer({ id }) {
  const [MdxModule, setMdxModule] = useState(null);
  const [dbMdx, setDbMdx] = useState(null);
  const [title, setTitle] = useState(id);
  const [sections, setSections] = useState([]);
  const contentRef = useRef();

  const mdxComponents = useMemo(
    () => ({
      h2: ({ children }) => {
        const slug = slugify(String(children));
        return <h2 id={slug}>{children}</h2>;
      },
    }),
    [],
  );

  const MdxContent = useMemo(() => MdxModule?.default ?? null, [MdxModule]);

  // Generate section list after content mounts
  useEffect(() => {
    if (!MdxModule && !dbMdx) return;

    // Small timeout ensures Suspense has finished painting
    const t = setTimeout(() => {
      const headers = contentRef.current?.querySelectorAll("h2") ?? [];
      setSections(
        Array.from(headers).map((h) => ({
          id: h.id,
          text: h.textContent,
        })),
      );
    }, 50);

    return () => clearTimeout(t);
  }, [MdxModule, dbMdx]);

  // Loading MDX logic...
  useEffect(() => {
    setMdxModule(null);
    setDbMdx(null);
    setTitle(id);

    const loadDoc = async () => {
      if (!id) return;
      // Check if already loaded
      if (builtinDocs[id]) {
        try {
          const mod = await builtinDocs[id]();
          setMdxModule(mod);
          setTitle(mod.meta?.title || id);
          document.title = `Flamality | Docs | ${mod.meta?.title || id}`;
        } catch (err) {
          console.error("Failed to load built-in doc:", err);
          setTitle(`${id} (Failed)`);
        }
      }
    };
    loadDoc();
  }, [id]);

  if (!MdxModule && !dbMdx) return <Spinner />;

  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <h1>In this article</h1>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  {section.text.replace(/^\d+\.\s+/, "")}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.content} ref={contentRef}>
          <Suspense fallback={<Spinner />}>
            {MdxContent && <MdxContent components={mdxComponents} />}
            {dbMdx && <MDXRuntime>{dbMdx}</MDXRuntime>}
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}
