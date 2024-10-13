import React, { useEffect, useRef } from "react";

const TextedLoader = () => {
    const phrasesContainerRef = useRef(null);
    const checkmarkIdPrefix = "loadingCheckSVG-";
    const checkmarkCircleIdPrefix = "loadingCheckCircleSVG-";
    const verticalSpacing = 50;

    const phrases = [
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
    ];

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const createSVG = (tag, properties, opt_children) => {
        const newElement = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (const prop in properties) {
            newElement.setAttribute(prop, properties[prop]);
        }
        if (opt_children) {
            opt_children.forEach((child) => {
                newElement.appendChild(child);
            });
        }
        return newElement;
    };

    const createPhraseSvg = (phrase, yOffset) => {
        const text = createSVG("text", {
            fill: "white",
            x: 50,
            y: yOffset,
            "font-size": 18,
            "font-family": "Arial"
        });
        text.appendChild(document.createTextNode(phrase + "..."));
        return text;
    };

    const createCheckSvg = (yOffset, index) => {
        const check = createSVG("polygon", {
            points:
                "21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708 ",
            fill: "rgba(255,255,255,1)",
            id: checkmarkIdPrefix + index
        });
        const circleOutline = createSVG("path", {
            d:
                "M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z",
            fill: "white"
        });
        const circle = createSVG("circle", {
            id: checkmarkCircleIdPrefix + index,
            fill: "rgba(255,255,255,0)",
            cx: 16,
            cy: 16,
            r: 15
        });
        const group = createSVG(
            "g",
            {
                transform: "translate(10 " + (yOffset - 20) + ") scale(.9)"
            },
            [circle, check, circleOutline]
        );
        return group;
    };

    const addPhrasesToDocument = (phrases) => {
        phrases.forEach((phrase, index) => {
            const yOffset = 30 + verticalSpacing * index;
            phrasesContainerRef.current.appendChild(createPhraseSvg(phrase, yOffset));
            phrasesContainerRef.current.appendChild(createCheckSvg(yOffset, index));
        });
    };

    const easeInOut = (t) => {
        const period = 200;
        return (Math.sin(t / period + 100) + 1) / 2;
    };

    useEffect(() => {
        const shuffledPhrases = shuffleArray([...phrases]);
        addPhrasesToDocument(shuffledPhrases);
        const upwardMovingGroup = phrasesContainerRef.current;
        upwardMovingGroup.currentY = 0;

        const checks = shuffledPhrases.map((_, i) => ({
            check: document.getElementById(checkmarkIdPrefix + i),
            circle: document.getElementById(checkmarkCircleIdPrefix + i)
        }));

        let start_time = new Date().getTime();

        const animateLoading = () => {
            const now = new Date().getTime();
            upwardMovingGroup.setAttribute(
                "transform",
                "translate(0 " + upwardMovingGroup.currentY + ")"
            );
            upwardMovingGroup.currentY -= 1.35 * easeInOut(now);
            checks.forEach((check, i) => {
                const colorChangeBoundary = -i * verticalSpacing + verticalSpacing + 15;
                if (upwardMovingGroup.currentY < colorChangeBoundary) {
                    const alpha = Math.max(
                        Math.min(
                            1 - (upwardMovingGroup.currentY - colorChangeBoundary + 15) / 30,
                            1
                        ),
                        0
                    );
                    check.circle.setAttribute("fill", "rgba(255, 255, 255, " + alpha + ")");
                    const checkColor = [
                        Math.round(255 * (1 - alpha) + 120 * alpha),
                        Math.round(255 * (1 - alpha) + 154 * alpha)
                    ];
                    check.check.setAttribute(
                        "fill",
                        "rgba(255, " + checkColor[0] + "," + checkColor[1] + ", 1)"
                    );
                }
            });

            if (now - start_time < 30000 && upwardMovingGroup.currentY > -710) {
                requestAnimationFrame(animateLoading);
            } else {
                // Reset the animation
                upwardMovingGroup.currentY = 0;
                phrasesContainerRef.current.innerHTML = ""; // Clear previous phrases
                addPhrasesToDocument(shuffleArray([...phrases])); // Add new phrases
                start_time = new Date().getTime(); // Reset start time
                animateLoading(); // Restart animation
            }
        };

        animateLoading();

        return () => {
            if (phrasesContainerRef.current) {
                phrasesContainerRef.current.innerHTML = ""; // Cleanup on unmount
            }
        };
    }, []);

    return (
        <div id="loader-wrapper">
            <div id="page">
                <div id="phrase_box">
                    <svg width="100%" height="100%">
                        <defs>
                            <style type="text/css">
                                {`
                  @font-face {
                    font-family: "Proxima";
                    src: url('');
                  }
                `}
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
                        <g width="100%" height="100%" style={{ mask: "url(#mask)" }}>
                            <g ref={phrasesContainerRef} id="phrases"></g>
                        </g>
                    </svg>
                </div>
                <div id="ighex">
                    <div className="preloader loading">
                        <span className="slice"></span>
                        <span className="slice"></span>
                        <span className="slice"></span>
                        <span className="slice"></span>
                        <span className="slice"></span>
                        <span className="slice"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextedLoader;
