import {createHashRouter} from 'react-router-dom'
import {techRoomPage} from "./pages";
import {mainMenuPage} from "./pages";

export const routes = createHashRouter([
    {
        path: '/',
        element: <mainMenuPage.Component/>,
        children: [
        ]
    },
    {
        path: '/techroom/:room_name',
        element: <techRoomPage.Component/>,
        children: [
        ]
    }
])
