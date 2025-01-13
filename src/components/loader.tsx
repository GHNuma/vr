import React, { useEffect, useRef } from "react";

const TextedLoader: React.FC = () => {
    const phrasesContainerRef = useRef<SVGGElement | null>(null);
    const checkmarkIdPrefix = "loadingCheckSVG-";
    const checkmarkCircleIdPrefix = "loadingCheckCircleSVG-";
    const verticalSpacing = 50;

    const phrases = [
        "Поднимаем стены",
        "Размышление о пустоте",
        "Чистовая отделка",
        "Добавляем интерьер",
        "Оптимизация освещения",
        "Корректировка светотеней",
        "Рассмотрение альтернатив",
        "Добавляем персонажа",
        "Извлечение данных",
        "Последние штрихи в отделке",
        "Финишная обработка",
        "Проверка функционала",
        "Готовим квартиру к сдаче",
    ];

    const shuffleArray = (array: string[]): string[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const createSVG = (tag: string, properties: Record<string, string>, optChildren?: SVGElement[]): SVGElement => {
        const newElement = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (const prop in properties) {
            newElement.setAttribute(prop, properties[prop]);
        }
        if (optChildren) {
            optChildren.forEach((child) => {
                newElement.appendChild(child);
            });
        }
        return newElement;
    };

    const createPhraseSvg = (phrase: string, yOffset: number): SVGElement => {
        const text = createSVG("text", {
            fill: "white",
            x: "50",
            y: yOffset.toString(),
            "font-size": "18",
            "font-family": "Arial",
        });
        text.textContent = `${phrase}...`;
        return text;
    };

    const createCheckSvg = (yOffset: number, index: number): SVGElement => {
        const check = createSVG("polygon", {
            points:
                "21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708 ",
            fill: "rgba(255,255,255,1)",
            id: checkmarkIdPrefix + index,
        });

        const circleOutline = createSVG("path", {
            d:
                "M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z",
            fill: "white",
        });

        const circle = createSVG("circle", {
            id: checkmarkCircleIdPrefix + index,
            fill: "rgba(255,255,255,0)",
            cx: "16",
            cy: "16",
            r: "15",
        });

        return createSVG(
            "g",
            {
                transform: `translate(10 ${yOffset - 20}) scale(.9)`,
            },
            [circle, check, circleOutline]
        );
    };

    const addPhrasesToDocument = (phrases: string[]) => {
        if (!phrasesContainerRef.current) return;
        phrases.forEach((phrase, index) => {
            const yOffset = 30 + verticalSpacing * index;
            phrasesContainerRef.current?.appendChild(createPhraseSvg(phrase, yOffset));
            phrasesContainerRef.current?.appendChild(createCheckSvg(yOffset, index));
        });
    };

    const easeInOut = (t: number): number => {
        const period = 200;
        return (Math.sin(t / period + 100) + 1) / 2;
    };

    useEffect(() => {
        const shuffledPhrases = shuffleArray(phrases);
        addPhrasesToDocument(shuffledPhrases);

        const upwardMovingGroup = phrasesContainerRef.current as SVGGElement & { currentY?: number };
        upwardMovingGroup.currentY = 0;

        const checks = shuffledPhrases.map((_, i) => {
            const checkElement = document.getElementById(checkmarkIdPrefix + i);
            const circleElement = document.getElementById(checkmarkCircleIdPrefix + i);

            if (checkElement instanceof SVGPolygonElement && circleElement instanceof SVGCircleElement) {
                return {
                    check: checkElement,
                    circle: circleElement,
                };
            }

            // Если элемент не найден или имеет неправильный тип, возвращаем null
            return null;
        }).filter((item): item is { check: HTMLElement & SVGPolygonElement; circle: HTMLElement & SVGCircleElement } => item !== null);


        let startTime = Date.now();

        const animateLoading = () => {
            const now = Date.now();
            upwardMovingGroup.setAttribute(
                "transform",
                `translate(0 ${upwardMovingGroup.currentY})`
            );
            upwardMovingGroup.currentY = (upwardMovingGroup.currentY || 0) - 1.35 * easeInOut(now);

            checks.forEach((check, i) => {
                const colorChangeBoundary = -i * verticalSpacing + verticalSpacing + 15;
                if ((upwardMovingGroup.currentY || 0) < colorChangeBoundary) {
                    const alpha = Math.max(
                        Math.min(
                            1 - ((upwardMovingGroup.currentY || 0) - colorChangeBoundary + 15) / 30,
                            1
                        ),
                        0
                    );
                    check?.circle.setAttribute("fill", `rgba(255, 255, 255, ${alpha})`);
                    const checkColor = [
                        Math.round(255 * (1 - alpha) + 120 * alpha),
                        Math.round(255 * (1 - alpha) + 154 * alpha),
                    ];
                    check?.check.setAttribute(
                        "fill",
                        `rgba(255, ${checkColor[0]}, ${checkColor[1]}, 1)`
                    );
                }
            });

            if (now - startTime < 30000 && (upwardMovingGroup.currentY || 0) > -710) {
                requestAnimationFrame(animateLoading);
            } else {
                upwardMovingGroup.currentY = 0;
                if (phrasesContainerRef.current) {
                    phrasesContainerRef.current.innerHTML = ""; // Очистка старых фраз
                    addPhrasesToDocument(shuffleArray([...phrases])); // Добавление новых фраз
                }
                startTime = Date.now();
                animateLoading();
            }
        };

        animateLoading();

        return () => {
            if (phrasesContainerRef.current) {
                phrasesContainerRef.current.innerHTML = ""; // Очистка при размонтировании
            }
        };
    }, []);

    return (
        <div
            id="loader-wrapper"
            className="!w-screen !flex !justify-center !items-center"
        >
            <div id="page" className="!w-full !flex !justify-center !items-center">
                <div id="phrase_box" className="!w-full !flex !justify-center !items-center">
                    <svg height="100%" className="!flex !justify-center !items-center">
                        <defs>
                            <style type="text/css">
                                {`
                  @font-face {
                    font-family: "Proxima";
                    src: url('');
                  }
                `}
                            </style>
                            <mask
                                id="mask"
                                maskUnits="userSpaceOnUse"
                                maskContentUnits="userSpaceOnUse"
                                className="!w-full"
                            >
                                <linearGradient
                                    id="linearGradient"
                                    gradientUnits="objectBoundingBox"
                                    x2="0"
                                    y2="1"
                                    className="!w-full"
                                >
                                    <stop stopColor="white" stopOpacity="0" offset="0%" />
                                    <stop stopColor="white" stopOpacity="1" offset="30%" />
                                    <stop stopColor="white" stopOpacity="1" offset="70%" />
                                    <stop stopColor="white" stopOpacity="0" offset="100%" />
                                </linearGradient>
                                <rect width="100%" height="100%" fill="url(#linearGradient)" />
                            </mask>
                        </defs>
                        <g
                            style={{ mask: "url(#mask)" }}
                            className="!w-full !flex !justify-center !items-center"
                        >
                            <g
                                ref={phrasesContainerRef}
                                id="phrases"
                                className="!w-full !flex !justify-center !items-center"
                            ></g>
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
