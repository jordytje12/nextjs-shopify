import { groq } from 'next-sanity'

export const footerQuery = groq`
  *[_type == "footer"][0] {
    "logoUrl": logo.asset->url,
    tagline,
    columns[] {
      heading,
      links[] {
        label,
        url
      }
    },
    socials[] {
      platform,
      url
    },
    copyright
  }
`