import HomePage from "./home";
export default function Home(props) {
  return <HomePage {...props} />;
}

export async function getServerSideProps({ query }) {
  const data = await fetch(process.env.CATEGORYLIST)
    .then((response) => response.json())
    .then(({ response: { data } }) => data);
  console.log(data);
  return {
    props: { categoriesDB: data },
  };
}
