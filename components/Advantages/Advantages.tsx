import { AdvantagesProps } from "./Advantages.props";
import cn from 'classnames';
import styles from './Advantages.module.css';
import CheckIcon from './check.svg';
import { Ptag } from "../Ptag/Ptag";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map(a => {
				return (
					<div key={a._id} className={cn(styles.advantagesItem)}>
						<div className={styles.checkBlock}>
							<CheckIcon />
						</div>
						<div className={styles.title}>{a.title}</div>
						<div className={styles.border}></div>
						<Ptag size='l'>
							{a.description}
						</Ptag>
					</div>
				);
			})}
		</>
	);
};