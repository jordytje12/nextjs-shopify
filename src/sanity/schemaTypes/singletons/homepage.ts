import { defineField, defineType } from 'sanity';

export const homepage = defineType({
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        // ... je bestaande velden
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'heading', type: 'string', title: 'Heading'}),
        defineField({name: 'subheading', type: 'string', title: 'Subheading'}),
        defineField({name: 'heroImage', type: 'image', title: 'Hero Image', options: { hotspot: true }}),
        
        // NIEUW: De Collection Cards sectie
        defineField({
            name: 'collectionCards',
            title: 'Collection Cards (Grid)',
            description: 'Voeg hier precies 4 kaarten toe voor de 2x2 grid',
            type: 'array',
            validation: Rule => Rule.max(4), // Zorgt dat je er niet meer dan 4 toevoegt
            of: [
                {
                    type: 'object',
                    name: 'card',
                    title: 'Card',
                    fields: [
                        { name: 'subtitle', type: 'string', title: 'Subtitel (klein boven)' },
                        { name: 'title', type: 'string', title: 'Titel (Groot)' },
                        { name: 'subtext', type: 'text', rows: 2, title: 'Korte beschrijving' },
                        { 
                            name: 'bgImage', 
                            type: 'image', 
                            title: 'Achtergrond Afbeelding',
                            options: { hotspot: true }
                        },
                        {
                            name: 'button',
                            type: 'object',
                            title: 'Knop',
                            fields: [
                                { name: 'text', type: 'string', title: 'Knop Tekst' },
                                { name: 'url', type: 'string', title: 'Knop URL (bv: /collectie-a)' }
                            ]
                        }
                    ],
                    // Zorgt voor een mooie preview in Sanity Studio
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'subtitle',
                            media: 'bgImage'
                        }
                    }
                }
            ]
        }),
        defineField({
            name: 'banner',
            title: 'Banner',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading' },
                { name: 'subheading', type: 'string', title: 'Subheading' },
                { 
                    name: 'image', 
                    type: 'image', 
                    title: 'Image',
                    options: { hotspot: true }
                },
                { name: 'button', type: 'object', title: 'Button', fields: [
                    { name: 'text', type: 'string', title: 'Button Text' },
                    { name: 'url', type: 'string', title: 'Button URL' }
                ]},
            ]
        }),
        // ... in je fields array
        defineField({
            name: 'productCarousel',
            title: 'Product Carousel',
            description: 'Selecteer producten uit de database',
            type: 'array',
            of: [
                {
                    type: 'reference',      // <--- DIT IS HET BELANGRIJKSTE VERSCHIL
                    to: [{ type: 'product' }] // Verwijst naar documenten met type "product"
                }
            ]
        }),
    ]
})