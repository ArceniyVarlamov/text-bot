import React, { useEffect, useRef, useState } from "react";
import styles from "@/App.module.scss";
import { useBot } from "@/hooks/useBot";
import { useRate } from "@/hooks/useRate";
import Header from "./layout/Header/Header";
import DefaultText from "./UI/DefaultText/DefaultText";

export default function TextSender() {
	const [inputValue, setInputValue] = useState<string | null>("");
	const [wantValue, setWantValue] = useState<string | null>("");
	const [GetInfo, setGetInfo] = useState<boolean>(false);
	const [flag, setFlag] = useState<boolean>(true);
	const inputRef = useRef<HTMLDivElement>(null);
	const wantRef = useRef<HTMLDivElement>(null);
	const {
		textData,
		error: textError,
		loading: textLoading,
		post: postText,
	} = useBot();
	const {
		rate,
		error: rateError,
		loading: rateLoading,
		post: postRate,
	} = useRate();

	useEffect(() => {
		if (wantValue && inputValue && GetInfo && flag) {
			postText(inputValue, wantValue);
			postRate(inputValue);
			setFlag(false);
		}
	}, [inputValue, GetInfo, flag]);

	useEffect(() => {
		console.log(textData, rate);
	}, [rate, textData]);

	const clickGetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		setWantValue(wantRef?.current?.textContent ?? "");
		setInputValue(inputRef?.current?.textContent ?? "");
		setGetInfo(true);
	};

	const clickResetHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setGetInfo(false);
		setWantValue("");
		setInputValue("");
		setFlag(true);
	};

	return (
		<>
			<Header />
			<div className={styles.text}>
				<DefaultText text='Введите текст:' />
				<div
					content={inputValue ?? ''}
					contentEditable='true'
					className={styles.input}
					ref={inputRef}
					suppressContentEditableWarning={true}
				/>
				<DefaultText text='Ваши пожелания:' />
				<div
					content={wantValue ?? ''}
					contentEditable='true'
					className={styles.input}
					ref={wantRef}
					suppressContentEditableWarning={true}
				/>
				<button className={styles.button} onClick={clickGetHandler}>
					Переделать текст
				</button>
				{!flag &&
					!textLoading &&
					!rateLoading &&
					!textError &&
					!rateError &&
					GetInfo && (
						<div className={styles.rate}>
							<div className={styles.ii}>Оценка присутсвия ии</div>
							<div className={styles.number}>
								{rate?.messages[0]?.content ?? "-"}
							</div>
						</div>
					)}
				{(textError || rateError) && <div className={styles.error}>Ошибка</div>}

				{(textLoading || rateLoading) && <div className={styles.loader} />}

				{!flag &&
					!textLoading &&
					!rateLoading &&
					!textError &&
					!rateError &&
					GetInfo && (
						<>
							<div className={styles.final}>Итоговый вариант:</div>
							<div className={styles.out}>
								{textData?.messages[0]?.content ?? "-"}
							</div>
						</>
					)}
				{((!flag &&
					!textLoading &&
					!rateLoading &&
					!textError &&
					!rateError &&
					GetInfo) ||
					textError ||
					rateError) && (
					<div
						className={styles.reset}
						title='заново'
						onClick={clickResetHandler}
					>
						<p>Заново</p>
					</div>
				)}
			</div>
		</>
	);
}
