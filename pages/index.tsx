import type { NextPage } from 'next';
import { useContext } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Search from '../components/Search';
import MeasurementCards from '../components/MeasurementCards';
import styled from 'styled-components';
import { useState } from 'react';
import SelectionBoxProvider, {
  SelectionBoxStateContext,
} from '../contexts/SelectionBox';

const StyledMainArea = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledHeadArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 3rem);
  max-width: 38rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
`;

const StyledResultsArea = styled.section<{ showSelectionBox: boolean }>`
  transition: transform 500ms ease-in-out;
  transform: ${(props) =>
    props.showSelectionBox
      ? `translate3d(0, 24rem, 0)`
      : `translate3d(0, 8rem, 0)`};
  @media (max-width: 864px) {
    transform: ${(props) =>
      props.showSelectionBox
        ? `translate3d(0, 24rem, 0)`
        : `translate3d(0, 4rem, 0)`};
  }
`;
const Home: NextPage<{ cities: string[] }> = ({ cities }) => {
  // this would normally be in the search component, but we can use this here
  // to create a cool animation effect in the styled results area.
  const [showSelector, setShowSelector] = useState<boolean>(false);
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
      <SelectionBoxProvider>
        <StyledMainArea>
          <StyledHeadArea>
            <Header />
            <Search cities={cities} />
          </StyledHeadArea>
        </StyledMainArea>
        <SelectionBoxStateContext.Consumer>
          {({ showSelectionBox }) => (
            <StyledResultsArea showSelectionBox={showSelectionBox} id="results">
              <MeasurementCards />
            </StyledResultsArea>
          )}
        </SelectionBoxStateContext.Consumer>
      </SelectionBoxProvider>
    </div>
  );
};

/* since the list of cities is unlikely to change anytime soon, this can be gathered statically,
    with incremental static regeneration. In other words, this is a statically generated page,
    that rebuilds at most once every 60 seconds. 

    Since this list is cached, it also ensures that the list of cities - which again, rarely changes - 
    will still be available if the cities endpoint on the 3rd party API goes down. 
    
    See https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration for more info. */

export async function getStaticProps() {
  const citiesURL = 'https://docs.openaq.org/v2/cities?country=GB&limit=200';
  /* Oh, one more cool thing. Since getStaticProps() runs only on the server,
     and never in the client, we don't have to worry about CORS issues and
     can ping the API directly. */
  const json = await fetch(citiesURL, {
    method: 'GET',
  }).then((response) => response.json());

  const cities = json.results.map(({ city }: any): string => city);

  return {
    props: { cities },
    revalidate: 60, // this function will not run more than once every 60 seconds;
  };
}

export default Home;
