
export interface ModalData {
    name: string;
    linkAR:string
    modals: EachModal[]
}
export interface EachModal {
    name: string;
    audio_ru?:string
    audio_kz?:string
    ARLink?:string
    headerText?: string;
    text?: string;
    list?: {
        title: string;
        items: string[];
    };
}
const ModalsInRooms:ModalData[]=[
    {
        name:'PREMIUM',
        linkAR:'https://newq.me/BI/GROUP/4.php',
        modals: [
            {
                name: "Plane008_1",
                headerText: 'modals.premium.ip_video_phone',
            },
            {
                name: "Circle010",
                headerText:'modals.premium.water_pipe.name',
                list:{
                    title:'Состав:',
                    items:['modals.premium.water_pipe.mag_pipe','modals.premium.water_pipe.gor_raz','modals.premium.water_pipe.balloon_cran','modals.premium.water_pipe.pribor']
                }
            },
            {
                name: "Cylinder140",
                headerText:'modals.premium.hot_connect.name',
                list:{
                    title:'Состав:',
                    items:['modals.premium.hot_connect.collector','modals.premium.hot_connect.ballon_cran','modals.premium.hot_connect.balance']
                }
            },
            {
                name: "Cube009",
                headerText:'modals.premium.electro_door',
            },
            {
                name: "Text028",
                headerText:'modals.premium.floor.name',
                list:{
                    title:'Состав:',
                    items:['modals.premium.floor.plita','modals.premium.floor.acoust','modals.premium.floor.polit','modals.premium.floor.fibro']
                },
                audio_ru:'ru/Plavayushiy_Pol_Yugov_VO_270125.mp3',
                audio_kz:'kz/Plav pol_kaz.mp3',
                ARLink: 'https://newq.me/BI/GROUP/6.php'
            },
            {
                name: "Text036",
                headerText:'modals.premium.electro_way',
                list:{
                    title:'Состав:',
                    items:['modals.premium.electro_shield','modals.premium.control_shield']
                }
            },
            {
                name: "Text033",
                headerText:'modals.premium.acoustic.name',
                list:{
                    title:'Состав:',
                    items:['modals.premium.acoustic.gips','modals.premium.acoustic.kirpich','modals.premium.acoustic.gips']
                },
                audio_ru:'ru/Acoustic_Pro_Yugov_VO_270125.mp3',
                audio_kz:'kz/Acoustic Pro_kaz.mp3',
                ARLink:'https://newq.me/BI/GROUP/5.php'
            },
            {
                name: "Cube017",
                headerText:'modals.premium.radiator',
            },
            {
                name: "Cube018_1",
                headerText:'modals.premium.block',
            },
            {
                name: "Cube019_1",
                headerText:'modals.premium.domo_phone.name',
                list:{
                    title:'Состав:',
                    items:['modals.premium.domo_phone.abonement','modals.premium.domo_phone.display','modals.premium.domo_phone.camera','modals.premium.domo_phone.ohrana']
                },
            },
            // {
            //     name: "Text028",
            //     headerText:'Плавающий пол',
            //     text: 'Он снижает распространение бытового\n' +
            //         'ударного шума (падение предметов на\n' +
            //         'пол, детские игры с мячом) в ЖК.\n',
            //     list:{
            //         title:'Состав:',
            //         items:['Плита перекрытия','Виброшумоизоляционный материал(Минераловатная плита)','Полиэтиленовая пленка','Фибростяжка']
            //     }
            // },{
            //     name: "Text033",
            //     headerText:'Межквартирные перегородки',
            //     text: 'В классе Премиум межквартирные перегородки\n' +
            //         'возводят из полнотелого кирпича, отделанного\n' +
            //         'цементно-песчаным раствором или гипсовой\n' +
            //         'смесью.\n' +
            //         'Также может быть использована технология\n' +
            //         'шумоизоляции Acoustic Pro - межквартирные перегородки из\n' +
            //         'газобетонного блока.\n'
            // },{
            //     name: "Cube035_3",
            //     headerText:'Высота потолков и размеры окон',
            //     text: 'Высота потолков – 3,3 м. У ЖК Премиум класса увеличенные оконные проёмы высотой до 2,5 м. Все наружные окна выполняются из 7-камерного металлопластикового профиля, что гарантирует надежную защиту от сурового климата, а также снижает нагревание квартиры в теплый период года.\n'
            //
            // },{
            //     name: "Plane008_2",
            //     headerText:'Система умного дома',
            //     text: 'Квартиры Премиум-класса оснащаются системой умного дома. Управлять системой Умный дом можно через приложение Connected Home.\n',
            //     list:{
            //         title:'В этом техноруме представлены:',
            //         items:[
            //             'Датчик движения (регистрирует активность и передает сигнал о движении)',
            //             'Датчик открытия двери (следит за состоянием двери, защищая дом от проникновения)',
            //             'Управление отоплением (дает возможность регулировать температуру радиаторов)',
            //             'Сенсоры протечки (отправляют сигнал в приложение и на клапана перекрытия воды, при его наличии)',
            //             'Аквастоп (при попадании жидкости на датчики протечки подается сигнал, чтобы перекрыть подачу воды в\n' +
            //             'стояке)',
            //             'Датчик дыма (выявляет наличие дыма. При обнаружении издает тревожный сигнал и уведомляет в\n' +
            //             'приложении)',
            //             'Электрокарниз (система автоматической раздвижки штор)',
            //             'Мультирум– потолочная аудиосистема высшего класса, с отличным качеством звучания',
            //             'Функция Выключить все (выключает все розетки в доме в один клик черезе приложение Connected Home)',
            //         ]
            //     }
            // },{
            //     name: "Cube017",
            //     headerText:'Радиаторы, приточные клапаны',
            //     text: 'Для создания тепла в доме мы применяем стальные панельные радиаторы, внутрипольные или\n' +
            //         'напольные конвекторы, а также вертикальные радиаторы.\n' +
            //         'Подводка трубопроводов к приборам отопления выполняется из стены, что исключает неэстетичные\n' +
            //         'отверстия на полу.\n'
            // },{
            //     name: "Plane011_2",
            //     headerText:'Места общего пользования',
            //     text: 'Отделка мест общего пользования в Премиум - классе\n' +
            //         'выполнена по индивидуальному дизайн проекту. На\n' +
            //         'типовых и первых этажах имеются картины. Дизайн\n' +
            //         'первых этажей наполнен декоративными элементами и\n' +
            //         'зонами ожидания с мебелью.\n' +
            //         'На этажах размещены ниши инженерных сетей,\n' +
            //         'закрытые надежными металлическими дверьми,\n' +
            //         'предотвращающими несанкционированный доступ, а\n' +
            //         'также позволяющих обслуживать инженерные системы\n' +
            //         'без нарушения отделки.\n' +
            //         'На всех входных группах, лифтах, по периметру здания, в\n' +
            //         'паркинге стоят камеры, которые снимают 24/7.\n'
            // },{
            //     name: "Plane001_2",
            //     headerText:'Отделка квартиры',
            //     list: {
            //         title:'Квартира Премиум-класса сдается в предчистовой отделке:',
            //         items:[
            //             'отделка стен гипсовыми штукатурными\n' +
            //             'смесями\n',
            //             'стяжка пола',
            //             'установлены подоконники',
            //             'электроразводка с оптимальным\n' +
            //             'количеством розеток и освещения. В\n' +
            //             'прихожей установлен щиток\n',
            //             'лучевая разводка водоснабжения с\n' +
            //             'установкой запорной арматуры и\n' +
            //             'приборов учета\n',
            //             'приточные клапаны для естественной\n' +
            //             'вентиляции\n',
            //             'ниша в прихожей для модема',
            //             'внутреннее видео IP устройство\n' +
            //             'домофонии\n',
            //         ]
            //     }
            // },

        ]
    },
    {
        name:'BUSINESS',
        linkAR:'https://newq.me/BI/GROUP/3.php',
        modals:[
            {
                name: "Plane050_1",
                headerText: 'modals.business.ip_video_phone',
            },
            {
                name: "Circle025",
                headerText:'modals.business.water_pipe.name',
                list:{
                    title:'Состав:',
                    items:['modals.business.water_pipe.mag_pipe','modals.business.water_pipe.gor_raz','modals.business.water_pipe.balloon_cran','modals.business.water_pipe.pribor']
                }
            },
            {
                name: "Bronze_valve035",
                headerText:'modals.business.hot_connect.name',
                list:{
                    title:'Состав:',
                    items:['modals.business.hot_connect.collector','modals.business.hot_connect.ballon_cran','modals.business.hot_connect.balance']
                }
            },
            {
                name: "Cube052",
                headerText:'modals.business.electro_door',
            },
            {
                name: "Text010",
                headerText:'modals.business.floor.name',
                list:{
                    title:'Состав:',
                    items:['modals.business.floor.plita','modals.business.floor.acoust','modals.business.floor.polit','modals.business.floor.fibro']
                },
                audio_ru:'ru/Plavayushiy_Pol_Yugov_VO_270125.mp3',
                audio_kz:'kz/Plav pol_kaz.mp3',
                ARLink: 'https://newq.me/BI/GROUP/6.php'
            },
            {
                name: "Text007",
                headerText:'',
                list: {
                    title:'Состав:',
                    items:['modals.business.chkaf','modals.business.electro_shield']
                }
            },
            {
                name: "Text015",
                headerText:'modals.business.acoustic.name',
                list:{
                    title:'Состав:',
                    items:['modals.business.acoustic.gips','modals.business.acoustic.plita','modals.business.acoustic.gaz','modals.business.acoustic.plita','modals.business.acoustic.gips']
                },
                audio_ru:'ru/Acoustic_Pro_Yugov_VO_270125.mp3',
                audio_kz:'kz/Acoustic Pro_kaz.mp3',
                ARLink:'https://newq.me/BI/GROUP/5.php'

            },
            {
                name: "Cube083",
                headerText:'modals.business.alumni_window',
            },
            {
                name: "Cube076",
                headerText:'modals.business.radiator',
            },
            {
                name: "Cube018_1",
                headerText:'modals.business.block',
            },
            {
                name: "Cube019_1",
                headerText:'modals.business.domo_phone.name',
                list:{
                    title:'Состав:',
                    items:['modals.business.domo_phone.abonement','modals.business.domo_phone.display','modals.business.domo_phone.camera','modals.business.domo_phone.ohrana']
                },
            },

            // {
            //     name: "Text010",
            //     headerText:'Плавающий пол',
            //     text: 'Он снижает распространение бытового\n' +
            //         'ударного шума (падение предметов на\n' +
            //         'пол, детские игры с мячом) в ЖК.\n',
            //     list:{
            //         title:'Состав:',
            //         items:['Плита перекрытия','Виброшумоизоляционный материал\n' +
            //         '(Минераловатная плита)\n','Полиэтиленовая пленка','Фибростяжка']
            //     }
            // },
            // {
            //     name:"Text018",
            //     headerText:"Acoustic Pro",
            //     text:"В классе Бизнес используется технология\n" +
            //         "шумоизоляции Acoustic Pro.\n" +
            //         "Acoustic Pro это- межквартирные перегородки из\n" +
            //         "газобетонного блока.\n",
            //     list:{
            //         title:"Состав:",
            //         items:['ГКЛ по 12,5 мм (2 слоя)','Минеральная плита 50 мм','Газоблок 100 мм','Минеральная вата 50 мм','ГКЛ по 12,5 мм (2 слоя)']
            //     }
            // },
            // {
            //     name:"Cube083_1",
            //     headerText:"Помещение: высота потолков, размеры окон",
            //     text:"Высота потолков – 3 м.\n" +
            //         "Увеличенные оконные проёмы с\n" +
            //         "высотой в среднем около 2,1м.\n" +
            //         "Окна: 5-камерный\n" +
            //         "металлопластиковый профиль с\n" +
            //         "заполнением, двухкамерный\n" +
            //         "стеклопакет, энергосберегающее\n" +
            //         "покрытие\n" +
            //         "(в Бизнес+ профиль может быть\n" +
            //         "7- камерным)\n" +
            //         "Высота подоконника 60 см\n",
            // },
            // {
            //     name:"Cube076",
            //     headerText:"Радиаторы, приточные клапаны",
            //     text:"Мы применяем стальные панельные радиаторы, высотой 400 мм а также вертикальные радиаторы.\n" +
            //         "Подводка трубопроводов к приборам отопления в домах выполняется из стены.\n",
            // },
            // {
            //     name:"Plane050_2",
            //     headerText:"Система умного дома",
            //     text:"Квартиры бизнес-класса оснащаются системой умного дома. Управлять системой Умный дом можно через\n" +
            //         "приложение Connected Home.\n",
            //     list: {
            //         title:"Центральный котроллер Wallee разработан специально для BI Group. Все датчики и исполнительные\n" +
            //             "устройства подключаются к Wallee:\n",
            //         items:['Беспроводной датчик протечки','Беспроводной датчик дыма с сиреной','Проводной датчик двери','Проводной датчик движения']
            //     }
            // },
            // {
            //     name:"Cube076_2",
            //     headerText:"Места общего пользования",
            //     text:"На этажах размещены ниши инженерных сетей\n" +
            //         "Внешние входные группы ЖК имеют домофонные\n" +
            //         "системы с распознаванием лица.\n" +
            //         "Отделка мест общего пользования выполняется по\n" +
            //         "индивидуальному дизайн-проекту.\n" +
            //         "На типовых и первых этажах имеются картины. Дизайн\n" +
            //         "первых этажей дополнен декоративными элементами,\n" +
            //         "зонами ожидания с мебелью, а также кашпо.\n" +
            //         "Осуществляется наблюдение службой охраны 24/7 за\n" +
            //         "происходящим в ЖК.\n",
            // },
            // {
            //     name:"Plane032_2",
            //     headerText:"Отделка квартиры",
            //     list: {
            //         title:"Квартира Бизнес-класса сдается в\n" +
            //             "улучшенной черновой отделке:\n",
            //         items:['отделка стен гипсовыми штукатурными\n' +
            //         'смесями\n','стяжка пола','потолки без отделки','установлены подоконники','электроразводка с оптимальным\n' +
            //         'количеством розеток и освещения. В\n' +
            //         'прихожей установлен щиток\n','лучевая разводка водоснабжения с\n' +
            //         'установкой запорной арматуры и\n' +
            //         'приборов учета\n','приточные клапаны для естественной\n' +
            //         'вентиляции\n','ниша в прихожей для модема','внутреннее вид']
            //     }
            // }
        ]

    },
    {
        name:'COMFORT',
        linkAR:'https://newq.me/BI/GROUP/2.php',
        modals:[
            {
                name: "Plane027_1",
                headerText: 'modals.comfort.ip_video_phone',
            },
            {
                name: "Circle010",
                headerText:'modals.comfort.water_pipe.name',
                list:{
                    title:'Состав:',
                    items:['modals.comfort.water_pipe.mag_pipe','modals.comfort.water_pipe.gor_raz','modals.comfort.water_pipe.balloon_cran','modals.comfort.water_pipe.pribor']
                }
            },
            {
                name: "Bronze_valve013",
                headerText:'modals.comfort.hot_connect.name',
                list:{
                    title:'Состав:',
                    items:['modals.comfort.hot_connect.collector','modals.comfort.hot_connect.ballon_cran','modals.comfort.hot_connect.balance']
                }
            },
            {
                name: "Cube025",
                headerText:'modals.comfort.electro_door',
            },
            {
                name: "Text004",
                headerText:'modals.comfort.floor.name',
                list:{
                    title:'Состав:',
                    items:['modals.comfort.floor.plita','modals.comfort.floor.acoust','modals.comfort.floor.polit','modals.comfort.floor.fibro']
                },
                audio_ru:'ru/Plavayushiy_Pol_Yugov_VO_270125.mp3',
                audio_kz:'kz/Plav pol_kaz.mp3',
                ARLink: 'https://newq.me/BI/GROUP/6.php'

            },
            {
                name: "Text001",
                headerText:'',
                list: {
                    title:'Состав:',
                    items:['modals.comfort.chkaf','modals.comfort.electro_shield']
                }
            },
            {
                name: "Text060",
                headerText:'modals.comfort.acoustic.name',
                list:{
                    title:'Состав:',
                    items:['modals.comfort.acoustic.gips','modals.comfort.acoustic.plita','modals.comfort.acoustic.gaz','modals.comfort.acoustic.plita','modals.comfort.acoustic.gips']
                },
                audio_ru:'ru/Acoustic_Pro_Yugov_VO_270125.mp3',
                audio_kz:'kz/Acoustic Pro_kaz.mp3',
                ARLink:'https://newq.me/BI/GROUP/5.php'

            },
            {
                name: "Cube029",
                headerText:'modals.comfort.bio_radiator',
            },
            {
                name: "Plane017_1",
                headerText:'modals.comfort.block',
            },

            // {
            //     name: "Text004",
            //     headerText:'Плавающий пол',
            //     text: 'Он снижает распространение бытового\n' +
            //         'ударного шума (падение предметов на\n' +
            //         'пол, детские игры с мячом) в ЖК.\n',
            //     list:{
            //         title:'Состав:',
            //         items:['Плита перекрытия','Виброшумоизоляционный материал\n' +
            //         '(Минераловатная плита)\n','Полиэтиленовая пленка','Фибростяжка']
            //     }
            // },{
            //     name:"Cube050_2",
            //     headerText:"Acoustic Pro",
            //     text:"В классе Бизнес используется технология\n" +
            //         "шумоизоляции Acoustic Pro.\n" +
            //         "Acoustic Pro это- межквартирные перегородки из\n" +
            //         "газобетонного блока.\n",
            //     list:{
            //         title:"Состав:",
            //         items:['ГКЛ по 12,5 мм (2 слоя)','Минеральная плита 50 мм','Газоблок 100 мм','Минеральная вата 50 мм','ГКЛ по 12,5 мм (2 слоя)']
            //     }
            // },{
            //     name:"Cube038_2",
            //     headerText:"Помещение: высота потолков, размеры окон",
            //     text:"Высота потолков – 3 м.\n" +
            //         "В ЖК комфорт класса – увеличенные оконные проёмы с\n" +
            //         "высотой около 2,15 м \n" +
            //         "Наружные окна сделаны из 5-\n" +
            //         "камерного металлопластикового\n" +
            //         "профиля с заполнением\n" +
            //         "двухкамерными стеклопакетами.\n" +
            //         "Имеется защита для детей.\n" +
            //         "Оконные проемы оборудованы\n" +
            //         "подоконниками. Высота\n" +
            //         "подоконников регламентируется\n" +
            //         "внутренними стандартами.\n",
            //
            // },{
            //     name:"Cube029",
            //     headerText:"Радиаторы, приточные клапаны",
            //     text:"Мы применяем стальные панельные или секционные биметаллические радиаторы, высотой от 500 до\n" +
            //         "550 мм\n" +
            //         "Подводка трубопроводов к приборам отопления в домах выполняется из стены",
            //
            // },{
            //     name:"Circle002",
            //     headerText:"Инженерные системы",
            //     text:"Мы применяем горизонтальную (лучевую) поквартирную разводку водоснабжения во всех классах\n" +
            //         "Лучевая поквартирная разводка – стояки находятся в местах общего пользования, в специальном\n" +
            //         "техническом помещении в МОПе. Трубопроводы проложены в теплоизоляционном материале в\n" +
            //         "конструкции пола в стяжке, с выводом в инженерную шахту.\n" +
            //         "При горизонтальной разводке применяется металлопластиковая труба или труба из шитого полиэтилена,\n" +
            //         "длиной 100-150 м.\n",
            // },{
            //     name:"Cube049_2",
            //     headerText:"Места общего пользования",
            //     text:"Отделка мест общего пользования в комфорт классе\n" +
            //         "выполнена по типовому дизайн- коду.\n" +
            //         "На этажах размещены ниши инженерных сетей,\n" +
            //         "закрытые надежными металлическими дверьми,\n" +
            //         "предотвращающими несанкционированный доступ, а\n" +
            //         "также позволяющих обслуживать инженерные системы\n" +
            //         "без нарушения отделки.\n" +
            //         "Внешние входные группы жилого комплекса\n" +
            //         "оборудованы домофонными системами с функцией\n" +
            //         "распознавания лица.\n" +
            //         "Осуществляется наблюдение службой охраны 24/7 за\n" +
            //         "происходящим в ЖК.\n"
            // },{
            //     name:"Plane001_3",
            //     headerText:"Отделка квартиры",
            //     list: {
            //         title:'Квартира Комфорт-класса сдается в\n' +
            //             'улучшенной черновой отделке:\n',
            //         items:['отделка стен гипсовыми штукатурными\n' +
            //         'смесями\n','стяжка пола','потолки без отделки','установлены подоконники','электроразводка с оптимальным\n' +
            //         'количеством розеток и освещения. В\n' +
            //         'прихожей установлен щиток\n','лучевая разводка водоснабжения с\n' +
            //         'установкой запорной арматуры и\n' +
            //         'приборов учета\n','приточные клапаны для естественной\n' +
            //         'вентиляции\n','ниша в прихожей для модема\n','внутреннее ви\n']
            //     }
            // }
        ],

    },
    {
        name:'STANDARD',
        linkAR:'https://newq.me/BI/GROUP/1.php',
        modals:[
            {
                name: "Plane069_1",
                headerText: '',
                list:{
                    title:'Состав:',
                    items:['modals.standard.talk','modals.standard.ip_video_phone']
                }
            },
            {
                name: "Circle043",
                headerText:'modals.standard.water_pipe.name',
                list:{
                    title:'Состав:',
                    items:['modals.standard.water_pipe.mag_pipe','modals.standard.water_pipe.gor_raz','modals.standard.water_pipe.balloon_cran','modals.standard.water_pipe.pribor']
                }
            },
            {
                name: "Bronze_valve070",
                headerText:'modals.standard.hot_connect.name',
                list:{
                    title:'Состав:',
                    items:['modals.standard.hot_connect.collector','modals.standard.hot_connect.ballon_cran','modals.standard.hot_connect.balance']
                }
            },
            {
                name: "DOOR_INS",
                headerText:'modals.standard.electro_door',
            },
            {
                name: "Text049",
                headerText:'modals.standard.floor.name',
                list:{
                    title:'Состав:',
                    items:['modals.standard.floor.plita','modals.standard.floor.chum','modals.standard.floor.fibro']
                },
                audio_ru:'ru/Plavayushiy_Pol_Yugov_VO_270125.mp3',
                audio_kz:'kz/Plav pol_kaz.mp3',
                ARLink: 'https://newq.me/BI/GROUP/6.php'
            },

            {
                name: "Text057",
                headerText:'',
                list: {
                    title:'Состав:',
                    items:['modals.standard.chkaf','modals.standard.electro_shield']
                }
            },
            {
                name: "Cube094",
                headerText:'modals.standard.peregorodka_acoustic.name',
                list:{
                    title:'Состав:',
                    items:['modals.standard.peregorodka_acoustic.gips','modals.standard.peregorodka_acoustic.plita','modals.standard.peregorodka_acoustic.gaz','modals.standard.peregorodka_acoustic.plita','modals.standard.peregorodka_acoustic.gips']
                },
                audio_ru:'ru/Acoustic_Pro_Yugov_VO_270125.mp3',
                audio_kz:'kz/Acoustic Pro_kaz.mp3',
                ARLink:'https://newq.me/BI/GROUP/5.php'

            },
            {
                name: "HEAT_3",
                headerText:'modals.standard.bio_radiator',
            },
            {
                name: "Plane058",
                headerText:'modals.standard.block',
            },
            // {
            //     name: "Plane071",
            //     headerText:'Шумоизоляция:\n' +
            //         'перегородки\n',
            //     text: 'В классе Стандарт межквартирные перегородки\n' +
            //         'шириной в 220 мм.\n' +
            //         'Межкомнатные перегородки в стандарт, комфорт\n' +
            //         'и бизнес классе выполняются из Газоблока\n' +
            //         '*Только для домов Модекс сохраняется стандарт\n' +
            //         'использования ГКЛ для межкомнатных\n' +
            //         'перегородок.\n',
            // },{
            //     name:"Text049",
            //     headerText:"Плавающий пол",
            //     text:"Он снижает распространение бытового\n" +
            //         "ударного шума (падение предметов на\n" +
            //         "пол, детские игры с мячом) в ЖК.\n",
            //     list:{
            //         title:"Состав:",
            //         items:['Плита перекрытия','Виброшумоизоляционный материал\n' +
            //         '(Минераловатная плита)\n','Полиэтиленовая пленка','Фибростяжка']
            //     }
            // },{
            //     name:"Cube137_1",
            //     headerText:"Acoustic Pro",
            //     text:"В классе комфорт используется технология\n" +
            //         "шумоизоляции Acoustic Pro.\n" +
            //         "Acoustic Pro это- межквартирные перегородки из\n" +
            //         "газобетонного блока.\n",
            //     list: {
            //         title: 'Состав:',
            //         items: ['ГКЛ по 12,5 мм (2 слоя)','Минеральная плита 50 мм','Газоблок 100 мм','Минеральная вата 50 мм','ГКЛ по 12,5 мм (2 слоя)']
            //     }
            //
            // },{
            //     name:"Cube128_1",
            //     headerText:"Помещение: высота потолков, размеры окон",
            //     text:"Высота потолков - 2,65 м в MODEX и\n" +
            //         "2,7 м в остальных зданиях.\n" +
            //         "• Оконные проемы 1,85 м в высоту и 1,6\n" +
            //         "м в MODEX.\n" +
            //         "• Окна оснащены детской защитой.\n" +
            //         "Для жителей первых этажей\n" +
            //         "устанавливаются антивандальные\n" +
            //         "окна.\n" +
            //         "• Высота подоконников - 70 см.\n" +
            //         "• Наружные окна изготовлены из 5-\n" +
            //         "камерного металлопластикового\n" +
            //         "профиля с двухкамерными\n" +
            //         "стеклопакетами. Это обеспечивает\n" +
            //         "защиту от суровых климатических\n" +
            //         "условий.\n",
            //
            // },{
            //     name:"HEAT_3",
            //     headerText:"Радиаторы",
            //     text:"Стальные панельные или биметаллические радиаторы.\n" +
            //         "Мы используем двухтрубную систему отопления. Они\n" +
            //         "скрыты в конструкции пола и сделаны из\n" +
            //         "металлопластика или сшитого полиэтилена.\n" +
            //         "Каждый прибор отопления оснащен автоматическим\n" +
            //         "терморегулятором.\n" +
            //         "Мы стараемся минимизировать количество\n" +
            //         "соединений труб отопления в стяжке пола, для\n" +
            //         "снижения рисков аварий, поэтому соединения\n" +
            //         "имеются только в местах подключения приборов от\n" +
            //         "основной магистрали трубопровода и иногда при\n" +
            //         "ответвлениях от магистрали в комнаты.\n",
            // },{
            //     name:"Circle043",
            //     headerText:"Инженерные системы",
            //     text:"В стандарт классе ОБД применяется вертикальная разводка водоснабжения. При вертикальной разводке\n" +
            //         "клапан по стояку можно закрыть из подвального или технического помещения. Для того, чтобы устранить\n" +
            //         "ЧС течи, нужно остановить полностью стояк. В других домах предусматривается горизонтальная (лучевая)\n" +
            //         "разводка водоснабжения\n" +
            //         "При вертикальной разводке системы водоснабжения приборы учета воды располагаются в\n" +
            //         "легкодоступных местах, чтобы было удобно снимать показания счетчиков.\n"
            // },{
            //     name:"Cube124_1",
            //     headerText:"Места общего пользования",
            //     text: 'Места общего пользования в стандарт классе отделаны в\n' +
            //         'тонах, соответствующих типовому дизайн-коду.\n' +
            //         'На каждом этаже имеются ниши для инженерных сетей.\n' +
            //         'Приборы учета электроэнергии размещены в этажном\n' +
            //         'щите. В прихожей каждой квартиры установлен\n' +
            //         'электрический щиток.\n' +
            //         'Розеточная сеть выполнена в стяжке пола. В квартире\n' +
            //         'предусмотрены слаботочные сети, включающие\n' +
            //         'домофонную систему, пожарную сигнализацию и\n' +
            //         'оптоволоконную линию, объединяющую телевидение,\n' +
            //         'телефонию и интернет.\n',
            //
            // },{
            //     name:"Plane003_2",
            //     headerText:"Отделка квартиры",
            //     list:{
            //         title: 'Квартира Стандарт-класса сдаётся в\n' +
            //             'предчистовой отделке:\n',
            //         items: ['Гипсовая штукатурка стен (в MODEX тип отделки\n' +
            //         'отличается\n','Потолки без отделки.','Стяжка пола.','Установлены подоконники.','Электроразводка в квартире с оптимальным\n' +
            //         'количеством розеток и освещения. В прихожей\n' +
            //         'установлен щиток.\n','Система стояков водоснабжения и канализации с\n' +
            //         'установленной запорной арматурой и\n' +
            //         'приборами учёта.\n','Двухтрубная система отопления с\n' +
            //         'установленными радиаторами\n','Естественная вентиляция за счет приточных\n' +
            //         'клапанов.\n','Ниша в прихожей для модема.','Внутреннее аудиоустройство домофонии.\n']
            //     }
            //
            // }
        ],

    }
]

 export default ModalsInRooms
