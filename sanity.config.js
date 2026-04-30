import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import galleryOrder from './src/components/galleryOrder'; 
import specimen from './src/components/specimen'; // On pointe vers le fichier qu'on vient de créer

export default defineConfig({
  name: 'default',
  title: 'Yann Guedes Taxidermie',
  projectId: '0abl700c', 
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: [
        specimen,     // On l'ajoute ici
        galleryOrder, 
    ],
  },
});