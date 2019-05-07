import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <h1>Game of Thrones</h1><span>{props.shows.length} Episodes</span>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link as={`/${show.season}/${show.number}`} href={`/post?season=${show.season}&number=${show.number}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/shows/82/episodes')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data.map(entry => entry)
  }
}

export default Index