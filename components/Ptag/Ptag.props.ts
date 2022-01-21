import { ReactNode, DetailedHTMLProps,HTMLAttributes } from 'react';

export interface PtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	size: 'l' | 'm' | 's';
	children: ReactNode;
}