import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import nipplejs from 'nipplejs';
import * as THREE from 'three';

interface CameraControllerProps {
    isMobile: boolean;
}

interface Keys {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
}

const CameraController: React.FC<CameraControllerProps> = ({ isMobile }) => {
    const controlsRef = useRef<LegacyRef<PointerLockControls>>(null);
    const [,setIsJoystickActive]=useState<boolean>()
    const [isTouchActive,]=useState<boolean>()
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
        args: [0.3, 1, 0.3],
    }));

    useFrame(() => {
        ref.current?.getWorldPosition(camera.position);
    });

    useFrame(() => {
        const speed = isMobile ? 1 : 1.5;
        const direction = new THREE.Vector3();
        const right = new THREE.Vector3();

        camera.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();

        right.crossVectors(camera.up, direction);

        let velocityX = 0;
        let velocityZ = 0;

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


    let yaw = 0;
    let pitch = 0;

    // let arrowDeltaY=0
    // let arrowDeltaX=0

    useEffect(() => {
        if (!isMobile) {
            const handleKeyDown = (event: KeyboardEvent) => {
                switch (event.key.toLowerCase()) {
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
                }
            };

            const handleKeyUp = (event: KeyboardEvent) => {
                switch (event.key.toLowerCase()) {
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
                }
            };

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

            joystickLeft.on('move', (_evt, data) => {
                if (!isTouchActive){
                    setIsJoystickActive(true)
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
                setIsJoystickActive(false)

                joystickDeltaX = 0; // Остановка по оси X

                joystickDeltaY = 0; // Остановка по оси Y

            });

            const maxBodyRotationSpeed = 0.03;
            const maxHeadTiltSpeed = 0.03;

            let firstMove = true;

            let joystickDeltaX = 0;
            let joystickDeltaY = 0;


            joystickRight.on('move', (_evt, data) => {
                joystickDeltaX = data.vector.x; // Влево (-1) или вправо (1)
                joystickDeltaY = data.vector.y; // Вверх (1) или вниз (-1)

                if (firstMove) {
                    firstMove = false; // Устанавливаем флаг в false после первого движения
                    return; // Не применяем движение
                }
            });

            joystickRight.on('end', () => {
                setIsJoystickActive(false)
                joystickDeltaX = 0; // Остановка по оси X
                joystickDeltaY = 0; // Остановка по оси Y
            });

            function updateCamera() {
                if (!isTouchActive && joystickDeltaX !== 0 || joystickDeltaY !== 0) {
                   setIsJoystickActive(true)
                    yaw -= joystickDeltaX * maxBodyRotationSpeed;

                    pitch += joystickDeltaY * maxHeadTiltSpeed;
                    pitch = THREE.MathUtils.clamp(pitch, -Math.PI / 4, Math.PI / 4); // Ограничиваем наклон головы

                    const euler = new THREE.Euler(pitch, yaw, 0, 'YXZ');

                    camera.quaternion.setFromEuler(euler);

                    const direction = new THREE.Vector3(0, 0, -1); // Направление вперед
                    direction.applyQuaternion(camera.quaternion); // Применяем ориентацию камеры

                    camera.position.add(direction.multiplyScalar(0.1)); // Перемещение вперед по направлению взгляда
                    setIsJoystickActive(false)
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

    return !isMobile ? <PointerLockControls ref={controlsRef} /> : null;
};

export default CameraController;
