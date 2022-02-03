import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import up from './arrowUpIcon.svg';
import close from './closeIcon.svg';
import menu from './burgerIcon.svg';

export const icons = {
	up,
	close,
	menu
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	appearance: 'primary' | 'white';
	icon: IconName;
}