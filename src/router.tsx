import {createBrowserRouter, Navigate} from 'react-router-dom'
import {techRoomPage} from "./pages";
import {mainMenuPage} from "./pages";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <mainMenuPage.Component/>,
        children: [
        ]
    },
    {
        path: '/techroom',
        element: <Navigate to='/'/>,
        children: [
        ]
    },
    {
        path: '/techroom/:room_name',
        element: <techRoomPage.Component/>,
        children: [
        ]
    },
    // {
    //     path: '/techroom/:room_name',
    //     element: <techRoomPage.Component/>,
    //
    // }
])
