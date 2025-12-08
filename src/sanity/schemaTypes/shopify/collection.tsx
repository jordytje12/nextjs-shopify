// sanity/schemaTypes/shopify/collectionType.tsx
import { defineField, defineType } from 'sanity'

export const collectionType = defineType({
    name: 'collection',
    title: 'Shopify Collectie',
    type: 'document',
    icon: () => '📚',
    fields: [
        defineField({
            name: 'store',
            title: 'Shopify Data',
            type: 'object',
            readOnly: true,
            fields: [
                defineField({ name: 'title', title: 'Titel', type: 'string' }),
                defineField({ name: 'slug', title: 'Slug', type: 'slug' }),
                defineField({ name: 'imageUrl', title: 'Image URL', type: 'string' }),
            ],
        }),
        defineField({
            name: 'heroImage',
            title: 'Collectie Header',
            type: 'image',
            options: { hotspot: true }
        }),
    ],
    preview: {
        select: {
            title: 'store.title',
            shopifyImage: 'store.imageUrl',
            customImage: 'heroImage',
        },
        prepare({ title, shopifyImage, customImage }) {
            return {
                title: title,
                subtitle: customImage ? 'Custom Banner actief' : 'Shopify afbeelding',
                media: customImage
                    ? customImage
                    : (shopifyImage ? <img src={shopifyImage} alt={title} style={{ objectFit: 'cover', height: '100%', width: '100%' }} /> : null)
        }
        }
    }
})