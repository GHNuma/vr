import React, {useEffect, useMemo} from "react";
import {Html, useGLTF, useProgress} from "@react-three/drei";
import StaticCollider from "./static-collider";
import ModalsInRooms from "../pages/tech-room/const/modals/in_room.tsx";
import * as THREE from "three";

interface TechRoomModelProps {
    modelPath: string;
}

const TechRoomModel: React.FC<TechRoomModelProps> = ({ modelPath }) => {
    const { scene } = useGLTF(modelPath, true); // Загружаем модель
    const { active, progress } = useProgress(); // Используем прогресс загрузки

    const clone = useMemo(() => {
        if (scene) {
            const clonedScene = scene.clone();
            clonedScene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material.dispose = null;
                }
            });
            return clonedScene;
        }
        return null;
    }, [scene]);

    const currentType = modelPath.split("/").pop()?.replace(".glb", "") || "";
    const currentRoomData = ModalsInRooms.find((roomData) => roomData.name === currentType);

    if (active) {
        return (
            <Html center>
                <div>Loading... {Math.round(progress)}%</div>
            </Html>
        );
    }

    if (!scene) {
        console.error(`Error loading model at ${modelPath}`);
        return (
            <Html center>
                <div>Error loading model</div>
            </Html>
        );
    }
    return (
        <group dispose={null}>
            {clone?.children.map((child) => (
                <group key={child.name}>
                    <StaticCollider object={child} currentRoomData={currentRoomData}/>
                </group>
            ))}
        </group>

    );
};

export default TechRoomModel;
