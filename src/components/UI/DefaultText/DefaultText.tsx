import styles from './defaultText.module.scss'

export default function DefaultText({text}: {text: string}) {
  return (
    <div className={styles.final}>{text}</div>
  )
}
