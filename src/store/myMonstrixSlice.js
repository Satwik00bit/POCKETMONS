import {createSlice} from "@reduxjs/toolkit";
import {allMonstrix} from "../data/monstrixData";
import myMonstrix from "../components/myMonstrix/myMonstrix";


const myMonstrixSlice = createSlice({
	name: 'myMonstrix',
	initialState: {
		myMonstrix: [
			allMonstrix.find(elem => elem.name === 'Torracat'),
			allMonstrix.find(elem => elem.name === 'Haunter'),
			allMonstrix.find(elem => elem.name === 'Jirachi'),
			allMonstrix.find(elem => elem.name === 'Grimer'),
			allMonstrix.find(elem => elem.name === 'Morpeko'),
			allMonstrix.find(elem => elem.name === 'Reshiram'),
			allMonstrix.find(elem => elem.name === 'Totodile'),
			allMonstrix.find(elem => elem.name === 'Bronzor'),
			allMonstrix.find(elem => elem.name === 'Croagunk'),
			allMonstrix.find(elem => elem.name === 'Flaaffy'),
			allMonstrix.find(elem => elem.name === 'Gastly'),
			allMonstrix.find(elem => elem.name === 'Geodude'),
			allMonstrix.find(elem => elem.name === 'Lickitung'),
			allMonstrix.find(elem => elem.name === 'Mesprit'),
			allMonstrix.find(elem => elem.name === 'Noctowl'),
			allMonstrix.find(elem => elem.name === 'Vanillite'),
			allMonstrix.find(elem => elem.name === 'Bibarel'),
			allMonstrix.find(elem => elem.name === 'Cubone'),
			allMonstrix.find(elem => elem.name === 'Natu'),
			allMonstrix.find(elem => elem.name === 'Sneasel'),
			allMonstrix.find(elem => elem.name === 'Pachirisu'),
			allMonstrix.find(elem => elem.name === 'Kingler'),
			allMonstrix.find(elem => elem.name === 'Rhydon'),
			allMonstrix.find(elem => elem.name === 'Wartortle'),
			allMonstrix.find(elem => elem.name === 'Magby'),
			allMonstrix.find(elem => elem.name === 'Eiscue'),
			allMonstrix.find(elem => elem.name === 'Dewgong'),
			allMonstrix.find(elem => elem.name === 'Quaxly'),
			allMonstrix.find(elem => elem.name === 'Lillipup'),
			allMonstrix.find(elem => elem.name === 'Seel'),
			allMonstrix.find(elem => elem.name === 'Zangoose'),
			allMonstrix.find(elem => elem.name === 'Indeedee'),
			allMonstrix.find(elem => elem.name === 'Purugly'),
			allMonstrix.find(elem => elem.name === 'Teddiursa'),
			allMonstrix.find(elem => elem.name === 'Finizen'),
			allMonstrix.find(elem => elem.name === 'Murkrow'),
			allMonstrix.find(elem => elem.name === 'Ludicolo'),
			allMonstrix.find(elem => elem.name === 'Sunflora'),
			allMonstrix.find(elem => elem.name === 'Raichu'),
			allMonstrix.find(elem => elem.name === 'Nickit'),
			allMonstrix.find(elem => elem.name === 'Lycanroc'),
			allMonstrix.find(elem => elem.name === 'Pansage'),
			allMonstrix.find(elem => elem.name === 'Nidoqueen'),
			allMonstrix.find(elem => elem.name === 'Mawile'),
			allMonstrix.find(elem => elem.name === 'Wooper'),
			allMonstrix.find(elem => elem.name === 'Nidorina'),
			allMonstrix.find(elem => elem.name === 'Quilladin'),
			allMonstrix.find(elem => elem.name === 'Snubbull'),
			allMonstrix.find(elem => elem.name === 'Smoochum'),
			allMonstrix.find(elem => elem.name === 'Wobbuffet'),

		],
		monstrixGotANewLvl: null,
	},
	reducers: {
		levelUp(state, action){
			if (action.payload.id !== 0){
				let myMonster = state.myMonstrix.find(elem => elem.id === action.payload.id);
				myMonster.xp += action.payload.xp;
				if (myMonster.xp >= myMonster.lvl*100){
					myMonster.xp = myMonster.xp % (myMonster.lvl * 100);
					myMonster.hp = Math.ceil(myMonster.hp * 1.3);
					myMonster.damage = Math.ceil(myMonster.damage * 1.3);
					myMonster.protect = Math.ceil(myMonster.protect * 1.3);
						myMonster.lvl += 1;
					state.monstrixGotANewLvl = myMonster.id;
				}
			}
			else state.monstrixGotANewLvl = null;
		},
	},
});

export const {levelUp} = myMonstrixSlice.actions;

export default myMonstrixSlice.reducer;