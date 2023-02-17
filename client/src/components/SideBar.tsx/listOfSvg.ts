import lightHomeSvg from '../../assets/svg/menu/deselected/home.svg';
import lightInfoSvg from '../../assets/svg/menu/deselected/info.svg';
import lightRedSvg from '../../assets/svg/menu/deselected/red.svg';

import darkHomeSvg from '../../assets/svg/menu/selected/home.svg';
import darkInfoSvg from '../../assets/svg/menu/selected/info.svg';
import darkRedSvg from '../../assets/svg/menu/selected/red.svg';

export const listOfSvg: IProps[] = [
    {
        id: 0,
        name: 'Home',
        svgLight: lightHomeSvg,
        svgDark: darkHomeSvg
    },
    {
        id: 1,
        name: 'Info',
        svgLight: lightInfoSvg,
        svgDark: darkInfoSvg
    },
    {
        id: 2,
        name: 'Red',
        svgLight: lightRedSvg,
        svgDark: darkRedSvg,
    }
];

interface IProps {
    id: number;
    name: string;
    svgLight: string;
    svgDark: string;
};