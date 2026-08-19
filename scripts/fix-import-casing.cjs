const fs = require("fs");
const path = require("path");

const roots = [path.resolve("src"), path.resolve("functions")];

const extensions = ["", ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"];

function findActualPath(target) {
  const parsed = path.parse(target);
  let current = parsed.root;

  const parts = target
    .slice(parsed.root.length)
    .split(path.sep)
    .filter(Boolean);

  for (const part of parts) {
    if (!fs.existsSync(current)) return null;

    const entries = fs.readdirSync(current);
    const actual = entries.find(
      (entry) => entry.toLowerCase() === part.toLowerCase(),
    );

    if (!actual) return null;

    current = path.join(current, actual);
  }

  return current;
}

function resolveImport(importer, importPath) {
  if (!importPath.startsWith(".")) return null;

  const base = path.dirname(importer);
  const raw = path.resolve(base, importPath);

  for (const extension of extensions) {
    const candidate = raw + extension;

    if (fs.existsSync(candidate)) {
      const actual = findActualPath(candidate);
      if (actual) return actual;
    }
  }

  // Handle imports like ./folder -> ./folder/index.jsx
  if (fs.existsSync(raw) && fs.statSync(raw).isDirectory()) {
    for (const extension of [".js", ".jsx", ".ts", ".tsx"]) {
      const index = path.join(raw, "index" + extension);

      if (fs.existsSync(index)) {
        return findActualPath(index);
      }
    }
  }

  return null;
}

function processFile(file) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  const regex =
    /(\bfrom\s*["']|import\s*\(\s*["']|require\s*\(\s*["']|import\s*["'])([^"']+)(["'])/g;

  content = content.replace(regex, (match, before, importPath, after) => {
    const actual = resolveImport(file, importPath);

    if (!actual) return match;

    let relative = path.relative(path.dirname(file), actual);
    relative = relative.replaceAll(path.sep, "/");

    if (!relative.startsWith(".")) {
      relative = "./" + relative;
    }

    // Remove extension, matching normal JS imports
    relative = relative.replace(/\.(js|jsx|ts|tsx|mjs|cjs)$/, "");

    if (relative !== importPath) {
      console.log(
        `${path.relative(process.cwd(), file)}\n  ${importPath} -> ${relative}`,
      );

      changed = true;
      return before + relative + after;
    }

    return match;
  });

  if (changed) {
    fs.writeFileSync(file, content);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name !== "node_modules" &&
        entry.name !== "dist" &&
        entry.name !== ".git"
      ) {
        walk(full);
      }
    } else if (/\.(js|jsx|ts|tsx|mjs|cjs)$/.test(entry.name)) {
      processFile(full);
    }
  }
}

for (const root of roots) {
  walk(root);
}

console.log("\nDone.");
