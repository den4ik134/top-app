import { ProductProps } from "./Product.props";
import cn from 'classnames';
import { useState } from 'react';
import styles from './Product.module.css';
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { declOfNum, numSplitter } from "../../helpers/helpers";
import { Divider } from "../Divider/Divider";
import Image from 'next/image';
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

	return (
		<>
			<Card className={styles.product}>
				<div
					className={styles.logo}
				>
					<Image
						src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>

				<div className={styles.title}>
					{product.title}
				</div>

				<div
					className={styles.price}
				>
					{numSplitter(product.price, true)}
					{product.oldPrice && <Tag color='green' className={styles.oldPrice}>{numSplitter(product.price - product.oldPrice, true)}</Tag>}
				</div>

				<div
					className={styles.credit}
				>
					{numSplitter(product.credit, true)}<span>/мес</span>
				</div>

				<div
					className={styles.rating}
				>
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>

				<div
					className={styles.tags}
				>
					{product.categories.map(c => <Tag key={c} className={styles.category} color='ghost'>{c}</Tag>)}
				</div>

				<div className={styles.priceTitle}>цена</div>

				<div className={styles.creditTitle}>кредит</div>

				<div className={styles.rateTitle}>
					{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
				</div>

				<Divider className={styles.hr} />

				<div className={styles.description}>{product.description}</div>

				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div key={c.name} className={styles.characteristics}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>

						</div>
					))}
				</div>

				<div className={styles.advBlock}>

					{product.advantages && <div className={cn(styles.advantages, {
						[styles.mb20]: product.disadvantages
					})}>
						<div className={styles.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>}

					{product.disadvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						<div>{product.disadvantages}</div>
					</div>}
				</div>

				<Divider className={cn(styles.hr, styles.hr2)} />

				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						appearance='ghost'
						arrow={!isReviewOpened ? 'right' : 'down'}
						className={styles.reviewButton}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<Card color='blue' className={cn(styles.reviews, {
				[styles.opened]: isReviewOpened,
				[styles.closed]: !isReviewOpened
			})}>
				{product.reviews.map(r => (
					<div key={r._id}>
						<Review review={r} />
						<Divider />
					</div>
				))}
				<ReviewForm productId={product._id} />
			</Card>
		</>	
	);
};