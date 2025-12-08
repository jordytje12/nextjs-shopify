import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document', // Vaak een singleton, maar document werkt ook
  fields: [
    defineField({
      name: 'title',
      title: 'Titel (Intern gebruik)',
      type: 'string',
      initialValue: 'Main Header',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'slug', type: 'slug', title: 'Link doel' }
          ]
        }
      ]
    }),
  ],
})