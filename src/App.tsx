import {routes} from "./router.tsx";
import {Suspense} from "react";
import {RouterProvider} from "react-router-dom";

function App() {
    const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', appHeight)
    appHeight()
    return (
        <Suspense>
            <div className={'w-screen h-screen'}>
            <RouterProvider router={routes}/>
            </div>
        </Suspense>
    );
}

export default App;
