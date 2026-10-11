import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Placeholder humanoid figure.
 * Replace these with real .glb models later (doll + partner).
 */
function Figure({ color, scale = 1, ...props }) {
  return (
    <group {...props} scale={scale}>
      {/* Head */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <capsuleGeometry args={[0.22, 0.5, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
      {/* Hips */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.15, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.12, 0.2, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0.12, 0.2, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.32, 1.15, 0]} rotation={[0, 0, 0.4]} castShadow>
        <capsuleGeometry args={[0.06, 0.35, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0.32, 1.15, 0]} rotation={[0, 0, -0.4]} castShadow>
        <capsuleGeometry args={[0.06, 0.35, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
    </group>
  )
}

const POSES = {
  missionary: {
    doll: { pos: [0, 0, 0.15], rot: [0.15, 0, 0] },
    partner: { pos: [0, 0.35, -0.4], rot: [-0.3, 0, 0] },
    thrust: { axis: 'z', amount: 0.12 },
  },
  doggy: {
    doll: { pos: [0, 0.1, 0.2], rot: [0.9, 0, 0] },
    partner: { pos: [0, 0.4, -0.55], rot: [0.2, 0, 0] },
    thrust: { axis: 'z', amount: 0.15 },
  },
  cowgirl: {
    doll: { pos: [0, 0.55, 0], rot: [0, 0, 0] },
    partner: { pos: [0, 0, 0], rot: [0, 0, 0] },
    thrust: { axis: 'y', amount: 0.1 },
  },
  standing: {
    doll: { pos: [0, 0.9, 0.1], rot: [0.1, 0, 0] },
    partner: { pos: [0, 0.9, -0.35], rot: [-0.1, 0, 0] },
    thrust: { axis: 'z', amount: 0.1 },
  },
  side: {
    doll: { pos: [0.15, 0.15, 0], rot: [0, 0, 1.4] },
    partner: { pos: [-0.25, 0.2, -0.1], rot: [0, 0, 1.4] },
    thrust: { axis: 'x', amount: 0.1 },
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

      {/* Soft bed-like platform */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[2.2, 0.1, 1.6]} />
        <meshStandardMaterial color="#2a1a30" roughness={0.7} />
      </mesh>

      {/* Doll (feminine - pinkish) */}
      <Figure
        color="#e8a0b8"
        position={pose.doll.pos}
        rotation={pose.doll.rot}
      />

      {/* Partner (masculine - darker) */}
      <group ref={partnerRef} position={pose.partner.pos} rotation={pose.partner.rot}>
        <Figure color="#c4a882" scale={1.05} />
      </group>
    </group>
  )
}