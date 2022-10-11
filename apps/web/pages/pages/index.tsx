import axios from "axios"
import { GetStaticProps } from "next"
import Link from "next/link";

interface Props {
  pages: {
    id: number;
    slug: string;
    title: {
      rendered: string;
    }
  }[]
}
const WPpages = ({ pages }: Props) => {

  return (
    <div>
      {pages.map((page) => {
        return (<div key={page.id}>
          <Link href={`/pages/${page.slug}`}>
            <a>{page.title.rendered}</a>
          </Link>
        </div>)
      })}
    </div >
  )

}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('https://www.topcoder.com/wp-json/wp/v2/pages?_fields=id,title,slug')
  return {
    props: { pages: res.data },
    revalidate: 3600,
  }
}
export default WPpages