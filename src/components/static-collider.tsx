import React from "react";
import * as THREE from "three";
import { useBox } from "@react-three/cannon";
import InteractiveObject from "./interactive-object";
import { EachModal, ModalData } from "../pages/tech-room/const/modals/in_room";

interface StaticColliderProps {
    object: THREE.Object3D;
    currentRoomData?: ModalData;
}

const ColliderBox: React.FC<{
    mesh: THREE.Mesh;
    modalData: EachModal | null;
}> = ({ mesh, modalData }) => {
    if (!mesh.geometry.boundingBox) {
        mesh.geometry.computeBoundingBox();
    }

    const boxSize = new THREE.Vector3();
    mesh.geometry.boundingBox!.getSize(boxSize);

    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    mesh.updateMatrixWorld();
    mesh.matrixWorld.decompose(position, quaternion, scale);

    boxSize.multiply(scale);
    const preparedPosition = position.toArray();
    const preparedSize = boxSize.toArray();
    const quaternionValues: [number, number, number, number] = [quaternion.x, quaternion.y, quaternion.z, quaternion.w];

    const [ref] = useBox(() => ({
        type: "Static",
        position: preparedPosition,
        args: preparedSize,
        quaternion: quaternionValues,
    }));
    return (
        <group>
            <primitive object={mesh} ref={ref} scale={scale.toArray()} position={preparedPosition} />
            {modalData && <InteractiveObject position={preparedPosition} data={modalData} />}
        </group>
    );
};

const StaticCollider: React.FC<StaticColliderProps> = ({ object, currentRoomData }) => {
    console.log(currentRoomData?.modals[1].name)

    if (object instanceof THREE.Mesh) {
        const modalData = currentRoomData?.modals.find((modal) => modal.name === object.name) || null;
        console.log(object.name)

        return <ColliderBox mesh={object} modalData={modalData} />;
    }

    return (
        <>
            {object.children.map((child) => (
                <StaticCollider key={child.uuid} object={child} currentRoomData={currentRoomData} />
            ))}
        </>
    );
};

export default StaticCollider;
