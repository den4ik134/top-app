import { TextAreaProps } from "./TeaxtArea.props";
import cn from 'classnames';
import styles from './TextArea.module.css';
import { ForwardedRef, forwardRef } from "react";

export const TextArea = forwardRef(({ error, className, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return (
		<div className={cn(className, styles.textareaWrapper)}>
			<textarea className={cn(styles.textarea, {
				[styles.error]: error
			})} ref={ref} {...props} />
			{error && <span role={'alert'} className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
});