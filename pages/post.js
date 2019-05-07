import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
    <img src={props.show.image.medium} />
  </Layout>
)

Post.getInitialProps = async function(context) {
  const { season, number } = context.query;
  
  const res = await fetch(`http://api.tvmaze.com/shows/82/episodebynumber?season=${season}&number=${number}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post