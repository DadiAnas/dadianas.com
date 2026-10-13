import ts from 'typescript';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = readFileSync(new URL('../src/configs/profile.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 }
}).outputText;
const profile = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const data = { experiences: profile.experiences, expertise: profile.expertise };
if (!data.experiences.length || data.experiences.some((role) => !role.highlights.length || role.highlights.length !== role.fr.highlights.length)) {
  throw new Error('Each résumé role needs matching English and French tasks');
}
writeFileSync(new URL('./resume-data.json', import.meta.url), JSON.stringify(data, null, 2));
console.log(`Exported ${data.experiences.length} roles from ${root}`);
