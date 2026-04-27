import { createClient } from '@sanity/client';
import 'dotenv/config'; // Permet de lire le fichier .env
import fs from 'fs';

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, 
  dataset: import.meta.env.VITE_SANITY_DATASET,
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