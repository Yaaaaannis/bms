import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ThreeDCategory = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Centre par défaut
  const containerRef = useRef(null);
  
  const categories = [
    { id: 1, name: 'DRIP', image: './drip.png' },
    { id: 2, name: 'ESPORTS', image: './esport.png' },
    { id: 3, name: 'SPORTS', image: './sports.png' },
    { id: 4, name: 'SUPPORTERS', image: './supporters.png' },
    { id: 5, name: 'ACCESSOIRES', image: './accessoires.png' },
  ];

  const handleDrag = (e, info) => {
    const threshold = 50;
    if (info.offset.x > threshold && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    } else if (info.offset.x < -threshold && activeIndex < categories.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  return (
    <Container>
      <CollectionTitle>
      COLLECTIONS
      </CollectionTitle>
      <SliderContainer
        ref={containerRef}
        as={motion.div}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDrag}
      >
        {categories.map((category, index) => {
          const distance = index - activeIndex;
          const isActive = index === activeIndex;

          return (
            <CategoryPanel
              key={category.id}
              as={motion.div}
              initial={false}
              animate={{
                scale: isActive ? 1.2 : 0.8,
                rotateY: distance * 45,
                z: isActive ? 50 : -100 * Math.abs(distance),
                x: distance * 250,
                opacity: Math.abs(distance) > 2 ? 0 : 1,
              }}
              whileHover={isActive ? {
                scale: 1.3,
                transition: { duration: 0.3 }
              } : {}}
              $isActive={isActive}
            >
              <PanelContent>
                <CategoryImage 
                  src={category.image} 
                  alt={category.name}
                  $isActive={isActive}
                />
                <CategoryTitle $isActive={isActive}>{category.name}</CategoryTitle>
                {isActive && (
                  <ViewButton
                    as={motion.button}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ArrowIcon viewBox="0 0 24 24">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </ArrowIcon>
                  </ViewButton>
                )}
              </PanelContent>
            </CategoryPanel>
          );
        })}
      </SliderContainer>
      <Navigation>
        {categories.map((_, index) => (
          <NavDot 
            key={index}
            $isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </Navigation>
    </Container>
  );
};

// Styles mis à jour
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SliderContainer = styled.div`
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1500px;
  transform-style: preserve-3d;
`;

const CategoryPanel = styled.div`
  position: absolute;
  width: 300px;
  height: 450px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  transition: all 0.5s ease;
  cursor: pointer;
  box-shadow: ${props => props.$isActive 
    ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    : '0 10px 20px -6px rgba(0, 0, 0, 0.3)'};
`;

const PanelContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.3s ease;
  transform: scale(${props => props.$isActive ? 1.05 : 1});
`;

const CategoryTitle = styled.h3`
  color: white;
  font-size: ${props => props.$isActive ? '24px' : '20px'};
  margin: 15px 0;
  text-align: center;
  font-weight: 600;
`;

const ViewButton = styled(motion.button)`
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: transparent;
  border: 2px solid white;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: white;
    color: black;
  }
`;

const ArrowIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: white;
  transition: transform 0.3s ease;

  ${ViewButton}:hover & {
    fill: black;
    transform: translateX(5px);
  }
`;

const Navigation = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 40px;
`;

const NavDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$isActive ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$isActive ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

const CollectionTitle = styled.h2`
  color: white;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export default ThreeDCategory; 