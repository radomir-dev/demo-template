import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json';

function gitRepoSlug() {
  try {
    const url = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
    return url.match(/github\.com[:/](.+?)(?:\.git)?$/)?.[1] ?? null;
  } catch {
    return null;
  }
}

const repoSlug = process.env.GITHUB_REPOSITORY ?? gitRepoSlug() ?? `radomir-dev/${pkg.name}`;
const repoName = repoSlug.split('/').pop() ?? pkg.name;
const canonicalUrl = `https://radomir.dev/${repoName}/`;

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${repoName}/` : '/', // Pages serves the built demo from /<repo>/
  plugins: [
    react(),
    {
      name: 'demo-metadata',
      transformIndexHtml: (html) => html.replace(/__CANONICAL_URL__/g, canonicalUrl),
    },
  ],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __REPO_URL__: JSON.stringify(`https://github.com/${repoSlug}`),
  },
}));
