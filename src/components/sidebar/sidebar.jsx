import React from 'react';
import styles from './sidebar.module.scss';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function Sidebar(props) {

	return (
		<div className={styles.sidebar}>
			<NavLink to={'/arena'}>{'Arena'}</NavLink>
			<NavLink to={'/my_monstrix'}>{'My Pokemons'}</NavLink>
			<NavLink to={'/about'}>{'About'}</NavLink>
		</div>
	);
}

export default Sidebar;