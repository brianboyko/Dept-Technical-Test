import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Search from "../components/Search";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Home: NextPage<{listOfCities: string[]}> = ({listOfCities}) => {
  return (
    <div>
      <Head>
        <title>Compare your air</title>
        <meta
          name="description"
          content="Compare the air quality between cities in the UK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledContainer>
        <main>
          <Header />
          <Search listOfCities={listOfCities}/>
        </main>
      </StyledContainer>
      <hr />
    </div>
  );
};

/* since the list of cities is unlikely to change anytime soon, this can be gathered statically,
    with incremental static regeneration. In other words, this is a statically generated page,
    that rebuilds at most once every 60 seconds. 
    See https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration for more info. */

export async function getStaticProps() {
  // we hit our own local API instead of hitting the external API to ensure CORS compatability.
  const listOfCities = await fetch(`${process.env.SELF_HOST}/api/cities`).then((res) => res.json());
  return {
    props: { listOfCities },
    revalidate: 60, // this function will not run more than once every 60 seconds;
  };
}


export default Home;
