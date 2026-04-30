import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '0abl700c', 
  dataset: 'production',
  useCdn: false, // Pour que les photos chargent ultra-vite
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);