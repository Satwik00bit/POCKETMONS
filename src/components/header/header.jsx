import React from 'react';
import styles from './header.module.scss';
import {useSelector} from "react-redux";
import {AiOutlineUser} from "react-icons/ai";
import {ImCoinDollar} from "react-icons/im";

function Header(props) {
	const name = useSelector(state => state.profile.name);
	const elo = useSelector(state => state.profile.elo);
	return (
		<div className={styles.header}>
			<div className={styles.user}><AiOutlineUser /> {name}</div>
			<div>POKETMONS</div>
			<div className={styles.elo}>
				<div className={styles.elo_count}>{elo}</div>
				<ImCoinDollar />
			</div>
		</div>
	);
}

export default Header;