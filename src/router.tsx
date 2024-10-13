import { createBrowserRouter } from 'react-router-dom'
import MainMenu from "./pages/main-menu/main-menu.tsx";
import TechRoom from "./pages/tech-room/tech-room.tsx";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainMenu/>,
        children: [
        ]
    },
    {
        path: '/techroom/:room_name',
        element: <TechRoom/>,
        children: [
        ]
    }
])
