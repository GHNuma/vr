import React, { useEffect, useRef } from 'react';

const TextedLoader: React.FC = () => {
    const phrasesRef = useRef<SVGGElement>(null);
    const checkmarksRef = useRef<SVGPolygonElement[]>([]);

    const checkmarkIdPrefix = "loadingCheckSVG-";
    const checkmarkCircleIdPrefix = "loadingCheckCircleSVG-";
    const verticalSpacing = 50;

    const shuffleArray = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const createSVG = (tag: string, properties: { [key: string]: string }, children?: SVGElement[]) => {
        const newElement = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (const prop in properties) {
            newElement.setAttribute(prop, properties[prop]);
        }
        if (children) {
            children.forEach(child => newElement.appendChild(child));
        }
        return newElement;
    };

    const createPhraseSvg = (phrase: string, yOffset: number) => {
        const text = createSVG("text", {
            fill: "white",
            x: "50",
            y: `${yOffset}`,
            "fontSize": "18",
            "fontFamily": "Arial"
        });
        text.appendChild(document.createTextNode(phrase + "..."));
        return text;
    };

    const createCheckSvg = (yOffset: number, index: number) => {
        const check = createSVG("polygon", {
            points: "21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708",
            fill: "rgba(255,255,255,1)",
            id: checkmarkIdPrefix + index
        });
        const circleOutline = createSVG("path", {
            d: "M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z",
            fill: "white"
        });
        const circle = createSVG("circle", {
            id: checkmarkCircleIdPrefix + index,
            fill: "rgba(255,255,255,0)",
            cx: "16",
            cy: "16",
            r: "15"
        });
        const group = createSVG("g", {
            transform: `translate(10 ${yOffset - 20}) scale(.9)`
        }, [circle, check, circleOutline]);
        return group;
    };

    const addPhrasesToDocument = (phrases: string[]) => {
        phrases.forEach((phrase, index) => {
            const yOffset = 30 + verticalSpacing * index;
            if (phrasesRef.current) {
                phrasesRef.current.appendChild(createPhraseSvg(phrase, yOffset));
                phrasesRef.current.appendChild(createCheckSvg(yOffset, index));
            }
        });
    };

    useEffect(() => {
        const phrases = shuffleArray([
            "Подключение к серверу",
            "Захват объектов",
            "Перерисовка страницы",
            "Разрешение IP",
            "Размышление о пустоте",
            "Рассмотрение альтернатив",
            "Перетасовка битов",
            "Ожидание ответа",
            "Генерация страниц",
            "Моделирование рабочего процесса",
            "Расширяя возможности человечества",
            "Быть крутым",
            "Подпитывать идею",
            "Исправить CSS",
            "Разговор с сервером",
            "Извлечение данных"
        ]);

        addPhrasesToDocument(phrases);

        const upwardMovingGroup = phrasesRef.current;
        upwardMovingGroup!.currentY = 0;

        const checks = phrases.map((_, i) => ({
            check: document.getElementById(checkmarkIdPrefix + i)!,
            circle: document.getElementById(checkmarkCircleIdPrefix + i)!
        }));

        const startTime = new Date().getTime();

        const animateLoading = () => {
            const now = new Date().getTime();
            upwardMovingGroup!.setAttribute("transform", `translate(0 ${upwardMovingGroup!.currentY})`);
            upwardMovingGroup!.currentY -= 1.35 * easeInOut(now);

            checks.forEach((check, i) => {
                const colorChangeBoundary = -i * verticalSpacing + verticalSpacing + 15;
                if (upwardMovingGroup!.currentY < colorChangeBoundary) {
                    const alpha = Math.max(Math.min(1 - (upwardMovingGroup!.currentY - colorChangeBoundary + 15) / 30, 1), 0);
                    check.circle.setAttribute("fill", `rgba(255, 255, 255, ${alpha})`);
                    const checkColor = [
                        Math.round(255 * (1 - alpha) + 120 * alpha),
                        Math.round(255 * (1 - alpha) + 154 * alpha)
                    ];
                    check.check.setAttribute("fill", `rgba(255, ${checkColor[0]}, ${checkColor[1]}, 1)`);
                }
            });

            if (now - startTime < 30000 && upwardMovingGroup!.currentY > -710) {
                requestAnimationFrame(animateLoading);
            }
        };

        setTimeout(() => {
            document.body.classList.add("loaded");
        }, 15000);

        requestAnimationFrame(animateLoading);
    }, []);

    const easeInOut = (t: number) => {
        const period = 200;
        return (Math.sin(t / period + 100) + 1) / 2;
    };

    return (
        <div id="loader-wrapper">
            <div id="page">
                <div id="phrase_box">
                    <svg width="100%" height="100%">
                        <defs>
                            <style type="text/css">
                                {`@font-face {
                  font-family: "Proxima";
                  src: url('');
                }`}
                            </style>
                            <mask id="mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                                <linearGradient id="linearGradient" gradientUnits="objectBoundingBox" x2="0" y2="1">
                                    <stop stopColor="white" stopOpacity="0" offset="0%" />
                                    <stop stopColor="white" stopOpacity="1" offset="30%" />
                                    <stop stopColor="white" stopOpacity="1" offset="70%" />
                                    <stop stopColor="white" stopOpacity="0" offset="100%" />
                                </linearGradient>
                                <rect width="100%" height="100%" fill="url(#linearGradient)" />
                            </mask>
                        </defs>
                        <g ref={phrasesRef} width="100%" height="100%" style={{ mask: 'url(#mask)' }}>
                            {/* Фразы и чекбоксы будут добавлены динамически */}
                        </g>
                    </svg>
                </div>
                <div id="ighex">
                    <div className="preloader loading">
                        {[...Array(6)].map((_, index) => (
                            <span key={index} className="slice"></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextedLoader;
