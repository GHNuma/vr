import {Html, useProgress} from "@react-three/drei";
import TextedLoader from "./loader.tsx";

export default function LoadingAnimation() {
    const { loaded,progress } = useProgress()
    return <Html center className={'w-screen h-screen'}>
        <TextedLoader />
    </Html>
}
