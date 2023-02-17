import { MouseEvent, useState } from "react";
import { listOfSvg } from "./listOfSvg";
import settingsDark from "../../assets/svg/menu/selected/settings.svg";

interface Selected {
    id: number;
    selected: boolean;
};


const SideBar = () => {

    const [selected, setSelected] = useState<Selected>({ id: 0, selected: true });

    const handleSelect = (event: MouseEvent) => {
        const id = parseInt(event.currentTarget.id);
        setSelected({ id: id, selected: true });
    };


    return (
        <ul className="menu w-60 p-2 pl-0 mt-20">
            {
                listOfSvg.map((item) => {
                    return (
                        <li key={item.id}>
                            <a id={`${item.id}`} className={`pl-10 ${selected.id === item.id && selected.selected && "active"}`} onClick={handleSelect}>
                                <img className="h-5 w-5 mr-2" src={selected.id === item.id && selected.selected ? item.svgDark : item.svgLight} alt={item.name} />
                                {item.name}
                            </a>
                        </li>
                    );
                })
            }
            <div className="pl-10 dropdown dropdown-top mt-56">
                <label tabIndex={0} className="btn bg-primary m-1">
                    <img className="h-5 w-5 mr-2" src={settingsDark} alt="exit" />
                    Settings
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 bg-base-200 rounded-box w-52">
                    <li><a>Perfil</a></li>
                    <li><a>Planes de Estudio</a></li>
                </ul>
            </div>
        </ul>
    );
};
export default SideBar;