import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(
    'Teste a mensagem "No favorite pokemon found" quando não houver pokémons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const emptyMessage = screen.getByText(/No favorite pokemon found/i);
      expect(emptyMessage).toBeInTheDocument();
    },
  );

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const mockedPokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: { value: '4.20', measurementUnit: 'kg' },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        summary: 'Stub info',
      },
      {
        id: 65,
        name: 'Alakazam',
        type: 'Electric',
        averageWeight: { value: '4.20', measurementUnit: 'kg' },
        image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
        summary: 'Stub info',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ mockedPokemons } />);
    const moreDetailsLinks = screen.getAllByRole('link', { name: /More details/i });
    expect(moreDetailsLinks).toHaveLength(2);
  });
});
