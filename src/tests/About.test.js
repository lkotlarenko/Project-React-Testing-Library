import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <About.js />', () => {
  beforeEach(() => { renderWithRouter(<About />); });
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const aboutDex = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutDex).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto "About Pokédex".', () => {
    const heading = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const p1 = screen.getByText(/a digital encyclopedia containing all Pokémons/i);
    const p2 = screen.getByText(/and see more details for each one of them/i);
    expect(p1 && p2).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    const dexSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { alt: 'Pokédex' });
    expect(img).toHaveProperty('src', dexSrc);
  });
});
