import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ShopifyFetch } from '@/src/lib/shopify'
import AddToCart from '@/src/components/modules/product/add-to-cart'
import { getProductQuery } from '@/src/lib/queries/product';

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const data = await ShopifyFetch({
    query: getProductQuery,
    variables: { handle }
  });

  const product = data?.product;

  if (!product) {
    return notFound();
  }

  const firstVariant = product.variants.edges[0]?.node;
  const mainImage = product.images.edges[0]?.node;
  
  const formattedPrice = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: firstVariant?.price?.currencyCode || 'EUR',
  }).format(firstVariant?.price?.amount || 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LINKS: Afbeeldingen Gallery */}
          <div className="space-y-6">
            {/* Hoofdafbeelding */}
            <div className="relative aspect-square w-full bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
              {mainImage ? (
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Geen afbeelding
                </div>
              )}
            </div>

            {/* Thumbnails (alleen tonen als er meer dan 1 is) */}
            {product.images.edges.length > 1 && (
               <div className="grid grid-cols-4 gap-4">
                 {product.images.edges.slice(1).map((img: any, i: number) => (
                   <div key={i} className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                     <Image 
                        src={img.node.url} 
                        alt={img.node.altText || 'Product afbeelding'} 
                        fill 
                        className="object-cover"
                     />
                   </div>
                 ))}
               </div>
            )}
          </div>

          {/* RECHTS: Product Info & Knoppen */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
               <span className="text-3xl font-medium text-gray-900">
                 {formattedPrice}
               </span>
               {/* Als er een 'compareAtPrice' is (Sale), toon die doorgestreept */}
               {firstVariant?.compareAtPrice && (
                 <span className="text-xl text-gray-500 line-through">
                    {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(firstVariant.compareAtPrice.amount)}
                 </span>
               )}
            </div>
            
            {/* Beschrijving (Komt als HTML uit Shopify) */}
            <div 
              className="prose prose-lg text-gray-600 mb-10 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
            />

            {/* Winkelwagen Knop */}
            <div className="border-t border-gray-100 pt-8">
               {firstVariant ? (
                 <AddToCart 
                   variantId={firstVariant.id} 
                   available={firstVariant.availableForSale} 
                 />
               ) : (
                 <p className="text-red-500">Product niet beschikbaar</p>
               )}
               
               <p className="text-xs text-center text-gray-400 mt-4">
                 Gratis verzending vanaf €50 • 30 dagen bedenktijd
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}