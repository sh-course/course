export const RECEIVE_ALL_POKEMON    = 'RECEIVE_ALL_POKEMON';
export const RECEIVE_SINGLE_POKEMON = 'RECEIVE_SINGLE_POKEMON';
export const START_LOADING_ALL_POKEMON    = 'START_LOADING_ALL_POKEMON';
export const START_LOADING_SINGLE_POKEMON = 'START_LOADING_SINGLE_POKEMON';
export const CREATE_POKEMON         = 'CREATE_POKEMON';
export const RECEIVE_NEW_POKEMON    = 'RECEIVE_NEW_POKEMON';
export const RECEIVE_POKEMON_ERRORS = 'RECEIVE_POKEMON_ERRORS';

import * as APIUtil from '../util/api_util';

export const fetchAllPokemon = () => dispatch => {
	dispatch(startLoadingAllPokemon());
	return APIUtil.getAllPokemon()
		.then(pokemon => dispatch(receiveAllPokemon(pokemon)));
}

export const fetchSinglePokemon = id => dispatch => {
	dispatch(startLoadingSinglePokemon());
	return APIUtil.getSinglePokemon(id).then(pokemon => {
		dispatch(receiveSinglePokemon(pokemon))
		return pokemon;
	});
}

export const createPokemon = pokemon => dispatch => (
	APIUtil.postPokemon(pokemon).then(pokemon => {
		dispatch(receiveNewPokemon(pokemon));
		return pokemon;
	}, err => {
		dispatch(receivePokemonErrors(err.responseJSON));
	})
);

export const startLoadingAllPokemon = () => ({
	type: START_LOADING_ALL_POKEMON
});

export const startLoadingSinglePokemon = () => ({
	type: START_LOADING_SINGLE_POKEMON
});

export const receiveAllPokemon = pokemon => ({
	type: RECEIVE_ALL_POKEMON,
	pokemon
});

export const receiveSinglePokemon = pokemon => ({
	type: RECEIVE_SINGLE_POKEMON,
	pokemon
});

export const receiveNewPokemon = pokemon => ({
	type: RECEIVE_NEW_POKEMON,
	pokemon
});

export const receivePokemonErrors = errors => ({
	type: RECEIVE_POKEMON_ERRORS,
	errors
});
