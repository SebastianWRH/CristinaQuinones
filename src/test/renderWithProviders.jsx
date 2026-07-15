import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageProvider';

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <HelmetProvider>
      <LanguageProvider>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}
