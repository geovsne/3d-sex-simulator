import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import Scene from './components/Scene'
import Controls from './components/Controls'

const POSITIONS = [
  { id: 'missionary', label: 'Missionário', description: 'Clássico de frente' },
  { id: 'doggy', label: 'De quatro', description: 'Por trás' },
  { id: 'cowgirl', label: 'Cowgirl', description: 'Ela em cima' },
  { id: 'standing', label: 'Em pé', description: 'Contra a parede' },
  { id: 'side', label: 'De ladinho', description: 'Colher' },
]

export default function App() {
  const [position, setPosition] = useState('missionary')
  const [playing, setPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1.5, 4], fov: 45 }}
        shadows
        style={{ background: 'linear-gradient(180deg, #1a1020 0%, #0a0a0a 100%)' }}
      >
        <ambientLight intensity={0.4} />
        <spotLight
          position={[5, 8, 5]}
          angle={0.4}
          penumbra={0.8}
          intensity={1.5}
          castShadow
          shadow-mapSize={1024}
        />
        <spotLight position={[-4, 4, -2]} intensity={0.6} color="#ff6b9d" />
        <Environment preset="night" />

        <Scene position={position} playing={playing} speed={speed} />

        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.5}
          scale={12}
          blur={2.5}
        />
        <OrbitControls
          enablePan={false}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={8}
        />
      </Canvas>

      <Controls
        positions={POSITIONS}
        current={position}
        onChange={setPosition}
        playing={playing}
        onTogglePlay={() => setPlaying((p) => !p)}
        speed={speed}
        onSpeedChange={setSpeed}
      />
    </div>
  )
}