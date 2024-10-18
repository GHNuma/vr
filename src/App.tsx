import {routes} from "./router.tsx";
import {Suspense} from "react";
import {RouterProvider} from "react-router-dom";

function App() {
    return (
        <Suspense>
            <div className={'w-screen h-screen'}>
            <RouterProvider router={routes}/>
            </div>
        </Suspense>
    );
}

export default App;
