/**
 * ============================================================================
 * FICHIER : galleryOrder.js (Sanity Schema)
 * DESCRIPTION : Configuration et gestion de l'ordre d'affichage de la galerie.
 * OPTIMISATIONS : Ajout du preview et de descriptions contextuelles (Zéro régression).
 * ============================================================================
 */

export default {
  name: 'galleryOrder',
  title: 'Gestion de la Galerie',
  type: 'document',

  // Aperçu personnalisé dans le Studio Sanity
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Configuration de la Galerie',
        subtitle: 'Gestion de l\'ordre des spécimens',
      };
    },
  },

  fields: [
    // -------------------------------------------------------------------------
    // 1. PARAMÈTRES GÉNÉRAUX DU DOCUMENT
    // -------------------------------------------------------------------------
    {
      name: 'title',
      title: 'Titre du document',
      type: 'string',
      initialValue: 'Configuration Site',
      description: 'Nom interne du document de configuration.',
      //readOnly: true, // Empêche de modifier le nom technique du bloc
    },

    // -------------------------------------------------------------------------
    // 2. LISTES DE RÉFÉRENCES PAR CATÉGORIE
    // -------------------------------------------------------------------------
    {
      name: 'mammiferes',
      title: 'Mammifères',
      type: 'array',
      description: 'Glissez-déposez pour définir l\'ordre d\'affichage des mammifères.',
      of: [{ 
        type: 'reference',
        to: [{ type: 'specimen' }],
        options: {
          // Attention : "Mammifères" avec Majuscule et accent
          filter: 'category == "Mammifères"'
        }
      }],
    },
    {
      name: 'oiseaux',
      title: 'Oiseaux',
      type: 'array',
      description: 'Glissez-déposez pour définir l\'ordre d\'affichage des oiseaux.',
      of: [{ 
        type: 'reference',
        to: [{ type: 'specimen' }],
        options: {
          filter: 'category == "Oiseaux"'
        }
      }],
    },
    {
      name: 'poissons',
      title: 'Poissons',
      type: 'array',
      description: 'Glissez-déposez pour définir l\'ordre d\'affichage des poissons.',
      of: [{ 
        type: 'reference',
        to: [{ type: 'specimen' }],
        options: {
          filter: 'category == "Poissons"'
        }
      }],
    },
    {
      name: 'trophees',
      title: 'Trophées',
      type: 'array',
      description: 'Glissez-déposez pour définir l\'ordre d\'affichage des trophées.',
      of: [{ 
        type: 'reference',
        to: [{ type: 'specimen' }],
        options: {
          filter: 'category == "Trophées"'
        }
      }],
    },
    {
      name: 'natureMorte', // Nom technique
      title: 'Nature morte', // Nom affiché dans Sanity
      type: 'array',
      description: 'Glissez-déposez pour définir l\'ordre d\'affichage des natures mortes.',
      of: [{ 
        type: 'reference',
        to: [{ type: 'specimen' }],
        options: {
          filter: 'category == "Nature morte"' // Doit correspondre à la valeur dans vos spécimens
        }
      }],
    }
  ]
}