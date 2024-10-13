import {useRef, useEffect, useState, useMemo, Suspense, FC} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {Html, PointerLockControls, useGLTF, useProgress} from '@react-three/drei';
import {Physics, useBox} from '@react-three/cannon';
import * as THREE from 'three';
import nipplejs from 'nipplejs';
import { useNavigate, useParams} from "react-router-dom";
import Loader from 'react-loaders'
// import business from '/models/BUSINESS.glb?url'
enum RoomClass {
    premium='PREMIUM',
business='BUSINESS',
comfort='COMFORT',
standard='STANDARD'
}
type Keys = {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
};


function CameraController({isMobile}) {
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
        const speed =isMobile ? 1 : 2 ; // Скорость передвижения
        const direction = new THREE.Vector3();
        const right = new THREE.Vector3();

        camera.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();

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

        api.velocity.set(velocityX, 0, velocityZ);
    });

    let initialTouchX: number | null = null;
    let initialTouchY: number | null = null;

    let yaw = 0;
    let pitch = 0;

    // let arrowDeltaY=0
    // let arrowDeltaX=0
    let isJoystickActive = false;
    let isTouchActive = false;
    useEffect(() => {
        if (!isMobile) {
            const handleKeyDown = (event: KeyboardEvent) => {
                switch (event.key) {
                    case 'w':
                    case 'ц':
                        keys.forward = true;
                        break;
                    case 's':
                    case 'ы':
                        keys.backward = true;
                        break;
                    case 'a':
                    case 'ф':
                        keys.left = true;
                        break;
                    case 'd':
                    case 'в':
                        keys.right = true;
                        break;
                    // case 'ArrowUp':
                    //     arrowDeltaY = 1;
                    //     break;
                    // case 'ArrowDown':
                    //     arrowDeltaY = -1;
                    //     break;
                    // case 'ArrowLeft':
                    //     arrowDeltaX = -1;
                    //     break;
                    // case 'ArrowRight':
                    //     arrowDeltaX = 1;
                    //     break;
                }
            };

            const handleKeyUp = (event: KeyboardEvent) => {
                switch (event.key) {
                    case 'w':
                    case 'ц':
                        keys.forward = false;
                        break;
                    case 's':
                    case 'ы':
                        keys.backward = false;
                        break;
                    case 'a':
                    case 'ф':
                        keys.left = false;
                        break;
                    case 'd':
                    case 'в':
                        keys.right = false;
                        break;
                    case 'ArrowUp':
                    // case 'ArrowDown':
                    //     arrowDeltaY = 0;
                    //     break;
                    // case 'ArrowLeft':
                    // case 'ArrowRight':
                    //     arrowDeltaX = 0;
                    //     break;
                }
            };

            // function updateCamera() {
            //     if (arrowDeltaX !== 0 || arrowDeltaY !== 0) {
            //         // Обновляем yaw и pitch
            //         yaw -= arrowDeltaX * 0.03;
            //         pitch += arrowDeltaY * 0.03;
            //         pitch = THREE.MathUtils.clamp(pitch, -Math.PI / 4, Math.PI / 4); // Ограничиваем наклон головы
            //
            //         // Создаем новый Euler для обновления ориентации камеры
            //         const euler = new THREE.Euler(pitch, yaw, 0, 'YXZ');
            //         camera.quaternion.setFromEuler(euler); // Устанавливаем кватернион камеры
            //
            //         // Получаем вектор направления, куда смотрит камера
            //         const direction = new THREE.Vector3(0, 0, -1); // Начальное направление вперед
            //         direction.applyQuaternion(camera.quaternion); // Применяем кватернион к вектору направления
            //
            //         // Обновляем позицию камеры
            //         camera.position.add(direction.multiplyScalar(0.1));// Перемещение вперед по направлению взгляда
            //
            //
            //         yaw=0
            //         pitch=0
            //     }
            //
            //         requestAnimationFrame(updateCamera);
            // }
            //
            // updateCamera();

            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('keyup', handleKeyUp);
            };
        } else {
            const joystickLeft = nipplejs.create({
                zone: document.getElementById('joystick-left')!,
                mode: 'static',
                position: { left: '50px', bottom: '50px' },
                color: 'blue',
            });

            const joystickRight = nipplejs.create({
                zone: document.getElementById('joystick-right')!,
                mode: 'static',
                position: { right: '50px', bottom: '50px' },
                color: 'red',
            });

            joystickLeft.on('move', (evt, data) => {
                if (!isTouchActive){
                    isJoystickActive = true;
                    const forward = data.vector.y > 0;
                    const backward = data.vector.y < 0;
                    const left = data.vector.x < 0;
                    const right = data.vector.x > 0;

                    keys.forward = forward;
                    keys.backward = backward;
                    keys.left = left;
                    keys.right = right;
                }
            });

            joystickLeft.on('end', () => {
                keys.forward = false;
                keys.backward = false;
                keys.left = false;
                keys.right = false;
            });

            const maxBodyRotationSpeed = 0.03;
            const maxHeadTiltSpeed = 0.03;

            let firstMove = true;

            let joystickDeltaX = 0;
            let joystickDeltaY = 0;


            joystickRight.on('move', (evt, data) => {
                joystickDeltaX = data.vector.x; // Влево (-1) или вправо (1)
                joystickDeltaY = data.vector.y; // Вверх (1) или вниз (-1)

                if (firstMove) {
                    firstMove = false; // Устанавливаем флаг в false после первого движения
                    return; // Не применяем движение
                }
            });

            joystickRight.on('end', () => {
                isJoystickActive = false;
                joystickDeltaX = 0; // Остановка по оси X
                joystickDeltaY = 0; // Остановка по оси Y
            });

            function updateCamera() {
                if (!isTouchActive && joystickDeltaX !== 0 || joystickDeltaY !== 0) {
                    isJoystickActive = true;
                    yaw -= joystickDeltaX * maxBodyRotationSpeed;

                    pitch += joystickDeltaY * maxHeadTiltSpeed;
                    pitch = THREE.MathUtils.clamp(pitch, -Math.PI / 4, Math.PI / 4); // Ограничиваем наклон головы

                    const euler = new THREE.Euler(pitch, yaw, 0, 'YXZ');

                    camera.quaternion.setFromEuler(euler);

                    const direction = new THREE.Vector3(0, 0, -1); // Направление вперед
                    direction.applyQuaternion(camera.quaternion); // Применяем ориентацию камеры

                    camera.position.add(direction.multiplyScalar(0.1)); // Перемещение вперед по направлению взгляда
                    isJoystickActive = false;
                }

                requestAnimationFrame(updateCamera);
            }

            updateCamera();

            return () => {
                joystickLeft.destroy();
                joystickRight.destroy();
            };
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {


            const handleTouchStart = (event: TouchEvent) => {
                if (!isJoystickActive && event.touches.length === 1) {
                    // Включаем режим касания, если джойстик не активен
                    isTouchActive = true;
                    initialTouchX = event.touches[0].clientX;
                    initialTouchY = event.touches[0].clientY;
                }
            };

            const handleTouchMove = (event: TouchEvent) => {
                if (!isJoystickActive && isTouchActive && initialTouchX !== null && initialTouchY !== null && event.touches.length === 1) {
                    const deltaX = event.touches[0].clientX - initialTouchX;
                    const deltaY = event.touches[0].clientY - initialTouchY;

                    const sensitivity = 0.002; // чувствительность камеры

                    yaw -= deltaX * sensitivity; // вращение по оси Y (влево/вправо)
                    pitch -= deltaY * sensitivity; // наклон по оси X (вверх/вниз)

                    // Ограничиваем наклон камеры по оси X (вверх-вниз)
                    pitch = THREE.MathUtils.clamp(pitch, -Math.PI / 4, Math.PI / 4);

                    // Устанавливаем кватернион камеры на основе значений yaw и pitch
                    const euler = new THREE.Euler(pitch, yaw, 0, 'YXZ');
                    camera.quaternion.setFromEuler(euler);

                    // Вычисляем направление движения вперед с учетом новой ориентации камеры
                    const direction = new THREE.Vector3(0, 0, -1);
                    direction.applyQuaternion(camera.quaternion); // Применяем ориентацию камеры к направлению

                    // Перемещение камеры вперед по направлению взгляда
                    camera.position.add(direction.multiplyScalar(0.1));

                    // Обновляем исходные координаты касания
                    initialTouchX = event.touches[0].clientX;
                    initialTouchY = event.touches[0].clientY;
                }
            };

            const handleTouchEnd = () => {
                isTouchActive = false;
                initialTouchX = null;
                initialTouchY = null;
            };

            // Добавляем обработчики событий для touch
            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);

            return () => {
                // Удаляем обработчики событий при размонтировании
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isMobile, camera]);



    useEffect(() => {
        const handleMouseDown = () => {
            controlsRef.current?.lock();
        };
        // const handleMouseUp = () => {
        //     controlsRef.current?.unlock();
        // };

        const handlePointerLockChange = () => {
            setIsPointerLocked(document.pointerLockElement === document.body);
        };

        window.addEventListener('mousedown', handleMouseDown);
        // window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('pointerlockchange', handlePointerLockChange);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            // window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('pointerlockchange', handlePointerLockChange);
        };
    }, []);




    return !isMobile ? <PointerLockControls ref={controlsRef}/> : null;
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
                {addColliders(child)}
            </group>
        ));
    };
    // if(object.name!=='Cube006'){
    return addColliders(object)

    // }
}

function LoadingAnimation() {
    const { loaded,progress } = useProgress()
    return <Html center style={{textWrap:'nowrap',gap:"48px"}} className={'flex flex-col flex-center'}>
        <Loader type="ball-clip-rotate-multiple"/>
        <div style={{position:'relative'}}>{progress.toFixed()} %</div></Html>
}


function TechRoomModel({ modelPath }) {
    const { scene } = useGLTF(modelPath, true);
    const clone = useMemo(() => scene.clone(), [scene]);
    useGLTF.preload(modelPath);

    useEffect(() => {
        console.log('Model loaded:', modelPath);
    }, [modelPath]);

    return (
        <group>
            {clone?.children.map((child) => (
                <group key={child.name}>
                    <StaticCollider object={child} />
                </group>
            ))}
        </group>
    );
}

function Scene() {
    const {room_name}=useParams()
    const navigate= useNavigate()
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [currentModel, setCurrentModel] = useState(`/models/${RoomClass[room_name]}.glb?url`);
    console.log(currentModel)

    // const switchRoom = (newModelPath) => {
    //     setCurrentModel(newModelPath);
    // };
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;
    return (
        <div style={{height: '100%', width: '100%'}}>
            <Canvas shadows camera={{fov: 75}}>
                <ambientLight intensity={3.5}/>
                <pointLight position={[0, 3, 2]}/>
                <pointLight position={[0, 3, 0.7]}/>
                <pointLight position={[1.7, 3, 2]}/>
                <pointLight position={[1.7, 3, 0.7]}/>
                <Physics gravity={[0, 0, 0]}>
                    <Suspense fallback={<LoadingAnimation/>}>
                        <TechRoomModel modelPath={currentModel}/>
                    </Suspense>
                    {/*<FloorCollider/>*/}
                    <CameraController isMobile={isMobile}/>
                </Physics>

            </Canvas>
            <div
                className={'fixed p-1 top-5 left-5 bg-white bg-opacity-70 flex justify-center items-center rounded-md border border-b-gray-100 cursor-pointer'}
                onClick={(e)=>{
                    e.preventDefault()
                    e.stopPropagation()
                    navigate('/')
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                </svg>
            </div>
            {isMobile &&
                <>
                    <div
                        id="joystick-left"
                        style={{position: 'absolute', left: '50px', bottom: '50px', width: '150px', height: '150px'}}
                    />
                    <div
                        id="joystick-right"
                        style={{position: 'absolute', right: '50px', bottom: '50px', width: '150px', height: '150px'}}
                    />
                </>
            }
        </div>
    );
}

const TechRoom: FC<any> = (any) => {

    return (
        <div style={{width: '100vw', height: '100vh', position: 'relative'}}>
        <Scene/>

    </div>
);
}

export default TechRoom
