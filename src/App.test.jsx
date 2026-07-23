import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { useTranslation } from './i18n/useTranslation';
import { renderWithProviders } from './test/renderWithProviders';

function MissingTranslationList() {
  const { tArray } = useTranslation();
  const items = tArray('missing.translation.list');

  return (
    <div>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
      <span>safe fallback</span>
    </div>
  );
}

describe('App', () => {
  it('renders Home without crashing', () => {
    renderWithProviders(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Sin calle/i
    );
  });

  it('switches between Spanish and English', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    await user.click(screen.getByRole('button', { name: /selector de idioma/i }));
    await user.click(screen.getByRole('menuitem'));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /No street/i
    );
  });

  it('keeps missing array translations from breaking map usage', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderWithProviders(<MissingTranslationList />);

    expect(screen.getByText('safe fallback')).toBeInTheDocument();
  });

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    const menuButton = screen.getByRole('button', { name: /abrir menú principal/i });

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile menu with Escape', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    const menuButton = screen.getByRole('button', { name: /abrir menú principal/i });

    await user.click(menuButton);
    await user.keyboard('{Escape}');

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile menu after selecting a link', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    const menuButton = screen.getByRole('button', { name: /abrir menú principal/i });

    await user.click(menuButton);
    await user.click(screen.getAllByRole('link', { name: /Libros/i })[0]);

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('links books to their stable slugs', () => {
    renderWithProviders(<App />);

    const consumerMindLinks = screen.getAllByRole('link', {
        name: /desnudando la mente del consumidor/i,
      });
    const streetStrategyLinks = screen.getAllByRole('link', {
        name: /estrategias con calle/i,
      });

    expect(
      consumerMindLinks.some(
        (link) => link.getAttribute('href') === '/libros/desnudando-la-mente-del-consumidor'
      )
    ).toBe(true);
    expect(
      streetStrategyLinks.some(
        (link) => link.getAttribute('href') === '/libros/estrategias-con-calle'
      )
    ).toBe(true);
  });

  it('shows a real 404 page for an unknown book slug', async () => {
    renderWithProviders(<App />, { route: '/libros/no-existe' });

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      /no encontrada/i
    );
  });
});
