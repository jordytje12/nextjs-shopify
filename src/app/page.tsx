import Banner from "@/src/components/ui/banner"
import { client } from '@/src/sanity/client'

const query = `*[_type == "homepage"][0]`;

export default async function Home() {
    const homepage = await client.fetch(query);
    return (
       <>
           <Banner
           heading={homepage.heading}
           image={homepage.heroImage}
           subheading={homepage.subheading}
           />
       </>
    )
}
