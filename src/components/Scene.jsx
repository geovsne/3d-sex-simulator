import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Feminine figure - more curvy and "tesuda"
 */
function DollFigure({ color = '#e8a0b8', ...props }) {
  return (
    <group {...props}>
      {/* Head */}
      <mesh position={[0, 1.58, 0]} castShadow>
        <sphereGeometry args={[0.17, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.38, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.12, 12]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>

      {/* Breasts */}
      <mesh position={[-0.13, 1.22, 0.12]} castShadow>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      <mesh position={[0.13, 1.22, 0.12]} castShadow>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* Torso / waist */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <capsuleGeometry args={[0.16, 0.35, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* Wide hips / butt */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.55, -0.08]} castShadow>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.14, 0.22, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.38, 6, 12]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
      <mesh position={[0.14, 0.22, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.38, 6, 12]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.28, 1.15, 0]} rotation={[0, 0, 0.5]} castShadow>
        <capsuleGeometry args={[0.055, 0.32, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
      <mesh position={[0.28, 1.15, 0]} rotation={[0, 0, -0.5]} castShadow>
        <capsuleGeometry args={[0.055, 0.32, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
    </group>
  )
}

/**
 * Masculine figure
 */
function PartnerFigure({ color = '#c4a882', ...props }) {
  return (
    <group {...props}>
      {/* Head */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.42, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.12, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      {/* Broad torso */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <capsuleGeometry args={[0.26, 0.45, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>

      {/* Hips */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.18, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.13, 0.22, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.4, 6, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0.13, 0.22, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.4, 6, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.36, 1.2, 0]} rotation={[0, 0, 0.35]} castShadow>
        <capsuleGeometry args={[0.07, 0.38, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0.36, 1.2, 0]} rotation={[0, 0, -0.35]} castShadow>
        <capsuleGeometry args={[0.07, 0.38, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
    </group>
  )
}

const POSES = {
  missionary: {
    doll: { pos: [0, 0, 0.15], rot: [0.2, 0, 0] },
    partner: { pos: [0, 0.4, -0.45], rot: [-0.35, 0, 0] },
    thrust: { axis: 'z', amount: 0.14 },
  },
  doggy: {
    doll: { pos: [0, 0.15, 0.25], rot: [1.0, 0, 0] },
    partner: { pos: [0, 0.45, -0.6], rot: [0.25, 0, 0] },
    thrust: { axis: 'z', amount: 0.16 },
  },
  cowgirl: {
    doll: { pos: [0, 0.6, 0], rot: [0, 0, 0] },
    partner: { pos: [0, 0, 0], rot: [0, 0, 0] },
    thrust: { axis: 'y', amount: 0.12 },
  },
  standing: {
    doll: { pos: [0, 0.95, 0.12], rot: [0.12, 0, 0] },
    partner: { pos: [0, 0.95, -0.4], rot: [-0.12, 0, 0] },
    thrust: { axis: 'z', amount: 0.11 },
  },
  side: {
    doll: { pos: [0.18, 0.18, 0], rot: [0, 0, 1.45] },
    partner: { pos: [-0.28, 0.22, -0.12], rot: [0, 0, 1.45] },
    thrust: { axis: 'x', amount: 0.11 },
  },
}

export default function Scene({ position, playing, speed }) {
  const partnerRef = useRef()
  const timeRef = useRef(0)

  const pose = POSES[position] || POSES.missionary

  useFrame((_, delta) => {
    if (!playing || !partnerRef.current) return
    timeRef.current += delta * speed * 4
    const t = Math.sin(timeRef.current) * pose.thrust.amount

    const base = pose.partner.pos
    if (pose.thrust.axis === 'z') {
      partnerRef.current.position.set(base[0], base[1], base[2] + t)
    } else if (pose.thrust.axis === 'y') {
      partnerRef.current.position.set(base[0], base[1] + Math.abs(t), base[2])
    } else {
      partnerRef.current.position.set(base[0] + t, base[1], base[2])
    }
  })

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1220" roughness={0.9} />
      </mesh>

      {/* Soft bed */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[2.4, 0.12, 1.8]} />
        <meshStandardMaterial color="#2a1a30" roughness={0.65} />
      </mesh>

      {/* Doll */}
      <DollFigure
        position={pose.doll.pos}
        rotation={pose.doll.rot}
      />

      {/* Partner */}
      <group ref={partnerRef} position={pose.partner.pos} rotation={pose.partner.rot}>
        <PartnerFigure />
      </group>
    </group>
  )
}