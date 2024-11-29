import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const MarqueeContainer = styled.div`
  background: black;
  color: white;
  padding: 2rem 0;
  overflow: hidden;
  position: relative;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 250px;
    height: 100%;
    z-index: 2;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, black, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, black, transparent);
  }
`

const MarqueeTrack = styled.div`
  display: flex;
  gap: 2rem;
  white-space: nowrap;
  align-items: center;
  position: relative;
  will-change: transform;
`

const MarqueeText = styled.span`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  text-transform: uppercase;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`

const ButtonStyle = styled.button`
  border: 2px solid white;
  border-radius: 100px;
  padding: 0.5rem 2rem;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  background: transparent;
  color: white;
  
  &:hover {
    background: white;
    color: black;
    transform: scale(1.05);
  }
`

const Icon = styled.span`
  font-size: clamp(2rem, 4vw, 3rem);
  margin-left: 1rem;
`

export default function MarqueeSection2() {
  const trackRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const content = contentRef.current;
      const contentWidth = content.offsetWidth;
      
      // Calculer combien de copies nous avons besoin pour remplir l'écran + un peu plus
      const copies = Math.ceil(window.innerWidth / contentWidth) + 1;
      
      // Supprimer les anciennes copies s'il y en a
      while (trackRef.current.children.length > 1) {
        trackRef.current.removeChild(trackRef.current.lastChild);
      }
      
      // Ajouter le nombre nécessaire de copies
      for (let i = 0; i < copies; i++) {
        trackRef.current.appendChild(content.cloneNode(true));
      }

      // Animation dans le sens inverse
      gsap.to(trackRef.current, {
        x: contentWidth, // Direction inverse
        duration: 20,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
        },
        onRepeat: () => {
          gsap.set(trackRef.current, { x: 0 });
        }
      });
    });

    const handleResize = () => {
      ctx.revert();
      ctx = gsap.context(() => {
        const content = contentRef.current;
        const contentWidth = content.offsetWidth;
        
        gsap.to(trackRef.current, {
          x: contentWidth, // Direction inverse
          duration: 20,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
          }
        });
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <MarqueeContainer>
      <MarqueeTrack ref={trackRef}>
        <MarqueeText ref={contentRef}>
          <span>★ MAILLOT 2024</span>
          <ButtonStyle onClick={() => {/* votre action */}}>
            SHOP NOW
          </ButtonStyle>
          <Icon>✦</Icon>
        </MarqueeText>
      </MarqueeTrack>
    </MarqueeContainer>
  );
} 