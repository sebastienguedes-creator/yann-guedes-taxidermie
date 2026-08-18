/**
 * ============================================================================
 * FICHIER : generate-sitemap.js
 * DESCRIPTION : Script de génération automatique du sitemap XML basé sur les catégories Sanity
 * OPTIMISATIONS : Organisation modulaire et commentaires détaillés (Zéro régression)
 * ============================================================================
 */

import 'dotenv/config';
import { createClient } from '@sanity/client';
import fs from 'fs';

// --------------------------------------------------------------------------
// 1. CONFIGURATION & RÉCUPÉRATION DES VARIABLES D'ENVIRONNEMENT
// --------------------------------------------------------------------------
const projectId = process.env.VITE_SANITY_PROJECT_ID; 
const dataset = process.env.VITE_SANITY_DATASET; 

// Vérification de la présence du projectId
if (!projectId) {
  console.error("ERREUR : VITE_SANITY_PROJECT_ID n'est pas défini !"); 
  process.exit(1); 
}

// Initialisation du client Sanity
const client = createClient({
  projectId: projectId, 
  dataset: dataset || 'production', 
  useCdn: false, 
  apiVersion: '2023-05-03', 
});

// --------------------------------------------------------------------------
// 2. FONCTION DE GÉNÉRATION DU SITEMAP
// --------------------------------------------------------------------------
async function generate() {
  // Récupération des catégories uniques depuis Sanity
  const categories = await client.fetch(`*[_type == "specimen"].category`); 
  const uniqueCategories = [...new Set(categories)]; 

  const baseUrl = 'https://www.yann-guedes-taxidermie.fr'; 

  // Construction du contenu XML du sitemap
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

  // Écriture du fichier sitemap.xml dans le dossier public
  fs.writeFileSync('./public/sitemap.xml', sitemap); 
  console.log('✅ Sitemap.xml mis à jour avec les catégories de Yann !'); 
}

// Exécution du script
generate(); 