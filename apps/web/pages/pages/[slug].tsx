import axios from "axios"

const Page = ({ pageData }) => {
  return (
    <div>
      <h1>{pageData.title.rendered}</h1>
      <span>{pageData.date_gmt}</span>
      <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
    </div>
  )
}

export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  const res = await axios.get(`https://www.topcoder.com/wp-json/wp/v2/pages?slug=${slug}`)
  return {
    props: { pageData: res.data[0] },
    revalidate: 3600,
  }
}
export const getStaticPaths = async () => {
  const res = await axios.get('https://www.topcoder.com/wp-json/wp/v2/pages?_fields=slug')
  const paths = res.data.map((path: { slug: string }) => {
    return { params: { slug: path.slug } }
  })
  return {
    paths,
    fallback: false,
  }
}
export default Page