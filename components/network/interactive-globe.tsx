"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Environment, Sphere } from "@react-three/drei"
import * as THREE from "three"

const pilotSites = [
  {
    name: "St. Martin's Island",
    coords: { lat: 20.6273, lng: 92.3226 },
    status: "active",
    farms: 12,
    area: "45 hectares",
  },
  {
    name: "Cox's Bazar",
    coords: { lat: 21.4272, lng: 92.0058 },
    status: "active",
    farms: 8,
    area: "32 hectares",
  },
]

function latLngToVector3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return [x, y, z]
}

function PilotMarker({ site, radius }: { site: (typeof pilotSites)[0]; radius: number }) {
  const position = latLngToVector3(site.coords.lat, site.coords.lng, radius + 0.02)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#22ff88" emissive="#22ff88" emissiveIntensity={2} />
      </mesh>
      {/* Pulse ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.06, 32]} />
        <meshStandardMaterial color="#22ff88" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <Html distanceFactor={4} position={[0.1, 0.1, 0]}>
        <div className="glass rounded-lg p-3 min-w-[140px] pointer-events-auto">
          <div className="text-xs font-bold text-primary mb-1">{site.name}</div>
          <div className="flex items-center gap-1 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-live" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{site.status}</span>
          </div>
          <div className="text-[10px] text-muted-foreground">
            {site.farms} farms | {site.area}
          </div>
        </div>
      </Html>
    </group>
  )
}

function GlobeGrid({ radius }: { radius: number }) {
  const geometry = useMemo(() => {
    const vertices: number[] = []

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      for (let lng = 0; lng < 360; lng += 5) {
        const [x1, y1, z1] = latLngToVector3(lat, lng, radius + 0.001)
        const [x2, y2, z2] = latLngToVector3(lat, lng + 5, radius + 0.001)
        vertices.push(x1, y1, z1, x2, y2, z2)
      }
    }

    // Longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      for (let lat = -60; lat < 60; lat += 5) {
        const [x1, y1, z1] = latLngToVector3(lat, lng, radius + 0.001)
        const [x2, y2, z2] = latLngToVector3(lat + 5, lng, radius + 0.001)
        vertices.push(x1, y1, z1, x2, y2, z2)
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
    return geo
  }, [radius])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#1a8a8a" opacity={0.3} transparent />
    </lineSegments>
  )
}

function Globe() {
  const globeRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001
    }
  })

  const radius = 1

  return (
    <group ref={globeRef}>
      {/* Ocean sphere */}
      <Sphere args={[radius, 64, 64]}>
        <meshStandardMaterial color="#0a2a3a" roughness={0.8} metalness={0.2} transparent opacity={0.95} />
      </Sphere>

      {/* Grid overlay */}
      <GlobeGrid radius={radius} />

      {/* Pilot site markers */}
      {pilotSites.map((site) => (
        <PilotMarker key={site.name} site={site} radius={radius} />
      ))}

      {/* Atmospheric glow */}
      <Sphere args={[radius * 1.02, 64, 64]}>
        <meshStandardMaterial color="#22aa88" transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
}

export function InteractiveGlobe() {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative">
      <Canvas camera={{ position: [2.5, 1, 2.5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#22ff88" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1a8a8a" />
        <Globe />
        <OrbitControls
          enableZoom={true}
          minDistance={1.8}
          maxDistance={5}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
        />
        <Environment preset="night" />
      </Canvas>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass rounded-lg p-3">
        <div className="text-xs font-semibold text-foreground mb-2">Pilot Sites</div>
        {pilotSites.map((site) => (
          <div key={site.name} className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1 last:mb-0">
            <span className="h-2 w-2 rounded-full bg-primary pulse-live" />
            {site.name}
          </div>
        ))}
      </div>
    </div>
  )
}
