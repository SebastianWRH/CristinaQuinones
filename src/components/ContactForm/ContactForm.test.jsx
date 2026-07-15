import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ContactForm from './ContactForm';
import { renderWithProviders } from '../../test/renderWithProviders';

async function fillValidForm(user) {
  await user.type(screen.getByLabelText(/Nombre/i), 'Maria Perez');
  await user.type(screen.getByLabelText(/Email/i), 'maria@example.com');
  await user.selectOptions(screen.getByRole('combobox'), 'Conferencia o keynote');
  await user.type(
    screen.getByLabelText(/Mensaje/i),
    'Necesitamos una conferencia para nuestro equipo comercial.'
  );
}

describe('ContactForm', () => {
  it('detects required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(screen.getByText(/nombre válido/i)).toBeInTheDocument();
    expect(screen.getByText(/correo válido/i)).toBeInTheDocument();
    expect(screen.getAllByText(/obligatorio/i).length).toBeGreaterThan(0);
  });

  it('detects invalid email', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/Nombre/i), 'Maria Perez');
    await user.type(screen.getByLabelText(/Email/i), 'correo-malo');
    await user.selectOptions(screen.getByRole('combobox'), 'Conferencia o keynote');
    await user.type(
      screen.getByLabelText(/Mensaje/i),
      'Necesitamos una conferencia para nuestro equipo comercial.'
    );
    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(screen.getByText(/correo válido/i)).toBeInTheDocument();
  });

  it('disables the button while sending', async () => {
    const user = userEvent.setup();
    let resolveFetch;
    global.fetch = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );
    renderWithProviders(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(screen.getByRole('button', { name: /Enviando/i })).toBeDisabled();

    resolveFetch({
      ok: true,
      json: async () => ({ ok: true }),
    });
  });

  it('shows a success message after a successful response', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn(async () => ({
      ok: true,
      json: async () => ({ ok: true }),
    }));
    renderWithProviders(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    expect(await screen.findByText(/mensaje enviado/i)).toBeInTheDocument();
  });

  it('shows an error message after a server failure', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn(async () => ({
      ok: false,
      json: async () => ({ ok: false }),
    }));
    renderWithProviders(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Enviar mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText(/no pudimos enviar/i)).toBeInTheDocument();
    });
  });
});
