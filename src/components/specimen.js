export default {
  name: 'specimen',
  title: 'Spécimen',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      // On rend le champ obligatoire ici :
      validation: Rule => Rule.required().error('Attention : tu dois choisir une catégorie pour que l\'animal apparaisse dans la galerie !'),
      options: {
        list: ["Oiseaux", "Mammifères", "Trophées", "Poissons"],
      }
    },
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required().error('Un nom est nécessaire.'),
    },
    {
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required().error('N\'oublie pas d\'ajouter une photo !'),
    }
  ]
}