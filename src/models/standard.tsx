import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import StaticCollider from "../components/static-collider.tsx";
import ModalsInRooms from "../pages/tech-room/const/modals/in_room.tsx";

interface StandardModelProps {
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

export function StandardModel(props: StandardModelProps) {
    const { nodes: mainNodes } = useGLTF("/models/STANDARD.glb") as unknown as GLTFResult;

    const tableAnimation = useGLTF("/animations/STANDARD_TABLE.glb");
    const { animations: tableAnimations, scene: tableScene } = tableAnimation;
    const { actions: tableActions } = useAnimations(tableAnimations, tableScene);

    const windowAnimation = useGLTF("/animations/STANDARD_WINDOW.glb");
    const { animations: windowAnimations, scene: windowScene } = windowAnimation;
    const { actions: windowActions } = useAnimations(windowAnimations, windowScene);

    const acousticAnimation = useGLTF("/animations/STANDARD_ACOUSTIC.glb");
    const { animations: acousticAnimations, scene: acousticScene } = acousticAnimation;
    const { actions: acousticActions } = useAnimations(acousticAnimations, acousticScene);

    const currentRoomData = ModalsInRooms.find((roomData) => roomData.name === "STANDARD");

    const tablePlay= ()=>{
        if (tableActions?.Animation) {
            tableActions.Animation.play();
        }
    }

    const tableStop= ()=>{
        if (tableActions?.Animation) {
            tableActions.Animation.stop();
        }
    }

    const windowPlay= ()=>{
        if (windowActions?.Animation) {
            windowActions.Animation.play();
        }
    }

    const windowStop= ()=>{
        if (windowActions?.Animation) {
            windowActions.Animation.stop();
        }
    }

    const acousticPlay= ()=>{
        if (acousticActions?.Animation) {
            acousticActions.Animation.play();
        }
    }

    const acousticStop= ()=>{
        if (acousticActions?.Animation) {
            acousticActions.Animation.stop();
        }
    }
    // useEffect(() => {
    //     if (tableActions?.Animation) {
    //         tableActions.Animation.play();
    //     }
    //
    // }, [tableActions]);

    // useEffect(() => {
    //     if (windowActions?.Animation) {
    //         windowActions.Animation.play();
    //     }
    // }, [windowActions]);

    useEffect(() => {
        if (acousticActions?.Animation) {
            acousticActions.Animation.play();
        }
    }, [acousticActions]);

    return (
        <group {...props} dispose={null}>
                {Object.entries(mainNodes).map(([key, node]) => {
                    if (node instanceof THREE.Mesh) {
                        return (
                            <group key={node.name}>
                                <StaticCollider object={node} currentRoomData={currentRoomData} key={key}/>
                            </group>
                        );
                    }
                    return null;
                })}

            <primitive object={tableScene}/>
            <primitive object={windowScene}/>
            <primitive object={acousticScene}/>
        </group>
    );
}

// useGLTF.preload("/models/STANDARD.glb");
// useGLTF.preload("/animations/STANDARD_TABLE.glb");
// useGLTF.preload("/animations/STANDARD_WINDOW.glb");
// useGLTF.preload("/animations/STANDARD_ACOUSTIC.glb");
