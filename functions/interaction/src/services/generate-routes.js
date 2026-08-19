import fs from 'fs';
import path from 'path';

const routes = [];
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathsDir = path.join(__dirname, '../paths');
const outputFile = path.join(__dirname, './generated-routes.js');

function scan(dir, routePrefix = '') {
  for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, file.name);

    if (file.isDirectory()) {
      scan(full, `${routePrefix}/${file.name}`);
      continue;
    }

    if (!file.name.endsWith('.js')) continue;

    const importName =
      routePrefix.split('/').filter(Boolean).join('_') +
      '_' +
      file.name.replace('.js', '');

    const route = `${routePrefix}/${file.name.replace('.js', '')}`;
    const relativePath = path.relative(__dirname, full).replace(/\\/g, '/');
    routes.push({
      importName,
      route,
      //   file: full.replace(/\\/g, '/'),
      file: relativePath,
    });
  }
}

scan(pathsDir);

const output = `
${routes.map((r) => `import ${r.importName} from '${r.file}';`).join('\n')}

export const routes = {
${routes.map((r) => `  '${r.route}': ${r.importName},`).join('\n')}
};
`;

fs.writeFileSync(outputFile, output);
