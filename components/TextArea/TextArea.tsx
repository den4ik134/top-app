import { TextAreaProps } from "./TeaxtArea.props";
import cn from 'classnames';
import styles from './TextArea.module.css';
import { ForwardedRef, forwardRef } from "react";

export const TextArea = forwardRef(({ className, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return <textarea className={cn(className, styles.textarea)} ref={ref} {...props} />;
});