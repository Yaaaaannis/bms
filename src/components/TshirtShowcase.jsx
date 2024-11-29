import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Float } from '@react-three/drei'
import styled from 'styled-components'
import { Model } from './Model'
import { TshirtModal } from './TshirtModal'

const ShowcaseContainer = styled.div`
  position: relative;
  padding: 20px 20px 0; // Réduit le padding bottom à 0
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  z-index: 2;
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 40px;
  font-weight: bold;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1175px;
  padding: 20px;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 0;
`

const TshirtCard = styled.div`
  background: white;
  border: 1px solid #000000;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    
    .canvas-container {
      background: #000000;
    }
  }
  
  .canvas-container {
    width: 100%;
    aspect-ratio: 1;
    background: #f5f5f5;
    transition: background 0.3s ease;
  }
  
  .info {
    padding: 16px;
    border-top: 1px solid #e0e0e0;
    
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: #000;
      text-transform: uppercase;
    }
    
    .price {
      font-size: 16px;
      color: #000;
      margin-top: 8px;
      font-weight: 500;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
  max-width: 1000px;
  padding: 0 20px;
`

const SortSelect = styled.select`
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`

const TSHIRTS = [
  {
    id: 1,
    name: "BMS SUPERNOVA 2024",
    price: "€49,99",
    modelPath: "/models/maillot.glb",
    color: "#ff0000"
  },
  {
    id: 2,
    name: "BMS AWAY 2024",
    price: "€49,99",
    modelPath: "/models/maillot.glb",
    color: "#00ff00"
  },
  {
    id: 3,
    name: "BMS HOLY ENERGY EDITION",
    price: "€49,99",
    modelPath: "/models/maillot.glb",
    color: "#0000ff"
  }
]

function TshirtCanvas({ children }) {
  return (
    <div className="canvas-container">
      <Suspense fallback={null}>
        <Canvas 
          shadows 
          camera={{ position: [0, 0, 2.5], fov: 50 }}
          gl={{ preserveDrawingBuffer: true }}
          style={{ background: 'transparent' }}
        >
          <Stage environment="city" intensity={0.6}>
            {children}
          </Stage>
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default function TshirtShowcase() {
  const [selectedTshirt, setSelectedTshirt] = useState(null)

  const handleCardClick = (tshirt) => {
    setSelectedTshirt(tshirt)
  }

  return (
    <ShowcaseContainer>
      <Header>
        <Title>DERNIERS ARTICLES</Title>
        <SortSelect defaultValue="bestsellers">
          <option value="bestsellers">Meilleures ventes</option>
          <option value="newest">Nouveautés</option>
          <option value="price-low">Prix croissant</option>
          <option value="price-high">Prix décroissant</option>
        </SortSelect>
      </Header>
      
      <GridContainer>
        {TSHIRTS.map((tshirt) => (
          <TshirtCard 
            key={tshirt.id}
            onClick={() => handleCardClick(tshirt)}
          >
            <TshirtCanvas>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Model 
                  scale={1.2}
                  position={[0, 0, 0]}
                  rotation={[0, 0, 0]}
                  modelPath={tshirt.modelPath}
                  hoverColor={tshirt.color}
                />
              </Float>
            </TshirtCanvas>
            <div className="info">
              <h3>{tshirt.name}</h3>
              <div className="price">{tshirt.price}</div>
            </div>
          </TshirtCard>
        ))}
      </GridContainer>

      {selectedTshirt && (
        <TshirtModal 
          isOpen={!!selectedTshirt} 
          onClose={() => setSelectedTshirt(null)}
          tshirt={selectedTshirt}
        />
      )}
    </ShowcaseContainer>
  )
} 