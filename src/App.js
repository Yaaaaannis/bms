import React, { useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import MarqueeSection from './components/MarqueeSection';
import TshirtShowcase from './components/TshirtShowcase';
import styled from 'styled-components';
import Lenis from '@studio-freight/lenis';
import MarqueeSection2 from './components/MarqueeSection2';
import Roster from './components/Roster';
import DripDefinition from './components/DripDefinition';
const MainContainer = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
`

const PageWrapper = styled.div`
  width: 100%;
  position: relative;
`

function App() {
  

  return (
    <MainContainer>
      <PageWrapper>
        <Hero />
        <MarqueeSection />
        <TshirtShowcase />
        <MarqueeSection2 />
        <DripDefinition />
        <Roster />
      </PageWrapper>
    </MainContainer>
  );
}

export default App;
