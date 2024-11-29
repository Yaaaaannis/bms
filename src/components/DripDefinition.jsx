import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const CustomCursor = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  display: none;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const DripSection = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 2rem;
  background: white;
  position: relative;
  overflow: hidden;
`

const ContentWrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  background: black;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 3rem;
  margin: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 500;
  margin-bottom: 2rem;
  font-family: 'Helvetica Neue', sans-serif;
  color: white;
  font-style: italic;
  cursor: pointer;
  
  span {
    display: inline-block;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
  }
`

const Definition = styled(motion.p)`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.4;
  font-weight: 300;
  opacity: 0.9;
  max-width: 1200px;
  color: white;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`

export default function DripDefinition() {
  const cursorRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const section = sectionRef.current;

    const onMouseEnter = () => {
      cursor.style.display = 'block';
    };

    const onMouseLeave = () => {
      cursor.style.display = 'none';
    };

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.set(cursor, {
        x: clientX,
        y: clientY
      });
    };

    section.addEventListener('mouseenter', onMouseEnter);
    section.addEventListener('mouseleave', onMouseLeave);
    section.addEventListener('mousemove', onMouseMove);

    return () => {
      section.removeEventListener('mouseenter', onMouseEnter);
      section.removeEventListener('mouseleave', onMouseLeave);
      section.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Séparer le titre en lettres individuelles pour l'animation
  const titleLetters = "DRIP".split("");

  return (
    <>
      <CustomCursor ref={cursorRef}>
        <img src="/neeroz.jpeg" alt="cursor" />
      </CustomCursor>
      <DripSection ref={sectionRef}>
        <ContentWrapper>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                whileHover={{ 
                  scale: 1.2,
                  rotate: Math.random() * 20 - 10 // Rotation aléatoire entre -10 et 10 degrés
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {letter}
              </motion.span>
            ))}
          </Title>
          <Definition
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3 }
            }}
          >
            Terme informel utilisé pour décrire un style vestimentaire, souvent associé à une forte esthétique et un sens du design. Il met l'accent sur l'élégance, l'originalité et la confiance dans le choix des vêtements et des accessoires.
          </Definition>
        </ContentWrapper>
      </DripSection>
    </>
  );
} 