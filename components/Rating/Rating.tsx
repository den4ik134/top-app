import { RatingProps } from "./Rating.props";
import cn from 'classnames';
import styles from './Rating.module.css';
import StarIcon from './star.svg';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from "react";

export const Rating = forwardRef(({ isEditable = false, rating, setRating, error, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
	const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

	useEffect(() => {
		constructRating(rating);
	}, [rating, tabIndex]);

	const computeFocus = (r: number, i: number): number => {
		if (!isEditable) {
			return -1;
		}

		if (!r && i == 0) {
			return tabIndex ?? 0;
		}

		if (r == i + 1) {
			return tabIndex ?? 0;
		}
		return -1;
	};

	const constructRating = (currentRating: number) => {
		const updatetdArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<span
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable
					})}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onClick(i + 1)}
					tabIndex={computeFocus(rating, i)}
					onKeyDown={handleKey}
					ref={r => ratingArrayRef.current?.push(r)}
					role={isEditable ? "slider" : ""}
					aria-valuenow={rating}
					aria-invalid={error ? true : false}
					aria-valuemax={5}
					aria-label={isEditable ? 'Укажите рейтинг стрелками вверх или вниз' : ('рейтинг' + rating)}
					aria-valuemin={1}
				>
					<StarIcon />
				</span>
			);
		});
		setRatingArray(updatetdArray);
	};

	const changeDisplay = (i: number) => {
		if (!isEditable) {
			return;
		}
		constructRating(i);
	};

	const onClick = (i: number) => {
		if (!isEditable || !setRating) {
			return;
		}
		setRating(i);
	};

	const handleKey = (e: KeyboardEvent<HTMLSpanElement>) => {
		if (!isEditable || !setRating) {
			return;
		}
		if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
			e.preventDefault();
			if (!rating) {
				setRating(1);
			} else {
				setRating(rating < 5 ? rating + 1 : 5);
			}
			ratingArrayRef.current[rating]?.focus();
		}
		if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
			e.preventDefault();
			if (rating < 1) {
				setRating(0);
			} else {
				setRating(rating > 1 ? rating - 1 : 1);
			}
			ratingArrayRef.current[rating - 2]?.focus();
		}
	};

	return (
		<div {...props} className={cn({
			[styles.error]: error
		})} ref={ref}>
			{ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
			{error && <span role={'alert'} className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
});