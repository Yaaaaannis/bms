import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage, OrbitControls, Float } from '@react-three/drei'
import styled from 'styled-components'
import { Model } from './Model'
import { createPortal } from 'react-dom'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  width: 80vw;
  height: 80vh;
  background: white;
  border-radius: 8px;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  
  &:hover {
    background: #f0f0f0;
  }
`

export function TshirtModal({ isOpen, onClose, tshirt }) {
  if (!isOpen) return null

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <Float>
              <Stage environment="city" intensity={0.6}>
                <Model 
                scale={2}
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                modalView={true}
                modelPath={tshirt.modelPath}
                hoverColor={tshirt.color}
                />
              </Stage>
            </Float>
          </Canvas>
        </Suspense>
      </ModalContent>
    </ModalOverlay>,
    document.body
  )
} 