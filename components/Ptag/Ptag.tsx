import { PtagProps } from "./Ptag.props";
import cn from 'classnames';
import styles from './Ptag.module.css';

export const Ptag = ({ size = 'm', children, className, ...props }: PtagProps): JSX.Element => {
	return (
		<>
			<p
				className={cn(styles.p, className, {
					[styles.l]: size == 'l',
					[styles.m]: size == 'm',
					[styles.s]: size == 's'
				})}
				{...props}
			>
				{children}
			</p>
		</>
	);
};