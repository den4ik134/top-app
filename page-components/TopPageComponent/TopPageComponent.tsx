import { TopPageComponentProps } from "./TopPageComponent.props";
import cn from 'classnames';
import styles from './TopPageComponent.module.css';
import { Advantages, HhData, Htag, Ptag, Tag } from "../../components";
import { TopLevelCategory } from "../../interfaces/page.interface";

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag="h1">{page.title}</Htag>
				{products && <Tag color='gray' size="m">{products.length}</Tag>}
				<span>Сортировка</span>
			</div>
			<div>
				{products && products.map(p => (<div key={p._id}>{p.title}</div>))}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag="h2">Вакансии - {page.category}</Htag>
				<Tag color="red" size="m">hh.ru</Tag>
			</div>
			{firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
			<Htag tag='h2'>Преимущества</Htag>
			{page.advantages && page.advantages.length > 0 && <>
				<Advantages advantages={page.advantages} />
			</>}
			{page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
			<Htag tag='h2'>Получаемые навыки</Htag>
			{page.tags && page.tags.map(tag => (<Tag key={tag} size='s' color='primary'>{tag}</Tag>))}
		</div>
	);
};