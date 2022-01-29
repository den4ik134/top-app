import { TextAreaProps } from "./TeaxtArea.props";
import cn from 'classnames';
import styles from './TextArea.module.css';

export const TextArea = ({ className, ...props }: TextAreaProps): JSX.Element => {
	return <textarea className={cn(className, styles.textarea)} {...props} />;
};