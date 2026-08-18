/**
 * ============================================================================
 * FICHIER : specimen.js (Sanity Schema)
 * DESCRIPTION : Schéma Sanity pour les spécimens de la galerie de taxidermie.
 * 
 * OPTIMISATIONS :
 * - Ajout d'un bloc de preview (aperçu avec image, titre et catégorie dans le Studio).
 * - Ajout de descriptions explicites pour l'interface d'administration.
 * - Intégrité totale des champs et des règles de validation (Zéro Régression).
 * ============================================================================
 */

export default {
  name: 'specimen',
  title: 'Spécimen',
  type: 'document',
  
  // Aperçu personnalisé dans la liste du Studio Sanity
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Spécimen sans titre',
        subtitle: subtitle ? `Catégorie : ${subtitle}` : 'Catégorie non définie',
        media: media,
      };
    },
  },

  fields: [
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      description: 'Choisissez la catégorie à laquelle appartient le spécimen.',
      // On rend le champ obligatoire ici :
      validation: Rule => Rule.required().error('Attention : tu dois choisir une catégorie pour que l\'animal apparaisse dans la galerie !'),
      options: {
        list: ["Oiseaux", "Mammifères", "Trophées", "Poissons", "Nature morte"],
        layout: 'dropdown',
      }
    },
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Nom ou description courte du spécimen affiché sur le site.',
      validation: Rule => Rule.required().error('Un nom est nécessaire.'),
    },
    {
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      description: 'Photographie du spécimen. Utilisez le point focal (hotspot) pour centrer le cadrage.',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required().error('N\'oublie pas d\'ajouter une photo !'),
    }
  ]
};