import axios from "axios"
import { GetStaticProps } from "next"
import Link from "next/link";

interface Props {
  posts: {
    id: number;
    slug: string;
    title: {
      rendered: string;
    }
  }[]
}
const WPposts = ({ posts }: Props) => {

  return (
    <div>
      {posts.map((post) => {
        return (<div key={post.id}>
          <Link href={`/posts/${post.slug}`}>
            <a>{post.title.rendered}</a>
          </Link>
        </div>)
      })}
    </div >
  )

}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('https://www.topcoder.com/wp-json/wp/v2/posts?_fields=id,title,slug')
  return {
    props: { posts: res.data },
    revalidate: 3600,
  }
}
export default WPposts