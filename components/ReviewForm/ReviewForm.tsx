import { ReviewFormProps } from "./ReviewForm.props";
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm } from "./ReviewForm.interface";

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {

	const { register, control, handleSubmit, formState: { errors } } = useForm<IReviewForm>();

	const onSubmit = (data: IReviewForm) => {
		console.log(data);
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
							<Rating isEditable rating={field.value} error={errors.rating} ref={field.ref} setRating={field.onChange} />
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
				/>
				<div className={styles.submit}>
					<Button className={styles.button} appearance='primary'>Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв отправлен.</div>
				<div className={styles.successDescription}>
					Спасибо, ваш отзыв будет опубликован после проверки!
				</div>
				<CloseIcon className={styles.close} />
			</div>
		</form>
	);
};