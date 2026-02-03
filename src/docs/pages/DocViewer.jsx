import React, { Suspense, useEffect, useState } from "react";

import Spinner from "../../components/core/elements/Spinner";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../../Landing/Components/Footer/Footer";
import { databases } from "../../services/appwrite";

import styles from "./DocViewer.module.css";

// Lazy imports for built-in MDX docs
const builtinDocs = {
  terms: () => import("../components/builtin/Terms.mdx"),
  privacy: () => import("../components/builtin/Privacy.mdx"),
};

export default function DocViewer({ id }) {
  const [MdxModule, setMdxModule] = useState(null); // stores imported module
  const [dbMdx, setDbMdx] = useState(null); // stores DB MDX string
  const [title, setTitle] = useState(id); // document title fallback

  useEffect(() => {
    setMdxModule(null);
    setDbMdx(null);
    setTitle(id);

    const loadDoc = async () => {
      // Built-in MDX
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
      // Database MDX
      //   else {
      //     try {
      //       const doc = await databases.getDocument("main", "docs", id);
      //       if (doc?.mdx) {
      //         setDbMdx(doc.mdx);
      //         setTitle(doc.title || id);
      //         document.title = `Flamality | Docs | ${doc.title || id}`;
      //       } else {
      //         setTitle(`${id} (Not Found)`);
      //         console.warn("Document not found in DB:", id);
      //       }
      //     } catch (err) {
      //       console.error("Error fetching DB doc:", err);
      //       setTitle(`${id} (Error)`);
      //     }
      //   }
    };

    loadDoc();
  }, [id]);

  // While loading
  if (!MdxModule && !dbMdx) return <Spinner />;

  // Lazy wrapper for built-in MDX
  const LazyMdx = MdxModule
    ? React.lazy(() => Promise.resolve({ default: MdxModule.default }))
    : null;

  return (
    <div>
      <NavBar />
      <div className={styles.content}>
        <Suspense fallback={<Spinner />}>
          {LazyMdx && <LazyMdx />}
          {dbMdx && <MDXRuntime>{dbMdx}</MDXRuntime>}
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
