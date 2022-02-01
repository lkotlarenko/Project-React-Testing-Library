import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => { renderWithRouter(<App />); });
  test('Teste se página contém um heading h2 com o texto "Encountered pokémons".', () => {
    const heading = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se o próximo Pokémon é exibido quando o botão Próximo é clicado.', () => {
    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();
    pokemons.forEach(({ name }) => {
      const pokeCards = screen.getAllByTestId('pokemon-name');
      const pokeName = screen.getByText(name);
      expect(pokeCards).toHaveLength(1);
      expect(pokeName).toBeInTheDocument();
      userEvent.click(nextBtn);
    });
    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const pokeCards = screen.getAllByTestId('pokemon-name');
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeDefined();
    userEvent.click(btnAll);
    expect(pokeCards).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const pokeType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const numTypes = pokeType.length;
    const btnAll = screen.getByRole('button', { name: /All/i });
    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnAll).toBeInTheDocument();
    expect(filterBtns).toHaveLength(numTypes);
    // for each type check if filter works
    pokeType.forEach((type) => {
    // check if filter exists then click on it
      const filterBtn = screen.getByRole('button', { name: type });
      expect(filterBtn).toBeInTheDocument();
      userEvent.click(filterBtn);
      // check if current pokemon type equals to selected filter
      const currentPokeType = screen.getAllByText(type);
      expect(currentPokeType).toHaveLength(2);
      // check if after clicking on next btn the filter keeps working
      userEvent.click(btnNext);
      expect(currentPokeType).toHaveLength(2);
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    // check if default pokemon is a Pikachu
    const defaultPokemon = screen.getByText(/Pikachu/i);
    expect(defaultPokemon).toBeInTheDocument();
    // check if filter 'all' works by clicking on fire filter > check current pokemon >
    // click on 'all' filter then check for default pokemon again
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();
    const testFilter = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(testFilter);
    expect(defaultPokemon).toHaveTextContent(/Charmander/i);
    userEvent.click(btnAll);
    expect(defaultPokemon).toHaveTextContent(/Pikachu/i);
  });
});
