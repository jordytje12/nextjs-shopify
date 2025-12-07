const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION;

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export async function ShopifyFetch({ query, variables, }: { query: string; variables?: Record<string, any>; }) {
    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
            },
            body: JSON.stringify({
                query: query,
                variables: variables,
            }),
        });

        const body = await result.json();

        if (body.errors) {
            throw new Error (body.errors[0].message);
        }

        return body.data;

    } catch (error) {
        console.error('Shopify Fetch Error:', error);
        throw {
            error,
            query,
        }
    }
}