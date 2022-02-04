import { SortEnum, SortProps } from "./Sort.props";
import SortIcon from './sort.svg';
import cn from 'classnames';
import styles from './Sort.module.css';
import { KeyboardEvent } from "react";

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {

	const sortOnKeyDown = (key: KeyboardEvent, sortType: SortEnum) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			setSort(sortType);
		}
	};

	return (
		<div className={cn(styles.sort, className)} {...props}>
			<span
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating
				})}
				onKeyDown={(key: KeyboardEvent) => sortOnKeyDown(key, SortEnum.Rating)}
				tabIndex={0}
			>
				<SortIcon className={styles.sortIcon} /> По рейтингу
			</span>
			<span
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price
				})}
				onKeyDown={(key: KeyboardEvent) => sortOnKeyDown(key, SortEnum.Price)}
				tabIndex={0}
			>
				<SortIcon className={styles.sortIcon} /> По цене
			</span>
		</div>
	);
};