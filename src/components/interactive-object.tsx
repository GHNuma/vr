import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { EachModal } from '../pages/tech-room/const/modals/in_room.tsx';

interface InteractiveObjectProps {
    position: [number, number, number];
    data: EachModal;
    linkAR?: string;
    toggleAnimation?: () => void;

}

const InteractiveObject: React.FC<InteractiveObjectProps> = ({ position, data, linkAR, toggleAnimation, animationState }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { headerText, list, text,audio } = data;
    const sphereRef = useRef<THREE.Mesh>(null);
    const outlineRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const newPosition: [number, number, number] = [position[0], position[1] + 0.09, position[2]];

    // Обновляем размер или эффект на контуре при наведении
    useFrame(({ raycaster, clock }: { raycaster: THREE.Raycaster; clock: THREE.Clock }) => {
        if (sphereRef.current) {
            const intersects = raycaster.intersectObject(sphereRef.current);
            setHovered(intersects.length > 0);

            const elapsedTime = clock.getElapsedTime();
            const scaleFactor = hovered ? 1.3 + Math.sin(elapsedTime * 3) * 0.2 : 1;

            if (outlineRef.current) {
                outlineRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
            }
        }
    });

    const audioRef = useRef<HTMLAudioElement>(null);
    const toggleAudio = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleNavigation = () => {
        window.open(linkAR, '_blank', 'noopener,noreferrer');
    };

    return (
        <mesh position={newPosition} ref={sphereRef} scale={!hovered ? [0.2, 0.2, 0.2] : [0.3, 0.3, 0.3]}>
            <sphereGeometry args={[0.09, 32, 32]} />
            <meshStandardMaterial color={!hovered ? '#e14fb0' : 'rgb(203,255,30)'} />

            {/* Контур вокруг сферы */}
            <mesh ref={outlineRef}>
                <sphereGeometry args={[0.095, 32, 32]} />
                <meshBasicMaterial
                    color={!hovered ? 'gray' : 'rgb(154,248,66)'}
                    transparent
                    opacity={!hovered ? 0.6 : 1}
                    wireframe
                />
            </mesh>

            {/* Невидимая большая сфера для пересечения */}
            <mesh>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Видимая часть объекта */}
            {hovered && (
                <Html center>
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="flex gap-1 items-start"
                    >
                        <div
                            style={{
                                minWidth: '300px',
                                width: 'auto',
                                backgroundColor: 'rgba(27,27,27,0.73)',
                                color: 'white',
                                padding: '10px',
                                borderRadius: '10px',
                                border: '2px solid #ffffff',
                                userSelect: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <p className="font-bold text-xl">{headerText}</p>
                            <p className="font-medium text-sm">{text}</p>
                            {list && (
                                <div className="flex-col gap-0.5">
                                    <p>{list.title}</p>
                                    {list.items.map((item, idx) => (
                                        <div key={idx} className="font-medium text-sm">
                                            {idx + 1}. {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 py-2.5 px-1 bg-white bg-opacity-15 rounded-lg border-2 border-solid border-white">
                            {/* Аудио кнопка */}
                            {audio && <button onClick={(e) => toggleAudio(e)} onTouchStart={(e) => toggleAudio(e)}>
                                {isPlaying ? (
                                    <span className="material-symbols-outlined">volume_off</span>
                                ) : (
                                    <span className="material-symbols-outlined">volume_up</span>
                                )}
                            </button>}

                            {/* AR кнопка */}
                            <div onClick={handleNavigation} style={{cursor: 'pointer'}}>
                                <span className="material-symbols-outlined">view_in_ar</span>
                            </div>

                            {/* Кнопка анимации */}
                            {toggleAnimation && (
                                <button onClick={toggleAnimation}>
                                        <span className="material-symbols-outlined">motion_play</span>
                                </button>
                            )}
                        </div>

                        {audio && <audio ref={audioRef} src={`/audios/${audio}`}/>}
                    </div>
                </Html>
            )}
        </mesh>
    );
};

export default InteractiveObject;
