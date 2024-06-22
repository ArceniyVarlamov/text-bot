import logo from "@/images/Хомяки логотип.png";
import styles from "./header.module.scss";

export default function Header() {
	return (
		<div className={styles.header}>
			<img src={logo} alt='HamstersAI' className={styles.logo}></img>
			<div className={styles.id}>
				ID пользователя: {localStorage.getItem("userKey")}
			</div>
		</div>
	);
}
