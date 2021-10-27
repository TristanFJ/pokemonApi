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
  }

  async getMyPokemon() {
    const response = await sandboxApi.get('')
    console.log(response.data);
  }

  async getPokemonIndex(index) {
    const response = await pokeApi.get(index)
    const pokemon = new Pokemon(response.data)
    console.log(pokemon);
  }

  // setActive(id){
  //   const pokemon = ProxyState.myPokemon
  // }
}

export const pokemonService = new PokemonService()