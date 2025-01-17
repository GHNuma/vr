import {routes} from "./router.tsx";
import {Suspense} from "react";
import {RouterProvider} from "react-router-dom";
import {useGLTF} from "@react-three/drei";

function App() {
    return (
        <Suspense>
            <div className={'w-screen h-screen'}>
            <RouterProvider router={routes}/>
            </div>
        </Suspense>
    );
}
// useGLTF.preload("/models/STANDARD.glb");
// useGLTF.preload('/models/COMFORT.glb')
// useGLTF.preload("/models/BUSINESS.glb");
// useGLTF.preload('/models/PREMIUM.glb')
useGLTF.preload("/animations/BUSINESS_FLOOR.glb");

export default App;
