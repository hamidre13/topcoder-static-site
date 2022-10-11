import axios from "axios"
export interface wpPostData {
  title: {
    rendered: string
  },
  content: {
    rendered: string
  },
  date_gmt: string
}
const Page = ({ postData }: { postData: wpPostData }) => {
  return (
    <div>
      <h1>{postData.title.rendered}</h1>
      <span>{postData.date_gmt}</span>
      <div dangerouslySetInnerHTML={{ __html: postData.content.rendered }} />
    </div>
  )
}

export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  const res = await axios.get(`https://www.topcoder.com/wp-json/wp/v2/posts?slug=${slug}`)
  return {
    props: { postData: res.data[0] },
    revalidate: 3600,
  }
}
export const getStaticPaths = async () => {
  const res = await axios.get('https://www.topcoder.com/wp-json/wp/v2/posts?_fields=slug')
  const paths = res.data.map((path: { slug: string }) => {
    return { params: { slug: path.slug } }
  })
  return {
    paths,
    fallback: false,
  }
}
export default Page