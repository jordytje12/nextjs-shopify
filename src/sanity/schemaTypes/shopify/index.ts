// sanity/schemaTypes/shopify/index.ts
import { productType } from './product'
import { collectionType } from './collection'

// We exporteren een array met alle shopify-gerelateerde types
export const shopifyTypes = [
    productType,
    collectionType,
]