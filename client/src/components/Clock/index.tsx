import { useEffect, useRef } from "react";

const Clock = () => {

    const clockRef = useRef<HTMLHeadingElement>({ innerHTML: "" } as HTMLHeadingElement);
    const time = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const dayName = date.toLocaleString("es-MX", { weekday: "long" });
        const day = date.getDate();
        return `${dayName[0].toUpperCase()}${dayName.slice(1)} ${day} - ${hours}:${minutes}hs`;
    }
    useEffect(() => {
        const clockInterval = setInterval(() => {
            clockRef.current.innerHTML = `${time()}`;
        }, 1000);
        return () => clearInterval(clockInterval);
    }, []);

    return (
        <h1 ref={clockRef}>{time()}</h1>
    );
};
export default Clock;