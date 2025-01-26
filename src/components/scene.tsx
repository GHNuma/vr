import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CameraController from "./camera-controller";
import LoadingAnimation from "./loading-animation";
import { StandardModel } from "../models/standard.tsx";
import { PremiumModel } from "../models/premium.tsx";
import { BusinessModel } from "../models/business.tsx";
import { ComfortModel } from "../models/comfort.tsx";
import { useProgress } from "@react-three/drei";
import { useTranslation } from "react-i18next";

const Scene: React.FC = () => {
    const { room_name } = useParams<{ room_name: string }>();
    const navigate = useNavigate();
    const [width, setWidth] = useState<number>(window.innerWidth);
    const { active } = useProgress();
    const { i18n } = useTranslation();

    const [activeKey, setActiveKey] = useState<string | null>(null);
    // const [activeMouse, setActiveMouse] = useState<string | null>(null);

    useEffect(() => {
        function handleWindowSizeChange() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
                setActiveKey(e.key.toLowerCase());
            }
        }
        function handleKeyUp(e: KeyboardEvent) {
            if (["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
                setActiveKey(null);
            }
        }
        // function handleMouseDown(e: MouseEvent) {
        //     if (e.button === 0) setActiveMouse("left");
        //     if (e.button === 2) setActiveMouse("right");
        // }
        // function handleMouseUp() {
        //     setActiveMouse(null);
        // }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        // window.addEventListener("mousedown", handleMouseDown);
        // window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            // window.removeEventListener("mousedown", handleMouseDown);
            // window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    const isMobile = width <= 768;

    const ModelComponent = (() => {
        switch (room_name) {
            case "standard":
                return StandardModel;
            case "premium":
                return PremiumModel;
            case "business":
                return BusinessModel;
            case "comfort":
                return ComfortModel;
            default:
                return null;
        }
    })();

    const changeLanguage = (e: React.MouseEvent | React.TouchEvent, lng: string) => {
        e.preventDefault();
        e.stopPropagation();
        i18n.changeLanguage(lng);
    };
    return (
        <div style={{height: "100%", width: "100%"}} className={"select-none"}>
            <Canvas shadows camera={{fov: 75}} frameloop='demand'>
                {/*<Perf position="top-left"/>*/}
                <ambientLight intensity={3.5}/>
                <pointLight position={[0, 3, 2]}/>
                <pointLight position={[0, 3, 0.7]}/>
                <Physics gravity={[0, 0, 0]}>
                    <Suspense fallback={<LoadingAnimation/>}>
                        {ModelComponent && <ModelComponent/>}
                    </Suspense>
                    <CameraController isMobile={isMobile}/>
                </Physics>
            </Canvas>
            <div
                className="flex gap-1 items-center absolute top-4 right-4 bg-gray-200 bg-opacity-30 z-50 rounded-lg">
                <p className={`${i18n.language==='kz' && 'bg-gray-400'} font-medium text-sm border-r-gray-50 cursor-pointer hover:scale-110 hover:bg-gray-600 rounded-lg p-2`}
                   onClick={(e) => changeLanguage(e,'kz')}
                   onTouchStart={(e)=>changeLanguage(e,'kz')}
                >
                    KZ
                </p>
                <div className='h-4 w-[1px] bg-gray-50'/>
                <p className={`${i18n.language==='ru' && 'bg-gray-400'} font-medium text-sm border-l-gray-50 cursor-pointer hover:scale-110 hover:bg-gray-600 rounded-lg p-2`}
                   onClick={(e) => changeLanguage(e,'ru')}
                   onTouchStart={(e)=>changeLanguage(e,'ru')}
                >
                    RU
                </p>
            </div>
            {/* Кнопка для выхода */}
            {!active && (
                <div
                    className={`z-50 fixed ${
                        isMobile ? "p-3" : "p-1"
                    } top-5 left-5 bg-white bg-opacity-70 flex justify-center items-center rounded-md border border-b-gray-100 cursor-pointer select-none`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        document.exitPointerLock();
                        navigate("/");
                    }}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        document.exitPointerLock();
                        navigate("/");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>
                </div>
            )}
            {/* Джойстики для мобильных устройств */}
            {isMobile && (
                <>
                    <div
                        id="joystick-left"
                        style={{
                            position: "fixed",
                            left: "50px",
                            bottom: "50px",
                            width: "auto",
                            height: "auto",
                            userSelect: "none",
                        }}
                    />
                    <div
                        id="joystick-right"
                        style={{
                            position: "fixed",
                            right: "50px",
                            bottom: "50px",
                            width: "auto",
                            height: "auto",
                            userSelect: "none",
                        }}
                    />
                </>
            )}
            {!isMobile && (
                <div className="fixed bottom-10 left-10 flex flex-col gap-2 justify-center ">
                    <div className="flex gap-2 justify-center">
                        <div className='p-0.5 bg-white bg-opacity-20 rounded-lg'>
                            <div
                                className={`w-12 h-12 border-2 border-white text-center text-white font-bold flex items-center justify-center rounded-lg bg-opacity-20 bg-gray-500 ${activeKey === 'w' ? 'bg-red-500 bg-opacity-50' : ''}`}>
                                W
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className='p-0.5 bg-white bg-opacity-20 rounded-lg'>
                            <div
                                className={`w-12 h-12 border-2 border-white text-center text-white font-bold flex items-center justify-center rounded-lg bg-opacity-20 bg-gray-500 ${activeKey === 'a' ? 'bg-red-500 bg-opacity-50' : ''}`}>
                                A
                            </div>
                        </div>
                        <div className='p-0.5 bg-white bg-opacity-20 rounded-lg'>
                            <div className={`w-12 h-12 border-2 border-white text-center text-white font-bold flex items-center justify-center rounded-lg bg-opacity-20 bg-gray-500 ${activeKey === 's' ? 'bg-red-500 bg-opacity-50' : ''}`}>
                                S
                            </div>
                        </div>
                        <div className='p-0.5 bg-white bg-opacity-20 rounded-lg'>
                            <div className={`w-12 h-12 border-2 border-white text-center text-white font-bold flex items-center justify-center rounded-lg bg-opacity-20 bg-gray-500 ${activeKey === 'd' ? 'bg-red-500 bg-opacity-50' : ''}`}>
                                D
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Scene;
