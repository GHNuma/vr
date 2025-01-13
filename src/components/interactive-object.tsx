import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import {useFrame} from "@react-three/fiber";
import {EachModal} from "../pages/tech-room/const/modals/in_room.tsx";

interface InteractiveObjectProps {
    position: [number, number, number];
    data: EachModal
}

const InteractiveObject: React.FC<InteractiveObjectProps> = ({ position, data }) => {
    const { headerText, list, text } = data;
    const sphereRef = useRef<THREE.Mesh>(null);
    const outlineRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const newPosition: [number, number, number] = [position[0], position[1] + 0.09, position[2]];
    useFrame(({ raycaster, clock }: { raycaster: THREE.Raycaster; clock: THREE.Clock }) => {
        if (sphereRef.current) {
            // Проверяем пересечение с большой невидимой сферой
            const intersects = raycaster.intersectObject(sphereRef.current);
            setHovered(intersects.length > 0);

            const elapsedTime = clock.getElapsedTime();
            const scaleFactor = hovered ? 1.3 + Math.sin(elapsedTime * 3) * 0.2 : 1;

            if (outlineRef.current) {
                outlineRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
            }
        }
    });


    return (
        <mesh position={newPosition} ref={sphereRef} scale={!hovered ? [0.2, 0.2, 0.2] : [0.3, 0.3, 0.3]}>
            <sphereGeometry args={[0.09, 32, 32]} />
            <meshStandardMaterial color={!hovered ? '#e14fb0' : 'rgb(203,255,30)'} />

            {/* Контур вокруг сферы */}
            <mesh ref={outlineRef}>
                <sphereGeometry args={[0.095, 32, 32]} />
                <meshBasicMaterial
                    color={!hovered ? 'gray' : 'rgb(154,248,66)'}
                    transparent
                    opacity={!hovered ? 0.6 : 1}
                    wireframe
                />
            </mesh>

            {/* Невидимая большая сфера для пересечения */}
            <mesh>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Видимая часть объекта */}
            {hovered && (
                <Html center>
                    <div
                        style={{
                            minWidth: '300px',
                            width: 'auto',
                            backgroundColor: 'rgba(27,27,27,0.73)',
                            color: 'white',
                            padding: '10px',
                            borderRadius: '10px',
                            border: '2px solid #ffffff',
                            userSelect: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <p className={'font-bold text-xl'}>{headerText}</p>
                        <p className={'font-medium text-sm'}>{text}</p>
                        {list && (
                            <div className={'flex-col gap-0.5'}>
                                <p>{list.title}</p>
                                {list.items.map((item, idx) => (
                                    <div key={idx} className={'font-medium text-sm'}>
                                        {idx + 1}. {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Html>
            )}
        </mesh>
    );
};

export default InteractiveObject;
