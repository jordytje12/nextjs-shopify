import Banner from "@/src/components/ui/banner"
import { client } from '@/src/sanity/client'
import { homepageQuery } from "../sanity/schemaTypes/queries/homepage.query";
import CollectionCard from "../components/modules/collection/collection-card";
import OnPageBanner from '../components/ui/onpage-banner';
import ProductCarousel from "../components/modules/product/product-carousel";

export default async function Home() {
    const data = await client.fetch(homepageQuery);
    const {collectionCards, banner, productCarousel} = data || [];
    return (
       <>
           <Banner
           heading={data.heading}
           image={data.heroImage}
           subheading={data.subheading}
           />
           {/* Voeg hier later de Collection Cards grid toe */}
          {collectionCards && collectionCards.length > 0 ? (
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:my-6 px-4">
              {collectionCards.map((card: any, index: number) => (
                <CollectionCard
                  key={index}
                  subtitle={card.subtitle}
                  title={card.title}
                  subtext={card.subtext}
                  bgImageUrl={card.bgImageUrl}
                  button={card.button}
                />
              ))}
            </div>
          ) : (
            <p>Nog geen kaarten toegevoegd in Sanity.</p>
          )}   
          <OnPageBanner data={banner} />
          <ProductCarousel
            title="Shop Our Icons"
            products={productCarousel}
          />
       </>
    )
}
