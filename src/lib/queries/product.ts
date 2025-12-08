// 1. De GraphQL Query
export const getProductQuery = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`