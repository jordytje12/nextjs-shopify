import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    title,
    heading,
    subheading,
    heroImage,
    
    collectionCards[] {
      subtitle,
      title,
      subtext,
      "bgImageUrl": bgImage.asset->url,
      button {
        text,
        url
      }
    },
    banner {
      heading,
      subheading,
      "imageUrl": image.asset->url,
      button {
        text,
        url
      }
    },
    productCarousel[]-> {
      "title": store.title,
      "handle": store.slug.current,
      "price": store.priceRange.minVariantPrice,
      "imageUrl": store.previewImageUrl
    }
  }
`