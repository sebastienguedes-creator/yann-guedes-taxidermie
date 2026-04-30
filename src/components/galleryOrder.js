export default {
  name: 'galleryOrder',
  title: 'Gestion de la Galerie',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre du document',
      type: 'string',
      initialValue: 'Configuration Site',
      //readOnly: true, // Empêche Yann de modifier le nom technique du bloc
    },
    {
      name: 'mammiferes',
      title: 'Mammifères',
      type: 'array',
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
      of: [{ 
        type: 'reference', 
        to: [{ type: 'specimen' }],
        options: {
          filter: 'category == "Trophées"'
        }
      }],
    }
  ]
}