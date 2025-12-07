import { defineField, defineType } from 'sanity'

export const productType = defineType({
    name: 'product', // <--- BELANGRIJK: Dit moet exact 'product' zijn voor Shopify Connect
    title: 'Shopify Product',
    type: 'document',
    fields: [
        defineField({
            name: 'store',
            title: 'Shopify Data',
            type: 'object',
            readOnly: true,
            fields: [
                defineField({ name: 'title', title: 'Titel', type: 'string' }),
                defineField({ name: 'slug', title: 'Slug', type: 'slug' }),
                defineField({ name: 'priceRange', title: 'Prijs', type: 'object',
                    fields: [
                        defineField({ name: 'minVariantPrice', type: 'number' }),
                        defineField({ name: 'maxVariantPrice', type: 'number' }),
                    ]
                }),
                defineField({ name: 'previewImageUrl', title: 'Preview Image', type: 'string' }),
            ],
        }),
        // Je eigen custom velden
        defineField({
            name: 'video',
            title: 'Product Video',
            type: 'file',
        }),
    ],
    preview: {
        select: {
            title: 'store.title',
            imageUrl: 'store.previewImageUrl',
        },
        prepare({ title, imageUrl}) {
            return {
                title: title,
                media: imageUrl ? <img src={imageUrl} alt={title} style={{objectFit: 'cover'}} /> : null
            }
        }
    }
})