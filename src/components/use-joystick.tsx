import React, { useEffect, useRef } from 'react';
import nipplejs from 'nipplejs';

const useJoystick = ({
                         setIsJoystickActive,
                         setKeys,
                         joystickDeltaX,
                         joystickDeltaY,
                     }: {
    setIsJoystickActive: React.Dispatch<React.SetStateAction<boolean>>;
    setKeys: React.Dispatch<React.SetStateAction<{
        forward: boolean;
        backward: boolean;
        left: boolean;
        right: boolean;
    }>>;
    joystickDeltaX: React.MutableRefObject<number>;
    joystickDeltaY: React.MutableRefObject<number>;
}) => {
    const joystickLeftRef = useRef<nipplejs.JoystickManager | null>(null);
    const joystickRightRef = useRef<nipplejs.JoystickManager | null>(null);

    useEffect(() => {
        // Инициализация левого джойстика
        joystickLeftRef.current = nipplejs.create({
            zone: document.getElementById('joystick-left')!,
            mode: 'static',
            position: { left: '50px', bottom: '50px' },
            color: 'blue',
        });

        // Инициализация правого джойстика
        joystickRightRef.current = nipplejs.create({
            zone: document.getElementById('joystick-right')!,
            mode: 'static',
            position: { right: '50px', bottom: '50px' },
            color: 'red',
        });

        // Обработчики для левого джойстика
        joystickLeftRef.current.on('move', (_evt, data) => {
            setIsJoystickActive(true);
            setKeys({
                forward: data.vector.y > 0,
                backward: data.vector.y < 0,
                left: data.vector.x < 0,
                right: data.vector.x > 0,
            });
        });

        joystickLeftRef.current.on('end', () => {
            setIsJoystickActive(false);
            setKeys({
                forward: false,
                backward: false,
                left: false,
                right: false,
            });
        });

        // Обработчики для правого джойстика
        joystickRightRef.current.on('move', (_evt, data) => {
            joystickDeltaX.current = data.vector.x;
            joystickDeltaY.current = data.vector.y;
        });

        joystickRightRef.current.on('end', () => {
            joystickDeltaX.current = 0;
            joystickDeltaY.current = 0;
            setIsJoystickActive(false);
        });

        return () => {
            // Уничтожение джойстиков при размонтировании
            joystickLeftRef.current?.destroy();
            joystickRightRef.current?.destroy();
        };
    }, [setIsJoystickActive, setKeys, joystickDeltaX, joystickDeltaY]);
};

export default useJoystick;
