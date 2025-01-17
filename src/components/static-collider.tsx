import React from "react";
import * as THREE from "three";
import { useBox } from "@react-three/cannon";
import InteractiveObject from "./interactive-object";
import { EachModal, ModalData } from "../pages/tech-room/const/modals/in_room";
import {useTranslation} from "react-i18next";

interface StaticColliderProps {
    object: THREE.Object3D;
    currentRoomData?: ModalData;
}

export const ColliderBox: React.FC<{
    mesh: THREE.Mesh;
    modalData: EachModal | null;
    linkAR:string
}> = ({ mesh, modalData,linkAR }) => {
    const { t } = useTranslation();
    const translatedModalData = modalData
        ? {
            ...modalData,
            headerText: modalData.headerText ? t(modalData.headerText) : undefined,
            list: modalData.list
                ? {
                    ...modalData.list,
                    title: t(modalData.list.title),
                    items: modalData.list.items.map((item) => t(item)),
                }
                : undefined,
        }
        : null;

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
            {translatedModalData && <InteractiveObject position={preparedPosition} data={translatedModalData} linkAR={linkAR} />}
        </group>
    );
};

const StaticCollider: React.FC<StaticColliderProps> = ({ object, currentRoomData }) => {

    if (object instanceof THREE.Mesh) {
        const modalData = currentRoomData?.modals.find((modal) => modal.name === object.name) || null;

        return <ColliderBox mesh={object} modalData={modalData} linkAR={currentRoomData?.linkAR} />;
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
