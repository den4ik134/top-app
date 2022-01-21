import { TagProps } from "./Tag.props";
import cn from 'classnames';
import styles from './Tag.module.css';

export const Tag = ({ size = 's', children, color = 'ghost', href, className, ...props }: TagProps): JSX.Element => {
	return (
		<>
			<div
				className={cn(styles.tag, className, {
					[styles.m]: size == 'm',
					[styles.s]: size == 's',
					[styles.ghost]: color == 'ghost',
					[styles.gray]: color == 'gray',
					[styles.green]: color == 'green',
					[styles.primary]: color == 'primary',
					[styles.red]: color == 'red',
				})}
				{...props}
			>
				{
					href
						? <a href={href}>{children}</a>
						: <>{children}</>
				}

			</div>
		</>
	);
};