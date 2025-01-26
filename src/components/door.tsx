import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DoorProps {
    doorScene: THREE.Object3D;
    doorOpenAngle?: number;
    pivotOffset?: [number, number, number];
}

export interface DoorHandle {
    toggleDoor: () => void;
}

const Door = forwardRef<DoorHandle, DoorProps>(
    ({ doorScene, doorOpenAngle = Math.PI / 2, pivotOffset = [0, 0, 0] }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const pivotRef = useRef<THREE.Group>(null);
        const doorRef = useRef<THREE.Object3D>(doorScene);

        const toggleDoor = () => {
            setIsOpen((prev) => !prev);
        };

        useImperativeHandle(ref, () => ({
            toggleDoor,
        }));

        useFrame(() => {
            if (pivotRef.current) {
                const targetRotationY = isOpen ? doorOpenAngle : 0;
                pivotRef.current.rotation.y = THREE.MathUtils.lerp(
                    pivotRef.current.rotation.y,
                    targetRotationY,
                    0.1 // Скорость вращения
                );
            }
        });

        return (
            <group ref={pivotRef} position={pivotOffset}>
                <primitive object={doorRef.current} position={[-pivotOffset[0], -pivotOffset[1], -pivotOffset[2]]} /> {/* Смещаем дверь обратно относительно pivot */}
            </group>
        );
    }
);

Door.displayName = "Door";

export default Door;
