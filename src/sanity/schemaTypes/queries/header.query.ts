import { groq } from 'next-sanity'

export const headerQuery = groq`
  *[_type == "header"][0] {
    logo {
      asset->{
        url,
        metadata {
          dimensions
        }
      },
      alt
    },
    menuItems[] {
      label,
      "slug": slug.current
    }
  }
`