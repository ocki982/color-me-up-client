import React, { useRef } from "react";
import { Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";



export default function Render(props) {

    const starRef = useRef(); 

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        starRef.current.rotation.y = elapsedTime / 40;
    })

    return <>
    
    <Stars ref={starRef} radius={100} depth={10} count={2000} factor={5} saturation={0} fade={true}/>
    <mesh>
        <Sphere visible args={[1, 100, 200]} position={[-3, 0, 0]} scale={1}>
            <MeshDistortMaterial
            color="#ff0000"
            attach="material"
            distort={0.5}
            speed={1.5}
            roughness={0.65}
            />
        </Sphere>
        <Sphere visible args={[1, 100, 200]} position={[3, -2, 0]} scale={1}>
            <MeshDistortMaterial
            color="#f0b323"
            attach="material"
            distort={0.6}
            speed={1}
            roughness={0.65}
            />
        </Sphere>
        <Sphere visible args={[1, 100, 200]} rotation={[-Math.PI / 2, 0, 0]} position={[3, 2, 1]} scale={1}>
            <MeshDistortMaterial
            color="#0000ff"
            attach="material"
            distort={0.6}
            speed={1}
            roughness={0.65}
            />
        </Sphere>
        <Sphere visible args={[1, 100, 200]} position={[-2, 3, -1]} scale={1}>
            <MeshDistortMaterial
            color="#123456"
            attach="material"
            distort={0.6}
            speed={1}
            roughness={0.65}
            />
        </Sphere>
    </mesh> 
    </>
}