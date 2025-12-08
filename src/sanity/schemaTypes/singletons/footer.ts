import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'tagline',
      title: 'Korte Tekst onder logo',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'columns',
      title: 'Footer Kolommen',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Kolom',
          fields: [
            { name: 'heading', type: 'string', title: 'Kolom Titel' },
            { 
              name: 'links', 
              type: 'array', 
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Link Tekst' },
                    { name: 'url', type: 'string', title: 'URL (bv /shop of /contact)' }
                  ]
                }
              ] 
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'socials',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
                name: 'platform', 
                type: 'string', 
                title: 'Platform', 
                options: {
                    list: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok']
                }
            },
            { name: 'url', type: 'url', title: 'Link' }
          ]
        }
      ]
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Tekst',
      type: 'string',
      initialValue: '© 2025 Mijn Bedrijf. Alle rechten voorbehouden.'
    })
  ]
})