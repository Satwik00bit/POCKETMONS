import React from 'react';
import styles from "../mainPage/mainPage.module.scss";
import {AiOutlineGithub} from "react-icons/ai";
import{AiOutlineLinkedin} from "react-icons/ai";
import {useSelector} from "react-redux";

function MainPage(props) {
	return (
		<>
			<div className={styles.title}>{'Welcome to the POKeMON game!'}</div>
			<div className={styles.content_wrapper}>
				<div className={styles.about_game}>
					{
						<div>
							This is my React-game about Pokemon battles!
							<br/>You can fight, heal, and upgrade mons!
							<br/>The goal of the game is to beat all the mons!
							<br/>Good luck!
						</div>
					}
				</div>
				<div className={styles.contacts_block}>
					{
						<div>
							Author: Satwik Chaudhary
							<br/>My contacts:
						</div>
					}
					<div className={styles.social_network}>
						<a href='https://github.com/Satwik00bit'><AiOutlineGithub /></a>
						<a href='https://linkedin.com/in/satwik-chaudhary'><AiOutlineLinkedin /></a>
					</div>

				</div>
			</div>

		</>
	);
}

export default MainPage;