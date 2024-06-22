import styles from "./editableBlock.module.scss";

export default function EditableBlock({
	ref,
	value
}: {
	ref: React.RefObject<HTMLDivElement>;
	value: null | string
}) {
	return (
		<div
			content={ref?.current?.textContent ?? ""}
			contentEditable='true'
			className={styles.input}
			ref={ref}
			suppressContentEditableWarning={true}
		/>
	);
}
