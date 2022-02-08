import { ReviewFormProps } from "./ReviewForm.props";
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSendResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";
import { useState } from "react";

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {

	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setIsError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, { ...formData, productId });
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setIsError('Что-то пошло не так.');
			}
		} catch (e) {
			if (e instanceof Error) {
				setIsError(e.message);
			}

		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', {
						required: {
							value: true,
							message: 'Заполните имя'
						}
					})}
					error={errors.name}
					placeholder="Имя"
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', {
						required: {
							value: true,
							message: 'Укажите заголовок'
						}
					})}
					className={styles.title}
					error={errors.title}
					placeholder="Заголовок отзыва"
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name="rating"
						rules={{
							required: {
								value: true,
								message: 'Поставьте оценку'
							}
						}}
						render={({ field }) => (
							<Rating
								isEditable
								rating={field.value}
								error={errors.rating}
								ref={field.ref}
								setRating={field.onChange}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<TextArea
					{...register('description', {
						required: {
							value: true,
							message: 'Пожалуйста, напишите свой отзыв'
						}
					})}
					error={errors.description}
					className={styles.description}
					placeholder="Текст отзыва"
					tabIndex={isOpened ? 0 : -1}
					aria-label="Текст отзыва"
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button
						className={styles.button}
						appearance='primary'
						tabIndex={isOpened ? 0 : -1}
						onClick={() => clearErrors()}
					>
						Отправить
					</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccess && <div className={cn(styles.panel, styles.success)} role='alert'>
				<div
					className={styles.successTitle}
				>
					Ваш отзыв отправлен.
				</div>
				<div className={styles.successDescription}>
					Спасибо, ваш отзыв будет опубликован после проверки!
				</div>
				<button
					className={styles.close}
					onClick={() => setIsSuccess(false)}
					aria-label="Закрыть оповещение"
				>
					<CloseIcon />
				</button>
			</div>}
			{error && <div
				className={cn(styles.panel, styles.error)}
				role="alert"
			>
				Что-то пошло не так, попробуйте обновить страницу!
				<button
					className={styles.close}
					onClick={() => setIsError(undefined)}
					aria-label="Закрыть оповещение"
				>
					<CloseIcon />
				</button>
			</div>}
		</form>
	);
};