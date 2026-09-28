import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { MultilingualInput } from '../ui/multilingual-input';
import { LanguageProvider } from '@/lib/i18n/context';

function ControlledMultilingualInput({ initialValue = 'tr:Kebab|en:Kebap', label = 'Product Name' }) {
  const [val, setVal] = useState(initialValue);
  return (
    <LanguageProvider>
      <MultilingualInput
        label={label}
        value={val}
        onChange={setVal}
      />
    </LanguageProvider>
  );
}

describe('MultilingualInput Component (TDD)', () => {
  it('renders input with label and language tabs', () => {
    render(<ControlledMultilingualInput />);

    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getAllByText('TR').length).toBeGreaterThan(0);
    expect(screen.getAllByText('EN').length).toBeGreaterThan(0);
    expect(screen.getAllByText('DE').length).toBeGreaterThan(0);
  });

  it('updates text for active language tab when switching tabs and editing input', () => {
    render(<ControlledMultilingualInput />);

    const enButton = screen.getAllByText('EN')[0];
    fireEvent.click(enButton);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Shish Kebab' } });

    expect(input).toHaveValue('Shish Kebab');
  });
});
