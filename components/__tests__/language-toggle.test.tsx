import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageToggle } from '../language-toggle';
import { LanguageProvider } from '@/lib/i18n/context';

describe('LanguageToggle Component (TDD)', () => {
  it('renders language toggle and allows opening menu and selecting language', async () => {
    render(
      <LanguageProvider>
        <LanguageToggle showLabel={true} />
      </LanguageProvider>
    );

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);

    const option = await screen.findByText('Türkçe');
    expect(option).toBeInTheDocument();

    fireEvent.click(option);
  });
});
