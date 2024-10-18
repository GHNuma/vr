import {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const MainMenu: FC<any> = (props) => {
    const navigate=useNavigate()
    const [width, setWidth] = useState<number>(window.innerWidth);
    const isMobile = width <= 768;
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    return (
        <div className={`relative h-full w-full text-white ${isMobile ? 'text-2xl flex-wrap grid grid-cols-2 gap-x-3  p-2.5' : 'text-3xl gap-2 flex justify-between h-full'} font-serif`}>
            <div className="absolute inset-0 bg-black bg-opacity-60 h-full"/>

            <div className={`${isMobile ? 'h-[350px]' : 'w-1/4 h-full'} cursor-pointer hover:scale-110 transition-transform duration-100 hover:duration-700 ease-in-out`} onClick={()=>{
                navigate('techroom/premium')
            }}>
                <div className={'bg-room1 h-full w-full bg-cover flex justify-center items-center '}>
                    <span className={'relative w-full h-full flex items-center justify-center'}>
                    Premium
                    </span>
                </div>
            </div>

            <div className={` ${isMobile ? 'h-[350px]' : 'w-1/4 h-full'} cursor-pointer hover:scale-110 transition-transform duration-100 hover:duration-700 ease-in-out`} onClick={()=>{
                navigate('techroom/business')
            }} >
                <div className={'bg-room2 h-full w-full bg-cover flex justify-center items-center '}>
                    <span className={'relative w-full h-full flex items-center justify-center'}>
                    Business
                    </span>
                </div>
            </div>

            <div className={` ${isMobile ? ' h-[350px]' : 'w-1/4 h-full'} cursor-pointer hover:scale-110 transition-transform duration-100 hover:duration-700 ease-in-out`} onClick={()=>{
                navigate('techroom/comfort')
            }}>
                <div className={'bg-room3 h-full w-full bg-cover flex justify-center items-center '}>
                    <span className={'relative w-full h-full flex items-center justify-center'}>
                    Comfort
                    </span>
                </div>
            </div>

            <div className={` ${isMobile ? ' h-[350px]' : 'w-1/4 h-full'} cursor-pointer hover:scale-110 transition-transform duration-100 hover:duration-700 ease-in-out`} onClick={()=>{
                navigate('techroom/standard')
            }}>
                <div className={'bg-room4 h-full w-full bg-cover flex justify-center items-center '}>
                    <span className={'relative w-full h-full flex items-center justify-center'}>
                    Standard
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
