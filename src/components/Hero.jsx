import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const waveShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    distortion: { value: 0.0 },
    mousePos: { value: new THREE.Vector2(0.5, 0.5) }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float distortion;
    uniform vec2 mousePos;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Distance de la souris avec une transition plus douce
      float dist = distance(uv, mousePos);
      float radius = 0.4;
      float strength = smoothstep(radius, 0.0, dist) * distortion;
      
      // Création de l'effet d'ondulation plus prononcé
      vec2 direction = normalize(uv - mousePos + 0.001);
      float wave = sin(dist * 15.0 - time * 2.0) * 0.5 + 0.5;
      
      // Amplitude plus importante
      vec2 offset = direction * wave * 0.03 * strength;
      
      // Assure que les UV restent dans les limites
      vec2 distortedUV = clamp(uv + offset, 0.0, 1.0);
      
      // Échantillonnage de la texture avec un léger effet de zoom
      vec2 zoomedUV = mix(uv, distortedUV, 1.0 + strength * 0.1);
      vec4 color = texture2D(tDiffuse, zoomedUV);
      
      gl_FragColor = color;
    }
  `
}

function VideoMaterial({ videoTexture, distortion, mousePos }) {
  const material = useRef()

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.time.value = state.clock.getElapsedTime()
      material.current.uniforms.distortion.value = distortion
      material.current.uniforms.mousePos.value = mousePos
    }
  })

  return (
    <shaderMaterial
      ref={material}
      args={[{
        ...waveShader,
        uniforms: {
          ...waveShader.uniforms,
          tDiffuse: { value: videoTexture }
        }
      }]}
    />
  )
}

function VideoPlane({ videoRef }) {
  const mousePosRef = useRef(new THREE.Vector2(0.5, 0.5))
  const [distortion, setDistortion] = useState(0)
  const { viewport } = useThree()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [videoRef])

  const handlePointerEnter = (e) => {
    // Initialise la position et la distortion dès l'entrée de la souris
    mousePosRef.current.set(e.uv.x, e.uv.y)
    setDistortion(1.0)
  }

  const handlePointerMove = (e) => {
    mousePosRef.current.set(e.uv.x, e.uv.y)
  }

  const handlePointerLeave = () => {
    gsap.to(mousePosRef.current, {
      x: 0.5,
      y: 0.5,
      duration: 0.5,
      ease: "power2.out"
    })
    setDistortion(0)
  }

  return (
    <mesh
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry />
      <VideoMaterial
        videoTexture={new THREE.VideoTexture(videoRef.current)}
        distortion={distortion}
        mousePos={mousePosRef.current}
      />
    </mesh>
  )
}

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(90%);
  opacity: 0;
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10%;
  width: 1O0%;
  color: white;
  text-align: left;
  pointer-events: none;
`

const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  margin: 0;
  line-height: 1.1;
  overflow: hidden;
  text-align: left;
  
  .line {
    opacity: 0;
    transform: translateY(100%);
  }
`

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin-top: 2rem;
  max-width: 600px;
  opacity: 0;
  transform: translateY(20px);
  text-align: left;
`

const Button = styled.button`
  margin-top: 3rem;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: transparent;
  border: 2px solid white;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  width: 90%;
  text-align: center;
  pointer-events: auto;
  position: relative;
  z-index: 10;
  isolation: isolate;
  
  &:hover {
    background: white;
    color: black;
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1rem;
  opacity: 0;
`

export default function Hero() {
  const videoRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const buttonRef = useRef()
  const scrollIndicatorRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 1.5
        }
      })

      const titleLines = titleRef.current.querySelectorAll('.line')
      tl.to(titleLines, {
        y: 0,
        opacity: 1,
        stagger: 0.2
      })
      .to(subtitleRef.current, {
        y: 0,
        opacity: 1
      }, "-=1")
      .to(buttonRef.current, {
        y: 0,
        opacity: 1
      }, "-=1")
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        duration: 1
      }, "-=0.5")
    })

    return () => ctx.revert()
  }, [])

  return (
    <HeroContainer>
      <VideoBackground ref={videoRef} autoPlay loop muted playsInline>
        <source src="/video.mp4" type="video/mp4" 
        
        />
      </VideoBackground>
      
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      >
        <VideoPlane videoRef={videoRef} />
      </Canvas>

      <ContentWrapper>
        <Title ref={titleRef}>
          <div className="line">BMS</div>
          <div className="line">COLLECTION</div>
        </Title>
        <Subtitle ref={subtitleRef}>
          La plus Drip des structures E-sports
        </Subtitle>
        <Button ref={buttonRef}>
          Découvrir
        </Button>
      </ContentWrapper>

      <ScrollIndicator ref={scrollIndicatorRef}>
        Scroll pour découvrir
      </ScrollIndicator>
    </HeroContainer>
  )
} 