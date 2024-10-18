import {useRef, useEffect, useState, useMemo, Suspense, FC} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Html,
    PointerLockControls,
    useGLTF,
    useProgress
} from '@react-three/drei';
import {Physics, useBox} from '@react-three/cannon';
import * as THREE from 'three';
import nipplejs from 'nipplejs';
import { useNavigate, useParams} from "react-router-dom";
import TextedLoader from "../../components/loader.tsx";
import {Perf} from "r3f-perf";

type Keys = {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
};

const ModalsInRooms=[
    {
        name:'PREMIUM',
        modals: [
            {
                name: "Text028",
                headerText:'Плавающий пол',
                text: 'Он снижает распространение бытового\n' +
                    'ударного шума (падение предметов на\n' +
                    'пол, детские игры с мячом) в ЖК.\n',
                list:{
                    title:'Состав:',
                    items:['Плита перекрытия','Виброшумоизоляционный материал(Минераловатная плита)','Полиэтиленовая пленка','Фибростяжка']
                }
            },{
                name: "Text033",
                headerText:'Межквартирные перегородки',
                text: 'В классе Премиум межквартирные перегородки\n' +
                    'возводят из полнотелого кирпича, отделанного\n' +
                    'цементно-песчаным раствором или гипсовой\n' +
                    'смесью.\n' +
                    'Также может быть использована технология\n' +
                    'шумоизоляции Acoustic Pro - межквартирные перегородки из\n' +
                    'газобетонного блока.\n'
            },{
                name: "Cube035_3",
                headerText:'Высота потолков и размеры окон',
                text: 'Высота потолков – 3,3 м. У ЖК Премиум класса увеличенные оконные проёмы высотой до 2,5 м. Все наружные окна выполняются из 7-камерного металлопластикового профиля, что гарантирует надежную защиту от сурового климата, а также снижает нагревание квартиры в теплый период года.\n'

            },{
                name: "Plane008_2",
                headerText:'Система умного дома',
                text: 'Квартиры Премиум-класса оснащаются системой умного дома. Управлять системой Умный дом можно через приложение Connected Home.\n',
                list:{
                    title:'В этом техноруме представлены:',
                    items:[
                        'Датчик движения (регистрирует активность и передает сигнал о движении)',
                        'Датчик открытия двери (следит за состоянием двери, защищая дом от проникновения)',
                        'Управление отоплением (дает возможность регулировать температуру радиаторов)',
                        'Сенсоры протечки (отправляют сигнал в приложение и на клапана перекрытия воды, при его наличии)',
                        'Аквастоп (при попадании жидкости на датчики протечки подается сигнал, чтобы перекрыть подачу воды в\n' +
                        'стояке)',
                        'Датчик дыма (выявляет наличие дыма. При обнаружении издает тревожный сигнал и уведомляет в\n' +
                        'приложении)',
                        'Электрокарниз (система автоматической раздвижки штор)',
                        'Мультирум– потолочная аудиосистема высшего класса, с отличным качеством звучания',
                        'Функция Выключить все (выключает все розетки в доме в один клик черезе приложение Connected Home)',
                    ]
                }
            },{
                name: "Cube017",
                headerText:'Радиаторы, приточные клапаны',
                text: 'Для создания тепла в доме мы применяем стальные панельные радиаторы, внутрипольные или\n' +
                    'напольные конвекторы, а также вертикальные радиаторы.\n' +
                    'Подводка трубопроводов к приборам отопления выполняется из стены, что исключает неэстетичные\n' +
                    'отверстия на полу.\n'
            },{
                name: "Plane011_2",
                headerText:'Места общего пользования',
                text: 'Отделка мест общего пользования в Премиум - классе\n' +
                    'выполнена по индивидуальному дизайн проекту. На\n' +
                    'типовых и первых этажах имеются картины. Дизайн\n' +
                    'первых этажей наполнен декоративными элементами и\n' +
                    'зонами ожидания с мебелью.\n' +
                    'На этажах размещены ниши инженерных сетей,\n' +
                    'закрытые надежными металлическими дверьми,\n' +
                    'предотвращающими несанкционированный доступ, а\n' +
                    'также позволяющих обслуживать инженерные системы\n' +
                    'без нарушения отделки.\n' +
                    'На всех входных группах, лифтах, по периметру здания, в\n' +
                    'паркинге стоят камеры, которые снимают 24/7.\n'
            },{
                name: "Plane001_2",
                headerText:'Отделка квартиры',
                list: {
                    title:'Квартира Премиум-класса сдается в предчистовой отделке:',
                    items:[
                        'отделка стен гипсовыми штукатурными\n' +
                        'смесями\n',
                        'стяжка пола',
                        'установлены подоконники',
                        'электроразводка с оптимальным\n' +
                        'количеством розеток и освещения. В\n' +
                        'прихожей установлен щиток\n',
                        'лучевая разводка водоснабжения с\n' +
                        'установкой запорной арматуры и\n' +
                        'приборов учета\n',
                        'приточные клапаны для естественной\n' +
                        'вентиляции\n',
                        'ниша в прихожей для модема',
                        'внутреннее видео IP устройство\n' +
                        'домофонии\n',
                    ]
                }
            },

        ]
    },
    {
        name:'BUSINESS',
        modals:[
            {
                name: "Text010",
                headerText:'Плавающий пол',
                text: 'Он снижает распространение бытового\n' +
                    'ударного шума (падение предметов на\n' +
                    'пол, детские игры с мячом) в ЖК.\n',
                list:{
                    title:'Состав:',
                    items:['Плита перекрытия','Виброшумоизоляционный материал\n' +
                    '(Минераловатная плита)\n','Полиэтиленовая пленка','Фибростяжка']
                }
            },
            {
                name:"Text018",
                headerText:"Acoustic Pro",
                text:"В классе Бизнес используется технология\n" +
                    "шумоизоляции Acoustic Pro.\n" +
                    "Acoustic Pro это- межквартирные перегородки из\n" +
                    "газобетонного блока.\n",
                list:{
                    title:"Состав:",
                    items:['ГКЛ по 12,5 мм (2 слоя)','Минеральная плита 50 мм','Газоблок 100 мм','Минеральная вата 50 мм','ГКЛ по 12,5 мм (2 слоя)']
                }
            },
            {
                name:"Cube083_1",
                headerText:"Помещение: высота потолков, размеры окон",
                text:"Высота потолков – 3 м.\n" +
                    "Увеличенные оконные проёмы с\n" +
                    "высотой в среднем около 2,1м.\n" +
                    "Окна: 5-камерный\n" +
                    "металлопластиковый профиль с\n" +
                    "заполнением, двухкамерный\n" +
                    "стеклопакет, энергосберегающее\n" +
                    "покрытие\n" +
                    "(в Бизнес+ профиль может быть\n" +
                    "7- камерным)\n" +
                    "Высота подоконника 60 см\n",
            },
            {
                name:"Cube076",
                headerText:"Радиаторы, приточные клапаны",
                text:"Мы применяем стальные панельные радиаторы, высотой 400 мм а также вертикальные радиаторы.\n" +
                    "Подводка трубопроводов к приборам отопления в домах выполняется из стены.\n",
            },
            {
                name:"Plane050_2",
                headerText:"Система умного дома",
                text:"Квартиры бизнес-класса оснащаются системой умного дома. Управлять системой Умный дом можно через\n" +
                    "приложение Connected Home.\n",
                list: {
                    title:"Центральный котроллер Wallee разработан специально для BI Group. Все датчики и исполнительные\n" +
                        "устройства подключаются к Wallee:\n",
                    items:['Беспроводной датчик протечки','Беспроводной датчик дыма с сиреной','Проводной датчик двери','Проводной датчик движения']
                }
            },
            {
                name:"Cube076_2",
                headerText:"Места общего пользования",
                text:"На этажах размещены ниши инженерных сетей\n" +
                    "Внешние входные группы ЖК имеют домофонные\n" +
                    "системы с распознаванием лица.\n" +
                    "Отделка мест общего пользования выполняется по\n" +
                    "индивидуальному дизайн-проекту.\n" +
                    "На типовых и первых этажах имеются картины. Дизайн\n" +
                    "первых этажей дополнен декоративными элементами,\n" +
                    "зонами ожидания с мебелью, а также кашпо.\n" +
                    "Осуществляется наблюдение службой охраны 24/7 за\n" +
                    "происходящим в ЖК.\n",
            },
            {
                name:"Plane032_2",
                headerText:"Отделка квартиры",
                list: {
                    title:"Квартира Бизнес-класса сдается в\n" +
                        "улучшенной черновой отделке:\n",
                    items:['отделка стен гипсовыми штукатурными\n' +
                    'смесями\n','стяжка пола','потолки без отделки','установлены подоконники','электроразводка с оптимальным\n' +
                    'количеством розеток и освещения. В\n' +
                    'прихожей установлен щиток\n','лучевая разводка водоснабжения с\n' +
                    'установкой запорной арматуры и\n' +
                    'приборов учета\n','приточные клапаны для естественной\n' +
                    'вентиляции\n','ниша в прихожей для модема','внутреннее вид']
                }
            }
        ]

    },
    {
        name:'COMFORT',
        modals:[
            {
            name: "Text004",
            headerText:'Плавающий пол',
            text: 'Он снижает распространение бытового\n' +
                'ударного шума (падение предметов на\n' +
                'пол, детские игры с мячом) в ЖК.\n',
            list:{
                title:'Состав:',
                items:['Плита перекрытия','Виброшумоизоляционный материал\n' +
                '(Минераловатная плита)\n','Полиэтиленовая пленка','Фибростяжка']
            }
        },{
            name:"Cube050_2",
            headerText:"Acoustic Pro",
            text:"В классе Бизнес используется технология\n" +
                "шумоизоляции Acoustic Pro.\n" +
                "Acoustic Pro это- межквартирные перегородки из\n" +
                "газобетонного блока.\n",
            list:{
                title:"Состав:",
                items:['ГКЛ по 12,5 мм (2 слоя)','Минеральная плита 50 мм','Газоблок 100 мм','Минеральная вата 50 мм','ГКЛ по 12,5 мм (2 слоя)']
            }
        },{
            name:"Cube038_2",
            headerText:"Помещение: высота потолков, размеры окон",
            text:"Высота потолков – 3 м.\n" +
                "В ЖК комфорт класса – увеличенные оконные проёмы с\n" +
                "высотой около 2,15 м \n" +
                "Наружные окна сделаны из 5-\n" +
                "камерного металлопластикового\n" +
                "профиля с заполнением\n" +
                "двухкамерными стеклопакетами.\n" +
                "Имеется защита для детей.\n" +
                "Оконные проемы оборудованы\n" +
                "подоконниками. Высота\n" +
                "подоконников регламентируется\n" +
                "внутренними стандартами.\n",

        },{
            name:"Cube029",
            headerText:"Радиаторы, приточные клапаны",
            text:"Мы применяем стальные панельные или секционные биметаллические радиаторы, высотой от 500 до\n" +
                "550 мм\n" +
                "Подводка трубопроводов к приборам отопления в домах выполняется из стены",

        },{
            name:"Circle002",
            headerText:"Инженерные системы",
            text:"Мы применяем горизонтальную (лучевую) поквартирную разводку водоснабжения во всех классах\n" +
                "Лучевая поквартирная разводка – стояки находятся в местах общего пользования, в специальном\n" +
                "техническом помещении в МОПе. Трубопроводы проложены в теплоизоляционном материале в\n" +
                "конструкции пола в стяжке, с выводом в инженерную шахту.\n" +
                "При горизонтальной разводке применяется металлопластиковая труба или труба из шитого полиэтилена,\n" +
                "длиной 100-150 м.\n",
        },{
            name:"Cube049_2",
            headerText:"Места общего пользования",
            text:"Отделка мест общего пользования в комфорт классе\n" +
                "выполнена по типовому дизайн- коду.\n" +
                "На этажах размещены ниши инженерных сетей,\n" +
                "закрытые надежными металлическими дверьми,\n" +
                "предотвращающими несанкционированный доступ, а\n" +
                "также позволяющих обслуживать инженерные системы\n" +
                "без нарушения отделки.\n" +
                "Внешние входные группы жилого комплекса\n" +
                "оборудованы домофонными системами с функцией\n" +
                "распознавания лица.\n" +
                "Осуществляется наблюдение службой охраны 24/7 за\n" +
                "происходящим в ЖК.\n"
        },{
            name:"Plane001_3",
            headerText:"Отделка квартиры",
            list: {
                title:'Квартира Комфорт-класса сдается в\n' +
                    'улучшенной черновой отделке:\n',
                items:['отделка стен гипсовыми штукатурными\n' +
                'смесями\n','стяжка пола','потолки без отделки','установлены подоконники','электроразводка с оптимальным\n' +
                'количеством розеток и освещения. В\n' +
                'прихожей установлен щиток\n','лучевая разводка водоснабжения с\n' +
                'установкой запорной арматуры и\n' +
                'приборов учета\n','приточные клапаны для естественной\n' +
                'вентиляции\n','ниша в прихожей для модема\n','внутреннее ви\n']
            }
        }
        ],

    },
    {
        name:'STANDARD',
        modals:[
            {
                name: "Cube094",
                headerText:'Шумоизоляция:\n' +
                    'перегородки\n',
                text: 'В классе Стандарт межквартирные перегородки\n' +
                    'шириной в 220 мм.\n' +
                    'Межкомнатные перегородки в стандарт, комфорт\n' +
                    'и бизнес классе выполняются из Газоблока\n' +
                    '*Только для домов Модекс сохраняется стандарт\n' +
                    'использования ГКЛ для межкомнатных\n' +
                    'перегородок.\n',
            },{
                name:"Text049",
                headerText:"Плавающий пол",
                text:"Он снижает распространение бытового\n" +
                    "ударного шума (падение предметов на\n" +
                    "пол, детские игры с мячом) в ЖК.\n",
                list:{
                    title:"Состав:",
                    items:['Плита перекрытия','Виброшумоизоляционный материал\n' +
                    '(Минераловатная плита)\n','Полиэтиленовая пленка','Фибростяжка']
                }
            },{
                name:"Cube137_1",
                headerText:"Acoustic Pro",
                text:"В классе комфорт используется технология\n" +
                    "шумоизоляции Acoustic Pro.\n" +
                    "Acoustic Pro это- межквартирные перегородки из\n" +
                    "газобетонного блока.\n",
                list: {
                    title: 'Состав:',
                    items: ['ГКЛ по 12,5 мм (2 слоя)','Минеральная плита 50 мм','Газоблок 100 мм','Минеральная вата 50 мм','ГКЛ по 12,5 мм (2 слоя)']
                }

            },{
                name:"Cube128_1",
                headerText:"Помещение: высота потолков, размеры окон",
                text:"Высота потолков - 2,65 м в MODEX и\n" +
                    "2,7 м в остальных зданиях.\n" +
                    "• Оконные проемы 1,85 м в высоту и 1,6\n" +
                    "м в MODEX.\n" +
                    "• Окна оснащены детской защитой.\n" +
                    "Для жителей первых этажей\n" +
                    "устанавливаются антивандальные\n" +
                    "окна.\n" +
                    "• Высота подоконников - 70 см.\n" +
                    "• Наружные окна изготовлены из 5-\n" +
                    "камерного металлопластикового\n" +
                    "профиля с двухкамерными\n" +
                    "стеклопакетами. Это обеспечивает\n" +
                    "защиту от суровых климатических\n" +
                    "условий.\n",

            },{
                name:"HEAT_3",
                headerText:"Радиаторы",
                text:"Стальные панельные или биметаллические радиаторы.\n" +
                    "Мы используем двухтрубную систему отопления. Они\n" +
                    "скрыты в конструкции пола и сделаны из\n" +
                    "металлопластика или сшитого полиэтилена.\n" +
                    "Каждый прибор отопления оснащен автоматическим\n" +
                    "терморегулятором.\n" +
                    "Мы стараемся минимизировать количество\n" +
                    "соединений труб отопления в стяжке пола, для\n" +
                    "снижения рисков аварий, поэтому соединения\n" +
                    "имеются только в местах подключения приборов от\n" +
                    "основной магистрали трубопровода и иногда при\n" +
                    "ответвлениях от магистрали в комнаты.\n",
            },{
                name:"Circle043",
                headerText:"Инженерные системы",
                text:"В стандарт классе ОБД применяется вертикальная разводка водоснабжения. При вертикальной разводке\n" +
                    "клапан по стояку можно закрыть из подвального или технического помещения. Для того, чтобы устранить\n" +
                    "ЧС течи, нужно остановить полностью стояк. В других домах предусматривается горизонтальная (лучевая)\n" +
                    "разводка водоснабжения\n" +
                    "При вертикальной разводке системы водоснабжения приборы учета воды располагаются в\n" +
                    "легкодоступных местах, чтобы было удобно снимать показания счетчиков.\n"
            },{
                name:"Cube124_1",
                headerText:"Места общего пользования",
                text: 'Места общего пользования в стандарт классе отделаны в\n' +
                    'тонах, соответствующих типовому дизайн-коду.\n' +
                    'На каждом этаже имеются ниши для инженерных сетей.\n' +
                    'Приборы учета электроэнергии размещены в этажном\n' +
                    'щите. В прихожей каждой квартиры установлен\n' +
                    'электрический щиток.\n' +
                    'Розеточная сеть выполнена в стяжке пола. В квартире\n' +
                    'предусмотрены слаботочные сети, включающие\n' +
                    'домофонную систему, пожарную сигнализацию и\n' +
                    'оптоволоконную линию, объединяющую телевидение,\n' +
                    'телефонию и интернет.\n',

            },{
                name:"Plane003_2",
                headerText:"Отделка квартиры",
                list:{
                    title: 'Квартира Стандарт-класса сдаётся в\n' +
                        'предчистовой отделке:\n',
                    items: ['Гипсовая штукатурка стен (в MODEX тип отделки\n' +
                    'отличается\n','Потолки без отделки.','Стяжка пола.','Установлены подоконники.','Электроразводка в квартире с оптимальным\n' +
                    'количеством розеток и освещения. В прихожей\n' +
                    'установлен щиток.\n','Система стояков водоснабжения и канализации с\n' +
                    'установленной запорной арматурой и\n' +
                    'приборами учёта.\n','Двухтрубная система отопления с\n' +
                    'установленными радиаторами\n','Естественная вентиляция за счет приточных\n' +
                    'клапанов.\n','Ниша в прихожей для модема.','Внутреннее аудиоустройство домофонии.\n']
                }

            }
        ],

    }
]

function CameraController({isMobile}) {
    const {active}=useProgress()
    const controlsRef = useRef<PointerLockControls>(null!);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPointerLocked, setIsPointerLocked] = useState(false);
    const keys = useRef<Keys>({
        forward: false,
        backward: false,
        left: false,
        right: false,
    }).current;
    const { camera } = useThree();
    const [ref, api] = useBox(() => ({
        mass: 1,
        position: [0, 1.5, 0],
        args:[0.3,1,0.3],

    }));
    ref.current?.rotateY(Math.PI);
    useFrame(() => {
        ref?.current?.getWorldPosition(camera.position);
    });

    useFrame(() => {
        const speed =isMobile ? 1 : 1.5 ; // Скорость передвижения
        const direction = new THREE.Vector3();
        const right = new THREE.Vector3();

        camera.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();

        right.crossVectors(camera.up, direction);

        let velocityX = 0;
        let velocityZ = 0;


        // Обрабатываем нажатие клавиш
        if (keys.forward) {
            velocityX += direction.x * speed;
            velocityZ += direction.z * speed;
        }
        if (keys.backward) {
            velocityX -= direction.x * speed;
            velocityZ -= direction.z * speed;
        }
        if (keys.left) {
            velocityX += right.x * speed;
            velocityZ += right.z * speed;
        }
        if (keys.right) {
            velocityX -= right.x * speed;
            velocityZ -= right.z * speed;
        }

        api.velocity.set(velocityX, 0, velocityZ);
    });

    let initialTouchX: number | null = null;
    let initialTouchY: number | null = null;

    let yaw = 0;
    let pitch = 0;

    // let arrowDeltaY=0
    // let arrowDeltaX=0
    let isJoystickActive = false;
    let isTouchActive = false;
    useEffect(() => {
        if (!isMobile) {
            const handleKeyDown = (event: KeyboardEvent) => {
                switch (event.key) {
                    case 'w':
                    case 'ц':
                        keys.forward = true;
                        break;
                    case 's':
                    case 'ы':
                        keys.backward = true;
                        break;
                    case 'a':
                    case 'ф':
                        keys.left = true;
                        break;
                    case 'd':
                    case 'в':
                        keys.right = true;
                        break;
                    // case 'ArrowUp':
                    //     arrowDeltaY = 1;
                    //     break;
                    // case 'ArrowDown':
                    //     arrowDeltaY = -1;
                    //     break;
                    // case 'ArrowLeft':
                    //     arrowDeltaX = -1;
                    //     break;
                    // case 'ArrowRight':
                    //     arrowDeltaX = 1;
                    //     break;
                }
            };

            const handleKeyUp = (event: KeyboardEvent) => {
                switch (event.key) {
                    case 'w':
                    case 'ц':
                        keys.forward = false;
                        break;
                    case 's':
                    case 'ы':
                        keys.backward = false;
                        break;
                    case 'a':
                    case 'ф':
                        keys.left = false;
                        break;
                    case 'd':
                    case 'в':
                        keys.right = false;
                        break;
                    case 'ArrowUp':
                    // case 'ArrowDown':
                    //     arrowDeltaY = 0;
                    //     break;
                    // case 'ArrowLeft':
                    // case 'ArrowRight':
                    //     arrowDeltaX = 0;
                    //     break;
                }
            };

            // function updateCamera() {
            //     if (arrowDeltaX !== 0 || arrowDeltaY !== 0) {
            //         // Обновляем yaw и pitch
            //         yaw -= arrowDeltaX * 0.03;
            //         pitch += arrowDeltaY * 0.03;
            //         pitch = THREE.MathUtils.clamp(pitch, -Math.PI / 4, Math.PI / 4); // Ограничиваем наклон головы
            //
            //         // Создаем новый Euler для обновления ориентации камеры
            //         const euler = new THREE.Euler(pitch, yaw, 0, 'YXZ');
            //         camera.quaternion.setFromEuler(euler); // Устанавливаем кватернион камеры
            //
            //         // Получаем вектор направления, куда смотрит камера
            //         const direction = new THREE.Vector3(0, 0, -1); // Начальное направление вперед
            //         direction.applyQuaternion(camera.quaternion); // Применяем кватернион к вектору направления
            //
            //         // Обновляем позицию камеры
            //         camera.position.add(direction.multiplyScalar(0.1));// Перемещение вперед по направлению взгляда
            //
            //
            //         yaw=0
            //         pitch=0
            //     }
            //
            //         requestAnimationFrame(updateCamera);
            // }
            //
            // updateCamera();

            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('keyup', handleKeyUp);
            };
        } else {
            const joystickLeft = nipplejs.create({
                zone: document.getElementById('joystick-left')!,
                mode: 'static',
                position: { left: '50px', bottom: '50px' },
                color: 'blue',
            });

            const joystickRight = nipplejs.create({
                zone: document.getElementById('joystick-right')!,
                mode: 'static',
                position: { right: '50px', bottom: '50px' },
                color: 'red',
            });

            joystickLeft.on('move', (evt, data) => {
                if (!isTouchActive){
                    isJoystickActive = true;
                    const forward = data.vector.y > 0;
                    const backward = data.vector.y < 0;
                    const left = data.vector.x < 0;
                    const right = data.vector.x > 0;

                    keys.forward = forward;
                    keys.backward = backward;
                    keys.left = left;
                    keys.right = right;
                }
            });

            joystickLeft.on('end', () => {
                keys.forward = false;
                keys.backward = false;
                keys.left = false;
                keys.right = false;
                isJoystickActive = false;

                joystickDeltaX = 0; // Остановка по оси X

                joystickDeltaY = 0; // Остановка по оси Y

            });

            const maxBodyRotationSpeed = 0.03;
            const maxHeadTiltSpeed = 0.03;

            let firstMove = true;

            let joystickDeltaX = 0;
            let joystickDeltaY = 0;


            joystickRight.on('move', (evt, data) => {
                joystickDeltaX = data.vector.x; // Влево (-1) или вправо (1)
                joystickDeltaY = data.vector.y; // Вверх (1) или вниз (-1)

                if (firstMove) {
                    firstMove = false; // Устанавливаем флаг в false после первого движения
                    return; // Не применяем движение
                }
            });

            joystickRight.on('end', () => {
                isJoystickActive = false;
                joystickDeltaX = 0; // Остановка по оси X
                joystickDeltaY = 0; // Остановка по оси Y
            });

            function updateCamera() {
                if (!isTouchActive && joystickDeltaX !== 0 || joystickDeltaY !== 0) {
                    isJoystickActive = true;
                    yaw -= joystickDeltaX * maxBodyRotationSpeed;

                    pitch += joystickDeltaY * maxHeadTiltSpeed;
                    pitch = THREE.MathUtils.clamp(pitch, -Math.PI / 4, Math.PI / 4); // Ограничиваем наклон головы

                    const euler = new THREE.Euler(pitch, yaw, 0, 'YXZ');

                    camera.quaternion.setFromEuler(euler);

                    const direction = new THREE.Vector3(0, 0, -1); // Направление вперед
                    direction.applyQuaternion(camera.quaternion); // Применяем ориентацию камеры

                    camera.position.add(direction.multiplyScalar(0.1)); // Перемещение вперед по направлению взгляда
                    isJoystickActive = false;
                }

                requestAnimationFrame(updateCamera);
            }

            updateCamera();

            return () => {
                joystickLeft.destroy();
                joystickRight.destroy();
            };
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {


            const handleTouchStart = (event: TouchEvent) => {
                if (!isJoystickActive && event.touches.length === 1) {
                    // Включаем режим касания, если джойстик не активен
                    isTouchActive = true;
                    initialTouchX = event.touches[0].clientX;
                    initialTouchY = event.touches[0].clientY;
                }
            };

            const handleTouchMove = (event: TouchEvent) => {
                if (!isJoystickActive && isTouchActive && initialTouchX !== null && initialTouchY !== null && event.touches.length === 1) {
                    const deltaX = event.touches[0].clientX - initialTouchX;
                    const deltaY = event.touches[0].clientY - initialTouchY;

                    const sensitivity = 0.002; // чувствительность камеры

                    yaw -= deltaX * sensitivity; // вращение по оси Y (влево/вправо)
                    pitch -= deltaY * sensitivity; // наклон по оси X (вверх/вниз)

                    // Ограничиваем наклон камеры по оси X (вверх-вниз)
                    pitch = THREE.MathUtils.clamp(pitch, -Math.PI / 4, Math.PI / 4);

                    // Устанавливаем кватернион камеры на основе значений yaw и pitch
                    const euler = new THREE.Euler(pitch, yaw, 0, 'YXZ');
                    camera.quaternion.setFromEuler(euler);

                    // Вычисляем направление движения вперед с учетом новой ориентации камеры
                    const direction = new THREE.Vector3(0, 0, -1);
                    direction.applyQuaternion(camera.quaternion); // Применяем ориентацию камеры к направлению

                    // Перемещение камеры вперед по направлению взгляда
                    camera.position.add(direction.multiplyScalar(0.1));

                    // Обновляем исходные координаты касания
                    initialTouchX = event.touches[0].clientX;
                    initialTouchY = event.touches[0].clientY;
                }
            };

            const handleTouchEnd = () => {
                isTouchActive = false;
                initialTouchX = null;
                initialTouchY = null;
            };

            // Добавляем обработчики событий для touch
            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);

            return () => {
                // Удаляем обработчики событий при размонтировании
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isMobile, camera]);



    useEffect(() => {
        const handleMouseDown = (localName:any) => {
            if(localName==='canvas'){
                controlsRef.current?.lock();
            }
        };
        // const handleMouseUp = () => {
        //     controlsRef.current?.unlock();
        // };

        const handlePointerLockChange = () => {
            setIsPointerLocked(document.pointerLockElement === document.body);
        };

        window.addEventListener('mousedown', (e)=>handleMouseDown(e?.target?.localName));
        // window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('pointerlockchange', handlePointerLockChange);
        // const clickEvent = new Event('mousedown', { bubbles: true, cancelable: true });
        // if(!active){
        //     window.dispatchEvent(clickEvent)
        // }
        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            // window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('pointerlockchange', handlePointerLockChange);
        };
    }, [active]);
    useEffect(() => {
        const handleWheel = (event) => {
            // Ограничиваем значение fov (поле зрения) камеры
            if (event.deltaY < 0) {
                // Приближение (уменьшение fov)
                camera.fov = Math.max(10, camera.fov - 2);
            } else {
                // Отдаление (увеличение fov)
                camera.fov = Math.min(75, camera.fov + 2);
            }
            camera.updateProjectionMatrix();
        };

        // Добавляем обработчик колесика мыши
        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [camera]);


    return !isMobile ? <PointerLockControls ref={controlsRef} /> : null;
}

// function VisibleCollider({ position, size, rotation }) {
//     return (
//         <mesh position={position} rotation={rotation}>
//             <boxGeometry args={size} />
//             <meshBasicMaterial color="red" wireframe />
//         </mesh>
//     );
// }
//
// function VisiblePlaneCollider({ position, rotation, size }) {
//     return (
//         <mesh position={position} rotation={rotation}>
//             {/* Используем planeGeometry для плоскостей */}
//             <planeGeometry args={size} />
//             <meshBasicMaterial color="red" wireframe />
//         </mesh>
//     );
// }

const InteractiveObject = ({ position, data }) => {
    const {headerText,list,text}=data
    const sphereRef = useRef();
    const outlineRef = useRef();
    const [hovered, setHovered] = useState(true);

    const newPosition = [position[0], position[1] + 0.09, position[2]];

    useFrame(({ camera, raycaster,clock }) => {
        if (sphereRef.current) {
            // Проверяем пересечение с большой невидимой сферой
            const intersects = raycaster.intersectObject(sphereRef.current);
            setHovered(!(intersects.length > 0));
                const elapsedTime = clock.getElapsedTime();
                const scaleFactor = hovered ? 1.3 + Math.sin(elapsedTime * 3) * 0.2 : 1;
                outlineRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
            }

        });

    return (
        <mesh
            position={newPosition}
            ref={sphereRef}
            scale={hovered ? [0.2, 0.2, 0.2] : [0.3, 0.3, 0.3]}  // Увеличение при наведении

        >
                <sphereGeometry args={[0.09, 32, 32]}/>
                <meshStandardMaterial color={hovered ? '#e14fb0' : 'rgb(203,255,30)'}/>

            {/* Контур вокруг сферы */}
            <mesh ref={outlineRef}>
                <sphereGeometry args={[0.095, 32, 32]}/>
                {/* Радиус чуть больше основной сферы */}
                <meshBasicMaterial
                    color={hovered ?  'gray' : 'rgb(154,248,66)'}
                    transparent
                    opacity={hovered ? 0.6 : 1}  // Прозрачность меняется при наведении
                    wireframe // Чтобы контур был видимым
                />
            </mesh>

            {/* Невидимая большая сфера для пересечения */}
            <mesh>
                <sphereGeometry args={[0.8, 32, 32]}/>
                <meshBasicMaterial transparent opacity={0}/>
            </mesh>
            {/* Видимая часть объекта */}
            {!hovered ? (
                <>
                    <Html center>
                        <div style={{
                            minWidth: '300px',
                            width: "auto",
                            backgroundColor: 'rgba(27,27,27,0.73)',
                            color: 'white',
                            padding: '10px',
                            borderRadius: '10px',
                            border: '2px solid #ffffff',
                            userSelect: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <p className={'font-bold text-xl'}>{headerText && headerText}</p>
                            <p className={'font-medium text-sm'}>{text && text}</p>
                            <div>{list &&
                                <div className={'flex-col gap-0.5'}>
                                    {list.title}
                                    {list.items.map((item, idx) => (
                                        <div className={'font-medium text-sm'}>{idx + 1}. {item}</div>
                                    ))}
                                </div>
                            }
                            </div>
                        </div>
                    </Html>
                </>
            ) : (
                <>

                </>
            )}

            <mesh>
                <sphereGeometry args={[0.85, 32, 32]}/>
                {/* Увеличиваем радиус */}
                <meshBasicMaterial transparent opacity={0}/>
                {/* Делаем её невидимой */}
            </mesh>
        </mesh>
    );
};

function StaticCollider({object, currentRoomData}: { object: THREE.Object3D, currentRoomData: any }) {
    // const [showModals,setShowModals]=useState(true)
    const getGlobalTransform = (obj: THREE.Object3D) => {
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        const scale = new THREE.Vector3(1, 1, 1);

        let current = obj;

        while (current) {
            const currentPosition = new THREE.Vector3().copy(current.position);
            const currentQuaternion = new THREE.Quaternion().copy(current.quaternion);
            const currentScale = new THREE.Vector3().copy(current.scale);

            // Применяем текущие трансформации (позицию, вращение, масштаб) к накопленным
            position.applyQuaternion(currentQuaternion).add(currentPosition);
            quaternion.multiplyQuaternions(currentQuaternion, quaternion);
            scale.multiply(currentScale);

            current = current.parent!;
        }

        return { position, quaternion, scale };
    };

    // useEffect(()=> {
    //
    //     window.addEventListener('keydown', (e)=>{
    //         if(e.key==='E' || e.key==='e'){
    //             setShowModals(!showModals)
    //         }
    //     })
    //     return () => {
    //         window.removeEventListener('keydown', (e)=>{
    //             if(e.key==='E' || e.key==='e'){
    //                 setShowModals(!showModals)
    //             }
    //         })
    //     };
    //
    // },[])

    const addColliders = (obj: THREE.Object3D) => {
        let modalData={};

        currentRoomData.modals.map(modal=>{
            if(modal.name===obj.name)
                modalData=modal
        })
        if (obj instanceof THREE.Mesh) {
            const mesh = obj;

            if (mesh.geometry && mesh.geometry.boundingBox ) {
                mesh.geometry.computeBoundingBox();
                const boxSize = new THREE.Vector3
                mesh.geometry.boundingBox.getSize(boxSize);


                const { position, quaternion, scale } = getGlobalTransform(mesh);
                boxSize.multiply(scale); // Применяем глобальный масштаб
                const preparedPosition = position.toArray();
                const preparedSize = boxSize.toArray();
                const preparedRotation = new THREE.Euler().setFromQuaternion(quaternion).toArray()
                const quaternionValues: [number, number, number, number] = [quaternion.x, quaternion.y, quaternion.z, quaternion.w];


                // const testFloor=position.clone()
                // testFloor.setY(testFloor.y+5)

                // const [ref] = usePlane(() => ({
                //     type: 'Static',
                //     position: preparedPosition,
                //     rotation:preparedRotation
                // }));
                // return (
                //     <>
                //             <primitive object={mesh} ref={ref} rotation={preparedRotation} position={preparedPosition} />
                //         <VisiblePlaneCollider position={preparedPosition} size={[10, 10]} rotation={[-Math.PI / 2, 0, 0]}  />
                //
                //     </>
                // )
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [ref] = useBox(() => ({
                    type: 'Static',
                    position: preparedPosition,
                    args: preparedSize,
                    quaternion: quaternionValues, // Преобразуем к Эйлеровым углам
                }));


                return (
                    <>
                        <primitive object={mesh} ref={ref} scale={scale.toArray()} position={preparedPosition} rotation={preparedRotation} size={preparedSize} />
                        {Object.keys(modalData).length !== 0 &&
                            <InteractiveObject position={preparedPosition} data={modalData}/>
                        }
                        {/*<VisibleCollider position={preparedPosition} size={preparedSize} rotation={preparedRotation}  />*/}
                    </>
                );


            }
        }

        // Рекурсивная обработка детей объекта
        return obj.children.map((child, i) => (
            <group key={i}>
                {addColliders(child)}
            </group>
        ));
    };
    // if(object.name!=='Cube006'){
    return addColliders(object)

    // }
}

function LoadingAnimation() {
    const { loaded,progress } = useProgress()
    return <Html center className={'w-screen h-screen'}>
        <TextedLoader />
        </Html>
}


function TechRoomModel({ modelPath }) {
    const { scene } = useGLTF(modelPath, true,);
    const clone = useMemo(() => scene.clone(), [scene]);
    useGLTF.preload(modelPath);
    const currentType=modelPath.split('/').pop().replace('.glb', '');
    const currentRoomData = ModalsInRooms.find((roomData)=>roomData.name===currentType)

    return (
        <group>
            {clone?.children.map((child) => {
                return (
                    <group key={child.name}>
                        <StaticCollider object={child} currentRoomData={currentRoomData}/>
                    </group>
                )
            })}
        </group>
    );
}

function Scene() {
    // enum RoomClass {
    //     premium='PREMIUM',
    //     business='BUSINESS',
    //     comfort='COMFORT',
    //     standard='STANDARD'
    // }
    const {room_name}=useParams()
    const navigate= useNavigate()
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [currentModel, setCurrentModel] = useState('');
    const {progress,active}=useProgress()
    // const switchRoom = (newModelPath) => {
    //     setCurrentModel(newModelPath);
    // };
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        if(room_name==='premium'){
            setCurrentModel(`/models/PREMIUM.glb`)
        } else if(room_name==='business'){
            setCurrentModel(`/models/BUSINESS.glb`)

        } else if(room_name==='comfort'){
            setCurrentModel(`/models/COMFORT.glb`)

        } else if(room_name==='standard'){
            setCurrentModel(`/models/STANDARD.glb`)
        }
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [room_name]);

    const canvas = useRef()
    canvas?.current?.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, { passive: false });

    const isMobile = width <= 768;

    return (
        <div style={{height: '100%', width: '100%'}} className={'select-none'}>
            <Canvas shadows camera={{fov: 75}}>
                {/*<Perf position="top-left" />*/}
                <ambientLight intensity={3.5}/>
                <pointLight position={[0, 3, 2]}/>
                <pointLight position={[0, 3, 0.7]}/>
                <pointLight position={[1.7, 3, 2]}/>
                <pointLight position={[1.7, 3, 0.7]}/>
                <Physics gravity={[0, 0, 0]}>
                    <Suspense fallback={<LoadingAnimation/>}>
                        <TechRoomModel modelPath={currentModel}/>
                    </Suspense>
                    {/*<FloorCollider/>*/}
                    <CameraController isMobile={isMobile} />
                </Physics>

            </Canvas>
            {!active && <div
                className={`fixed ${isMobile ?'p-3' : 'p-1'} top-5 left-5 bg-white bg-opacity-70 flex justify-center items-center rounded-md border border-b-gray-100 cursor-pointer`}
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    document.exitPointerLock();
                    navigate('/')
                }}
                onTouchEndCapture={(e)=>{
                    e.preventDefault()
                    e.stopPropagation()
                    document.exitPointerLock();
                    navigate('/')
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                </svg>
            </div>}

            {isMobile  &&
                <>
                    <div
                        id="joystick-left"
                        className={''}
                        style={{position: 'fixed', left: '50px', bottom: '50px', width: 'auto', height: 'auto',userSelect:'none'}}
                    />
                    <div
                        id="joystick-right"
                        className={''}
                        style={{position: 'fixed', right: '50px', bottom: '50px', width: 'auto', height: 'auto',userSelect:'none'}}
                    />
                </>
            }
        </div>
    );
}

const TechRoom: FC<any> = (any) => {

    return (
        <div style={{width: '100vw', height: '100vh', position: 'relative'}}>
            <Scene/>
        </div>
    );
}

export default TechRoom
