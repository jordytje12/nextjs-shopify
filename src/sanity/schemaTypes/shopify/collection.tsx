// sanity/schemaTypes/shopify/collectionType.tsx
import { defineField, defineType } from 'sanity'

export const collectionType = defineType({
    name: 'collection',
    title: 'Shopify Collectie',
    type: 'document',
    icon: () => '📚', // Leuk icoontje voor in de lijst
    fields: [
        defineField({
            name: 'store',
            title: 'Shopify Data',
            type: 'object',
            readOnly: true,
            fields: [
                defineField({ name: 'title', title: 'Titel', type: 'string' }),
                defineField({ name: 'slug', title: 'Slug', type: 'slug' }),
                // BELANGRIJK: Voeg dit veld toe, anders kan 'preview' het niet vinden!
                defineField({ name: 'imageUrl', title: 'Image URL', type: 'string' }),
            ],
        }),
        // Je custom veld (deze willen we liefst zien als die er is)
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
            shopifyImage: 'store.imageUrl', // Dit is een URL string
            customImage: 'heroImage',       // Dit is een Sanity image object
        },
        // We halen beide afbeeldingen op
        prepare({ title, shopifyImage, customImage }) {
            return {
                title: title,
                subtitle: customImage ? 'Custom Banner actief' : 'Shopify afbeelding',
                // LOGICA:
                // 1. Is er een custom heroImage geüpload? Gebruik die (Sanity regelt de preview zelf).
                // 2. Zo niet, is er een Shopify image URL? Render die als <img /> tag.
                // 3. Zo niet, toon niets (null).
                media: customImage
                    ? customImage
                    : (shopifyImage ? <img src={shopifyImage} alt={title} style={{ objectFit: 'cover', height: '100%', width: '100%' }} /> : null)
        }
        }
    }
})