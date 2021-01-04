import { GraphQLClient } from "graphql-request";
import HomePage from "./home";
export default function Home(props) {
  return <HomePage {...props} />;
}

export async function getServerSideProps({ query }) {
  const gqlClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT);
  const {
    categoriesList,
    initialResults: { response, sponsors },
  } = await gqlClient.request(`query {
    initialResults {
      response {
        name
        value
        seller {
          key
          name
        }
        category
        image
        urlRefer
      }
      sponsors {
        key
        name
      }
    }
    categoriesList
  }`);
  return {
    props: {
      categoriesDB: categoriesList,
      initResults: { response, sponsors },
    },
  };
}
