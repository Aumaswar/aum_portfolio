import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function GlassShape() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const { viewport, mouse } = useThree();

    // Animating the shape
    useFrame((state) => {
        if (!meshRef.current || !materialRef.current) return;

        // Smoothly rotate based on mouse position
        const targetX = (mouse.x * viewport.width) / 4;
        const targetY = (mouse.y * viewport.height) / 4;

        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.005;

        // Morph the material properties slightly over time for a "liquid" feel
        materialRef.current.distortion = 0.5 + Math.sin(state.clock.elapsedTime) * 0.2;
    });

    return (
        <Float
            speed={2}
            rotationIntensity={1}
            floatIntensity={2}
        >
            <mesh ref={meshRef} scale={1.8}>
                {/* An interesting 3D Geometry (TorusKnot is complex and refracts beautifully) */}
                <torusKnotGeometry args={[1, 0.4, 256, 64]} />

                {/* The premium Glass/Water material */}
                <MeshTransmissionMaterial
                    ref={materialRef}
                    background={new THREE.Color('#000000')}
                    transmission={1} // highly transmissive (glass-like)
                    roughness={0.05} // very smooth
                    thickness={1.5}  // refracts light heavily
                    ior={1.2}        // Index of Refraction (glass/water-like)
                    chromaticAberration={0.4} // Adds the premium RGB split on edges
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
