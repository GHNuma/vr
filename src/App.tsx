import React, {useRef, useEffect, useState, useMemo} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, useGLTF} from '@react-three/drei';
import {Physics, useBox} from '@react-three/cannon';
import * as THREE from 'three';

type Keys = {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
};

function CameraController() {
    const controlsRef = useRef<PointerLockControls>(null!);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPointerLocked, setIsPointerLocked] = useState(false);
    const keys = useRef<Keys>({
        forward: false,
        backward: false,
        left: false,
        right: false,
    }).current;

    const { camera } = useThree();
    const [ref, api] = useBox(() => ({
        mass: 1,
        position: [0, 1.5, 0],
        args:[0.3,1,0.3],

    }));
    ref.current?.rotateY(Math.PI);
    useFrame(() => {
        ref?.current?.getWorldPosition(camera.position);
    });

    useFrame(() => {
        const speed =2; // Скорость передвижения
        const direction = new THREE.Vector3();
        const right = new THREE.Vector3();

        // Направление движения камеры
        camera.getWorldDirection(direction);
        direction.y = 0; // Убираем изменение высоты при движении
        direction.normalize();

        // Определяем "право" относительно направления камеры
        right.crossVectors(camera.up, direction);

        let velocityX = 0;
        let velocityZ = 0;

        // Обрабатываем нажатие клавиш
        if (keys.forward) {
            velocityX += direction.x * speed;
            velocityZ += direction.z * speed;
        }
        if (keys.backward) {
            velocityX -= direction.x * speed;
            velocityZ -= direction.z * speed;
        }
        if (keys.left) {
            velocityX += right.x * speed;
            velocityZ += right.z * speed;
        }
        if (keys.right) {
            velocityX -= right.x * speed;
            velocityZ -= right.z * speed;
        }

        // Устанавливаем новую скорость, сохраняем высоту y
        api.velocity.set(velocityX, 0, velocityZ);
    });


    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'w':
            case 'W':
            case 'Ц':
            case 'ц':
            case 'ArrowUp':
                keys.forward = true;
                break;
            case 's':
            case 'S':
            case 'Ы':
            case 'ы':
            case 'ArrowDown':
                keys.backward = true;
                break;
            case 'a':
            case 'A':
            case 'Ф':
            case 'ф':
            case 'ArrowLeft':
                keys.left = true;
                break;
            case 'd':
            case 'D':
            case 'В':
            case 'в':
            case 'ArrowRight':
                keys.right = true;
                break;
            default:
                break;
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'w':
            case 'Ц':
            case 'W':
            case 'ц':
            case 'ArrowUp':
                keys.forward = false;
                break;
            case 's':
            case 'Ы':
            case 'S':
            case 'ы':
            case 'ArrowDown':
                keys.backward = false;
                break;
            case 'a':
            case 'Ф':
            case 'A':
            case 'ф':
            case 'ArrowLeft':
                keys.left = false;
                break;
            case 'd':
            case 'В':
            case 'D':
            case 'в':
            case 'ArrowRight':
                keys.right = false;
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const handleMouseDown = () => {
            controlsRef.current?.lock();
        };
        const handleMouseUp = () => {
            controlsRef.current?.unlock();
        };

        const handlePointerLockChange = () => {
            setIsPointerLocked(document.pointerLockElement === document.body);
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('pointerlockchange', handlePointerLockChange);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('pointerlockchange', handlePointerLockChange);
        };
    }, []);




    return <PointerLockControls ref={controlsRef} />;
}

// function VisibleCollider({ position, size, rotation }) {
//     return (
//         <mesh position={position} rotation={rotation}>
//             <boxGeometry args={size} />
//             <meshBasicMaterial color="red" wireframe />
//         </mesh>
//     );
// }
//
// function VisiblePlaneCollider({ position, rotation, size }) {
//     return (
//         <mesh position={position} rotation={rotation}>
//             {/* Используем planeGeometry для плоскостей */}
//             <planeGeometry args={size} />
//             <meshBasicMaterial color="red" wireframe />
//         </mesh>
//     );
// }

function StaticCollider({ object }: { object: THREE.Object3D }) {
    const getGlobalTransform = (obj: THREE.Object3D) => {
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        const scale = new THREE.Vector3(1, 1, 1);

        let current = obj;

        while (current) {
            const currentPosition = new THREE.Vector3().copy(current.position);
            const currentQuaternion = new THREE.Quaternion().copy(current.quaternion);
            const currentScale = new THREE.Vector3().copy(current.scale);

            // Применяем текущие трансформации (позицию, вращение, масштаб) к накопленным
            position.applyQuaternion(currentQuaternion).add(currentPosition);
            quaternion.multiplyQuaternions(currentQuaternion, quaternion);
            scale.multiply(currentScale);

            current = current.parent!;
        }

        return { position, quaternion, scale };
    };

    const addColliders = (obj: THREE.Object3D) => {
        if (obj instanceof THREE.Mesh) {
            const mesh = obj;

            if (mesh.geometry && mesh.geometry.boundingBox ) {
                mesh.geometry.computeBoundingBox();
                const boxSize = new THREE.Vector3
                mesh.geometry.boundingBox.getSize(boxSize);


                const { position, quaternion, scale } = getGlobalTransform(mesh);
                boxSize.multiply(scale); // Применяем глобальный масштаб
                const preparedPosition = position.toArray();
                const preparedSize = boxSize.toArray();
                const preparedRotation = new THREE.Euler().setFromQuaternion(quaternion).toArray()
                const quaternionValues: [number, number, number, number] = [quaternion.x, quaternion.y, quaternion.z, quaternion.w];


                // const testFloor=position.clone()
                // testFloor.setY(testFloor.y+5)

                        // const [ref] = usePlane(() => ({
                        //     type: 'Static',
                        //     position: preparedPosition,
                        //     rotation:preparedRotation
                        // }));
                        // return (
                        //     <>
                        //             <primitive object={mesh} ref={ref} rotation={preparedRotation} position={preparedPosition} />
                        //         <VisiblePlaneCollider position={preparedPosition} size={[10, 10]} rotation={[-Math.PI / 2, 0, 0]}  />
                        //
                        //     </>
                        // )
                // eslint-disable-next-line react-hooks/rules-of-hooks
                        const [ref] = useBox(() => ({
                            type: 'Static',
                            position: preparedPosition,
                            args: preparedSize,
                            quaternion: quaternionValues, // Преобразуем к Эйлеровым углам
                        }));


                        return (
                            <>
                                    <primitive object={mesh} ref={ref} scale={scale.toArray()} position={preparedPosition} rotation={preparedRotation} size={preparedSize} />
                            {/*<VisibleCollider position={preparedPosition} size={preparedSize} rotation={preparedRotation}  />*/}
                            </>
                        );


            }
        }

        // Рекурсивная обработка детей объекта
        return obj.children.map((child, i) => (
            <group key={i}>
                <React.Fragment >{addColliders(child)}</React.Fragment>
            </group>
        ));
    };
    // if(object.name!=='Cube006'){
        return <group>{addColliders(object)}</group>;

    // }
}




function TechRoomModel() {
    const {scene}= useGLTF('/models/BI4.glb',true);
    console.log('RENDER')
    console.log(scene)
    const memoizedScene = useMemo(() => scene, []);
    return (
        <group>
            {memoizedScene?.children.map((child) => (
                <group key={child.name}>
                        return <StaticCollider object={child} />;
                </group>
            ))}
        </group>
    );
}

// function FloorCollider() {
//     const [ref] = usePlane(() => ({
//         rotation: [-Math.PI / 2, 0, 0],
//         position: [0, 0, 0], // Позиция пола должна совпадать с твоей сценой
//     }));
//
//     return (
//         <mesh ref={ref} receiveShadow position={[0, -1, 0]}>
//             <planeGeometry args={[10, 10]}/>
//             <meshStandardMaterial color={'lightgrey'} />
//         </mesh>
//     );
// }

function Scene() {
    return (
        <Canvas shadows camera={{fov: 75}} >
            <ambientLight intensity={3.5}/>
            <pointLight position={[0, 3, 2]}/>
            <pointLight position={[0, 3, 0.7]}/>
            <pointLight position={[1.7, 3, 2]}/>
            <pointLight position={[1.7, 3, 0.7]}/>
            <Physics gravity={[0,0,0]}>
                <TechRoomModel/>
                {/*<FloorCollider/>*/}
                <CameraController/>
            </Physics>
        </Canvas>
    );
}

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Scene />
        </div>
    );
}

export default App;
