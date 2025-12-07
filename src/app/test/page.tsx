import { ShopifyFetch } from '@/lib/shopify';
import { MyQuery } from '@/lib/queries/test';

export default async function TestPage() {
    const data = await ShopifyFetch({
        query: MyQuery,
    });

    console.log('Test Page Data:', data);

    return (
        <div>
            <h1>Test Page</h1>
            <p>This is a test page.</p>
            {data.shop?.name}
        </div>
    );
}