import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/cannon";
import { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CameraController from "./camera-controller";
import LoadingAnimation from "./loading-animation";
import { StandardModel } from "../models/standard.tsx";
import { PremiumModel } from "../models/premium.tsx";
import { BusinessModel } from "../models/business.tsx";
import { ComfortModel } from "../models/comfort.tsx";
import {useProgress} from "@react-three/drei";

const Scene: React.FC = () => {
    const { room_name } = useParams<{ room_name: string }>();
    const navigate = useNavigate();
    const [width, setWidth] = useState<number>(window.innerWidth);
    const { active } = useProgress();

    useEffect(() => {
        function handleWindowSizeChange() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    const isMobile = width <= 768;

    // Выбираем модель на основе room_name
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

    return (
        <div style={{ height: "100%", width: "100%" }} className={"select-none"}>
            <Canvas shadows camera={{ fov: 75 }}>
                <Perf position="top-left" />
                <ambientLight intensity={3.5} />
                <pointLight position={[0, 3, 2]} />
                <pointLight position={[0, 3, 0.7]} />
                <Physics gravity={[0, 0, 0]}>
                    <Suspense fallback={<LoadingAnimation />}>
                        {ModelComponent && <ModelComponent />}
                    </Suspense>
                    <CameraController isMobile={isMobile} />
                </Physics>
            </Canvas>
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
        </div>
    );
};

export default Scene;
