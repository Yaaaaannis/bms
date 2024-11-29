import { useGLTF } from '@react-three/drei'

export function Maillot({ modelPath, ...props }) {
  const gltf = useGLTF(modelPath)
  
  return (
    <primitive 
      object={gltf.scene} 
      {...props}
    />
  )
}

// Préchargement du modèle pour de meilleures performances
useGLTF.preload('/models/maillot.glb')