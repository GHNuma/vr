import React, {useRef} from "react";
import {useGLTF} from "@react-three/drei";
import * as THREE from "three";
import ModalsInRooms from "../pages/tech-room/const/modals/in_room.tsx";
import StaticCollider from "../components/static-collider.tsx";
import InteractiveObject from "../components/interactive-object.tsx";
import { useTranslation } from "react-i18next";
import Door, {DoorHandle} from "../components/door.tsx";

interface PremiumModelProps {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
}

interface GLTFResult extends THREE.Object3D {
    nodes: {
        [key: string]: THREE.Mesh;
    };
    materials: {
        [key: string]: THREE.Material;
    };
}

export function PremiumModel(props: PremiumModelProps) {
    const { nodes } = useGLTF("/models/PREMIUM.glb") as unknown as GLTFResult;
    const { t } = useTranslation();

    const doorAnimation = useGLTF("/animations/PREMIUM_DOOR.glb");
    const { scene: doorScene } = doorAnimation;


    const doorRef = useRef<DoorHandle>(null);

    const toggleDoor = () => {
        doorRef.current?.toggleDoor();
    };


    const doorPosition = new THREE.Vector3();
    doorScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.updateMatrixWorld();
            child.getWorldPosition(doorPosition);
        }
    });

    const calculateDoorWidth = (object: THREE.Object3D): number => {
        const box = new THREE.Box3();
        box.setFromObject(object);

        const size = new THREE.Vector3();
        box.getSize(size);

        return size.x;
    };

    const currentRoomData = ModalsInRooms.find((roomData) => roomData.name === "PREMIUM");

    return (
        <group {...props} dispose={null}>
            {Object.entries(nodes).map(([key, node]) => {
                if (node instanceof THREE.Mesh) {
                    return (
                        <group key={node.name}>
                            <StaticCollider object={node} currentRoomData={currentRoomData} key={key} />
                        </group>
                    );
                }
                return null;
            })}

            <group>
                <Door doorScene={doorScene} ref={doorRef}
                      pivotOffset={[(doorPosition.x), doorPosition.y, doorPosition.z+(2* calculateDoorWidth(doorScene))]}
                />
            </group>

            <InteractiveObject
                position={[doorPosition.x + 0.1, doorPosition.y, doorPosition.z]}
                data={{
                    name: "Cube009",
                    headerText: t("modals.premium.electro_door"),
                }}
                linkAR="https://example.com"
                toggleAnimation={toggleDoor}
            />
        </group>
    );
}

// useGLTF.preload("/models/PREMIUM.glb");
// useGLTF.preload("/animations/PREMIUM_DOOR.glb");
