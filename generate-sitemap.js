// generate-sitemap.js
import 'dotenv/config';
import { createClient } from '@sanity/client';
import fs from 'fs';

// Cette ligne permet de lire les variables soit en local (.env) 
// soit sur Vercel (process.env)
const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET;

if (!projectId) {
  console.error("ERREUR : VITE_SANITY_PROJECT_ID n'est pas défini !");
  process.exit(1);
}

const client = createClient({
  projectId: projectId,
  dataset: dataset || 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function generate() {
  // On récupère les catégories uniques depuis Sanity
  const categories = await client.fetch(`*[_type == "specimen"].category`);
  const uniqueCategories = [...new Set(categories)];

  const baseUrl = 'https://www.yann-guedes-taxidermie.fr';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>
  ${uniqueCategories.map(cat => `
  <url>
    <loc>${baseUrl}/#${cat.toLowerCase()}</loc>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync('./public/sitemap.xml', sitemap);
  console.log('✅ Sitemap.xml mis à jour avec les catégories de Yann !');
}

generate();