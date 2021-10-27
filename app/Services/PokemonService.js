import {
  ProxyState
} from "../AppState.js";
import {
  Pokemon
} from "../Models/Pokemon.js";
import {
  pokeApi,
  sandboxApi
} from "./AxiosService.js";

class PokemonService {


  async getPokemon() {
    const response = await pokeApi.get('')
    ProxyState.apiPokemon = response.data.results
    console.log(ProxyState.apiPokemon);
  }

  async getMyPokemon() {
    const response = await sandboxApi.get('')
    const pokemon = response.data.map(p => new Pokemon(p))
    ProxyState.myPokemon = pokemon
    console.log(response.data);
  }

  async getPokemonIndex(index) {
    const response = await pokeApi.get(index)
    const pokemon = new Pokemon(response.data)
    ProxyState.activePokemon = pokemon
    console.log(pokemon);
  }

  async addPokemon() {
    const found = ProxyState.myPokemon.find(p => p.name == ProxyState.activePokemon.name)
    if (found) {
      throw new Error('you have that pokeman')
    }

    const response = await sandboxApi.post('', ProxyState.activePokemon)
    const pokemon = new Pokemon(response.data)
    ProxyState.myPokemon = [...ProxyState.myPokemon, pokemon]
    this.setActive(pokemon.id)
  }

  setActive(id) {
    const pokemon = ProxyState.myPokemon.find(p => p.id == id)
    ProxyState.activePokemon = pokemon
    console.log(pokemon);
  }

  async inParty() {
    const pokemon = ProxyState.activePokemon
    pokemon.inParty = !pokemon.inParty
    await sandboxApi.put(pokemon.id, pokemon)
    console.log(pokemon);
    ProxyState.myPokemon = ProxyState.myPokemon
  }
}

export const pokemonService = new PokemonService()