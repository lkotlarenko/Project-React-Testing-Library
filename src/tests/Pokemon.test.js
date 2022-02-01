import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se o card é renderizado com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pikachuSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const charmanderSrc = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img');
    expect(pokeName).toHaveTextContent(/Pikachu/i);
    expect(pokeType).toHaveTextContent(/Electric/i);
    expect(pokeWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(pokeImg).toHaveProperty('src', pikachuSrc);
    expect(pokeImg.alt).toBe('Pikachu sprite');

    userEvent.click(btnNext);
    expect(pokeName).toHaveTextContent(/Charmander/i);
    expect(pokeType).toHaveTextContent(/Fire/i);
    expect(pokeWeight).toHaveTextContent(/Average weight: 8.5 kg/i);
    expect(pokeImg).toHaveProperty('src', charmanderSrc);
    expect(pokeImg.alt).toBe('Charmander sprite');
  });

  test('Teste se o card contém um link para exibir detalhes do Pokémon.', () => {
    renderWithRouter(<App />);
    const pokeLink = screen.getByRole('link', { name: /More details/i });
    expect(pokeLink).toBeInTheDocument();
    expect(pokeLink).toHaveAttribute('href', '/pokemons/25');
  });

  test(
    'Teste se ao clicar no link mais detalhes é redirecionado para a página correta.',
    () => {
      const { history } = renderWithRouter(<App />);
      const pokeLink = screen.getByRole('link', { name: /More details/i });
      userEvent.click(pokeLink);
      // check redirection
      const heading = screen.getByRole('heading', { level: 2, name: /Pikachu Details/i });
      expect(heading).toBeInTheDocument();
      // check pathname
      const { pathname } = history.location;
      expect(pathname).toEqual('/pokemons/25');
    },
  );

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    // render app > go to more details, favorite > go back to home then check for favorite icon
    const { history } = renderWithRouter(<App />);
    const moreInfo = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreInfo);
    const favLabel = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favLabel);
    history.push('/');
    const favIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favIcon.src).toContain('/star-icon.svg');
  });
});
