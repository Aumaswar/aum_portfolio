import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  mouse?: [number, number];
};

export default function GlassShape({ mouse = [0, 0] }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Follow mouse with smoothing (lerp)
      // More responsive follow: stronger targets and faster lerp for snappier response
      const targetY = mouse[0] * 1.0;
      const targetX = mouse[1] * 0.6;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.14);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.14);

      const targetPosX = mouse[0] * 0.9;
      const targetPosY = mouse[1] * 0.35;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetPosX, 0.14);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetPosY, 0.14);

      // slight breathing scale
      const s = 1 + Math.sin(t * 1.1) * 0.01;
    meshRef.current.scale.setScalar(s * 1.8);
  });

  return (
    <Float speed={0.6} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.4, 256, 64]} />

        <MeshTransmissionMaterial
          background={new THREE.Color("#000000")}
          transmission={1}
          roughness={0.05}
          thickness={1.5}
          ior={1.2}
          chromaticAberration={0.4}
          anisotropy={0.5}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
}