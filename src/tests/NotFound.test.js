import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/duvidoqueexisteessapagina');
  });
  test('Teste se página contém um h2 com o texto "Page requested not found 😭"', () => {
    const heading = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const imageSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(image).toHaveProperty('src', imageSrc);
  });
});
