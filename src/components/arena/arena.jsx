import React, {memo, useEffect, useState} from 'react';
import styles from './arena.module.scss';
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import {makeModal} from "../common/modal/modal";
import MonstrixCard from "../monstrix/monstrixCard/monstrixCard";
import {GiBroadsword, GiHealthNormal} from "react-icons/gi";
import {TbDog} from "react-icons/tb";
import {BiRun} from "react-icons/bi";
import {setElo} from "../../store/profileSlice";
import {setNotification} from "../common/notification/makeNotification";
import {changeEnemy, changeFightLog, changeMyMonster, endFight} from "../../store/arenaSilce";
import {addNewMonster, levelUp} from "../../store/myMonstrixSlice";

function Arena(props) {
	const dispatch = useDispatch();
	const elo = useSelector(state => state.profile.elo);
	const myMonster = useSelector(state => state.arena.myMonster);
	const enemy = useSelector(state => state.arena.enemy);
	const fightLog = useSelector(state => state.arena.fightLog);
	const myMonstrix = useSelector(state => state.myMonstrix.myMonstrix);
	const lg = useSelector(state => state.profile.language);

	const [endFightModalIsOpen, setEndFightModalIsOpen] = useState(false);
	const [tameModalIsOpen, setTameModalIsOpen] = useState(false);
	const [leaveModalIsOpen, setLeaveModalIsOpen] = useState(false);
	const [healModalIsOpen, setHealModalIsOpen] = useState(false);
	const [cardIsOpen, setCardIsOpen] = useState(false);
	const [idOpenCard, setIdOpenCard] = useState(null);



	const [attackButtonIsDisables, setAttackButtonIsDisables] = useState(false);
	const [myMonsterIsAttack, setMyMonsterIsAttack] = useState(false);
	const [EnemyIsAttack, setEnemyIsAttack] = useState(false);
	const [fightResult, setFightResult] = useState('');

	const randomIntFromInterval = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const damageWithRandom = (damage) => {
		let rand = randomIntFromInterval(damage * -1, damage);
		return damage + Math.ceil(rand * 0.5);
	}

	const healMyMonster = () => {
		setHealModalIsOpen(true);
	}

	const tryToTame = () => {
		setTameModalIsOpen(true);
	}

	const leave = () => {
		setLeaveModalIsOpen(true);
	}

	const myMonsterAttacks = () => {
		let tempLog = {};
		setAttackButtonIsDisables(true);
		setMyMonsterIsAttack(true);
		setTimeout(() => {
			setMyMonsterIsAttack(false);
			let damage = damageWithRandom(myMonster.damage);
			dispatch(changeEnemy({enemy: {...enemy, hp: (enemy.hp - damage < 0 ? 0 : enemy.hp - damage)}}))
			tempLog = {id: fightLog.length + 1, name: myMonster.name, event: (`did ${damage} damage`)};
			dispatch(changeFightLog({fightLog: [...fightLog, tempLog]}));
			setEnemyIsAttack(true);
			enemyMonsterAttacks(tempLog);
		}, 1000);
	}

	const enemyMonsterAttacks = (tempLog) => {
		setTimeout(() => {
			setAttackButtonIsDisables(false);
			setEnemyIsAttack(false);
			let damage = damageWithRandom(enemy.damage);
			dispatch(changeMyMonster({myMonster: {...myMonster, hp: (myMonster.hp - damage < 0 ? 0 : myMonster.hp - damage)}}));
			dispatch(changeFightLog({fightLog: [...fightLog, tempLog, {id: fightLog.length + 2, name: enemy.name, event: (`did ${damage} damage`)}]}));

			// setFightResult('draw');
			// setEndFightModalIsOpen(true);
		}, 1000);
	}

	useEffect(() => {
		// console.log(`${myMonster.hp} - my hp`);
		// console.log(`${enemy.hp} - enemy hp`);
		if (!attackButtonIsDisables){
			if (myMonster.hp === 0 && enemy.hp === 0){
				setFightResult('draw');
				setEndFightModalIsOpen(true);
			}
			else{
				if (myMonster.hp === 0){
					setFightResult('lose');
					setEndFightModalIsOpen(true);
				}
				else{
					if (enemy.hp === 0){
						setFightResult('win');
						setEndFightModalIsOpen(true);
					}
				}
			}
		}
	}, [attackButtonIsDisables]);



	const CardModal = makeModal(MonstrixCard,
		{green: {status: false}, red: {status: false}, close: true},
		('Monstrix card'), setCardIsOpen);

	const HealMonster = () => {
		return (
			<div>
				{
					<div>
						Add 50 health to your monster?
						
					</div>
				}
			</div>
		);
	}
	const HealModal = makeModal(HealMonster,
		{green: {status: true, text: ('Yes')}, red: {status: true, text: ('No')}, close: true},
		('Heal your Pokemon?'),
		setHealModalIsOpen, () => {
			
			dispatch(changeMyMonster({myMonster: {...myMonster, hp: myMonster.hp + 50}}));
			setHealModalIsOpen(false);
			setNotification(dispatch, 'success', ('health replenished'));
			
		});


	const Leave = () => {
		return (
			<div>
				{
					<div>
						Do you really want to leave the fight?
						<br/>It would mean that you lose!
					</div>
				}
			</div>
		);
	}
	const LeaveModal = makeModal(Leave,
		{green: {status: true, text: ('Yes')}, red: {status: true, text: ('No')}, close: true},
		('Leave the fight?'),
		setLeaveModalIsOpen, () => {
			dispatch(endFight({leave: true}));
			setNotification(dispatch, 'success', ('you fled away!'));
		});

	const EndOfFight = () => {
		return (
			<div>
				{fightResult === 'win' &&
					( `You got +50 elo and ${enemy.lvl * 50} xp!`)
				}
				{fightResult === 'draw' &&
					( `You got +0 elo and ${enemy.lvl * 25} xp!`)
				}
				{fightResult === 'lose' &&
					(`Oops! You lose -20 elo!`)
				}
			</div>
		);
	}
	const EndOfFightModal = makeModal(EndOfFight,
		{green: {status: true, text: ('OK')}, red: {status: false}, close: false},
		(fightResult === 'draw' ? ('DRAW') : fightResult === 'win' ? ('YOU WIN') : fightResult === 'lose' && ('YOU LOSE')),
		setEndFightModalIsOpen, () => {
			if (fightResult === 'win'){
				dispatch(endFight({}));
				dispatch(setElo({elo: elo + 50}));
				dispatch(levelUp({id: myMonster.id, xp: enemy.lvl * 50}));
			}
			if (fightResult === 'draw'){
				dispatch(endFight({}));
				dispatch(levelUp({id: myMonster.id, xp: enemy.lvl * 25}));
			}
			if (fightResult === 'lose'){
				dispatch(setElo({elo: elo - 20}));
				dispatch(endFight({lose: true}));
			}

			setEndFightModalIsOpen(false);
		});

	return (
		<div>
			{endFightModalIsOpen && <EndOfFightModal/> }
			{cardIsOpen && <CardModal id={idOpenCard} isMyMonster={idOpenCard === myMonster.id}/> }
			{healModalIsOpen && <HealModal/> }
			{leaveModalIsOpen && <LeaveModal/> }

			<div className={styles.title}>{'Arena'}</div>
			<div className={styles.main_container}>
				<div className={styles.fight_block}>
					<div className={styles.cards_block}>

						<div className={styles.my_card_block}>
							<div className={cn(styles.my_card, (myMonsterIsAttack && styles.my_monster_is_attack))}
							     onClick={() => { setCardIsOpen(true); setIdOpenCard(myMonster.id); }}
							>
								<img className={styles.monster_image} src={myMonster.image} alt={'monster_img'}/>
								{myMonster.name}
								<div>{myMonster.hp}</div>
							</div>
						</div>

						<div className={styles.enemy_card_block}>
							<div className={cn(styles.enemy_card, (EnemyIsAttack && styles.enemy_is_attack))}
							     onClick={() => { setCardIsOpen(true); setIdOpenCard(enemy.id); }}
							>
								<img className={styles.monster_image} src={enemy.image} alt={'monster_img'}/>
								{enemy.name}
								<div>{enemy.hp}</div>
							</div>
						</div>

					</div>
					<div className={styles.button_block}>
						<button
							className={!attackButtonIsDisables ? styles.button_attack : styles.disabled_button}
							onClick={myMonsterAttacks}
							disabled={attackButtonIsDisables}
						><GiBroadsword/>{'Attack'}</button>
						<div className={styles.stuff_buttons_block}>
							<button
								className={!attackButtonIsDisables ? styles.button_heal : styles.disabled_button}
								onClick={healMyMonster}
								disabled={attackButtonIsDisables}
							><GiHealthNormal/>{'Heal'}</button>
							<button
								className={!attackButtonIsDisables ? styles.button_leave : styles.disabled_button}
								onClick={leave}
								disabled={attackButtonIsDisables}
							><BiRun/>{'Leave'}</button>
						</div>
					</div>
				</div>


				<div className={styles.fight_log_block}>
					<div className={styles.log_title}>{'Fight log'}</div>
					<div className={styles.log}>
						{fightLog.map(elem =>
							<div className={styles.log_elem} key={elem.id}>{elem.id} {elem.name}: {elem.event}</div>)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Arena);