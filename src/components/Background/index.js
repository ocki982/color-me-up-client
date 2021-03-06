import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { MeshLine, MeshLineMaterial } from "threejs-meshline";
import { extend, Canvas, useFrame } from "@react-three/fiber";
import allMessagesAtom from '../../recoil/atoms';
import { useRecoilState } from "recoil";
import { arrayUnion } from "../../utils"
import { unAuthAxiosCall } from "../../services";

extend({ MeshLine, MeshLineMaterial })

const Confetti = ({ curve, width, color, speed }) => {
  const material = useRef();
  useFrame(() => (material.current.uniforms.dashOffset.value -= speed));
  return (
    <mesh>
      <meshLine attach="geometry" vertices={curve} />
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.9}
      />
    </mesh>
  );
};

const Lines = ({array}) => {
  const lines = useMemo(
    () =>
      new Array(array.length).fill().map((x,i) => {
        const pos = new THREE.Vector3(
          10 - Math.random() * 15,
          10 - Math.random() * 15,
          10 - Math.random() * 15
        );
        const points = new Array(30)
          .fill()
          .map(() =>
            pos
              .add(
                new THREE.Vector3(
                  4 - Math.random() * 8,
                  4 - Math.random() * 8,
                  2 - Math.random() * 4
                )
              )
              .clone()
          );
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);
        return {
          color: array[i]?.emotion || '',
          width: Math.max(0.1, 0.5 * Math.random()),
          speed: Math.max(0.0001, 0.0005 * Math.random()),
          curve,
        };
      }),
    [array]
  );

  return lines.map((props, index) => <Confetti key={index} {...props} />);
};

const Background = () => {
  const [allMessagesState, setAllMessagesState] = useRecoilState(allMessagesAtom);

  useEffect(() => {
    unAuthAxiosCall("/posts/all", {
      method: "GET"
    }).then((response) =>{
      const newAllMessages = arrayUnion(allMessagesState, response.data, (arr1, arr2) => arr1.id === arr2.id)
      setAllMessagesState(newAllMessages)
    });
  }, [])

  return (
    <Canvas linear camera={{ position: [0, 0, 10], fov: 25 }}>
      <Lines
        array={allMessagesState}
      />
    </Canvas>
  );
};

export default Background;
