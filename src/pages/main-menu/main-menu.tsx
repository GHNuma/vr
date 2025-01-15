import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

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
    const {i18n}=useTranslation()

    const changeLanguage = (e:React.MouseEvent | React.TouchEvent,lng:string)=>{
        e.preventDefault()
        e.stopPropagation()
        i18n.changeLanguage(lng)
    }
    return (
        <div
            className={`relative min-h-screen  w-full text-white ${isMobile ? 'text-2xl flex-wrap grid grid-cols-2 gap-x-1 gap-y-1 p-1' : 'text-3xl gap-2 flex justify-between h-full'} font-serif`}>
            <div className="absolute inset-0 bg-black bg-opacity-60 h-full"/>
            <div
                className="flex gap-1 items-center absolute top-4 right-4 bg-gray-200 bg-opacity-30 z-50 rounded-lg">
                <p className={`${i18n.language==='kz' && 'bg-gray-400'} font-medium text-sm border-r-gray-50 cursor-pointer hover:scale-110 hover:bg-gray-600 rounded-lg p-2`}
                   onClick={(e) => changeLanguage(e, 'kz')}
                   onTouchStart={(e) => changeLanguage(e, 'kz')}
                >
                    KZ
                </p>
                <div className='h-4 w-[1px] bg-gray-50'/>
                <p className={`${i18n.language==='ru' && 'bg-gray-400'} font-medium text-sm border-l-gray-50 cursor-pointer hover:scale-110 hover:bg-gray-600 rounded-lg p-2`}
                   onClick={(e) => changeLanguage(e, 'ru')}
                   onTouchStart={(e) => changeLanguage(e, 'ru')}
                >
                    RU
                </p>
            </div>
            <div
                className={`${isMobile ? 'h-[600px]' : 'w-1/4 h-full'} cursor-pointer hover:scale-110 transition-transform duration-100 hover:duration-700 ease-in-out`}
                onClick={() => {
                    navigate('techroom/premium')
                }}>
                <div className={'bg-room1 h-full w-full bg-cover flex justify-center items-center '}>
                    <span className={'relative w-full h-full flex items-center justify-center'}>
                    Premium
                    </span>
                </div>
            </div>

            <div
                className={` ${isMobile ? 'h-[600px]' : 'w-1/4 h-full'} cursor-pointer hover:scale-110 transition-transform duration-100 hover:duration-500 ease-in-out`}
                onClick={() => {
                    navigate('techroom/business')
                }}>
                <div className={'bg-room2 h-full w-full bg-cover flex justify-center items-center '}>
                    <span className={'relative w-full h-full flex items-center justify-center'}>
                    Business
                    </span>
                </div>
            </div>

            <div
                className={` ${isMobile ? ' h-[600px]' : 'w-1/4 h-full'} cursor-pointer hover:scale-110 transition-transform duration-100 hover:duration-700 ease-in-out`}
                onClick={() => {
                    navigate('techroom/comfort')
                }}>
                <div className={'bg-room3 h-full w-full bg-cover flex justify-center items-center '}>
                    <span className={'relative w-full h-full flex items-center justify-center'}>
                    Comfort
                    </span>
                </div>
            </div>

            <div
                className={` ${isMobile ? ' h-[600px]' : 'w-1/4 h-full'} cursor-pointer hover:scale-110 transition-transform duration-100 hover:duration-700 ease-in-out`}
                onClick={() => {
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
