import styles from './editableBlock.module.scss'

export default function EditableBlock({ref}: {ref: React.LegacyRef<HTMLDivElement>}) {
	return (
		<div
			contentEditable='true'
			className={styles.input}
			ref={ref}
			suppressContentEditableWarning={true}
		/>
	);
}
