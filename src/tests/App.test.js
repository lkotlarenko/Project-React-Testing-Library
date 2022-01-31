import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto de links de navegação.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  test('Teste se é redirecionada para a página inicial, ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toEqual('/');
  });

  test('Teste se é redirecionada para página About, ao clicar no link About.', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toEqual('/about');
  });

  test(
    'Teste se ao clicar no link é redirecionada para página Pokémons Favoritados.',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(linkFavorite);
      const { pathname } = history.location;
      expect(pathname).toEqual('/favorites');
    },
  );

  test(
    'Teste se é redirecionada para a página Not Found ao entrar em uma URL invalida.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/formula1');
      const notFound = screen.getByRole('heading', {
        level: 2, name: /Page requested not found/i,
      });
      expect(notFound).toBeInTheDocument();
    },
  );
});
