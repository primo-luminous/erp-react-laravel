import React from 'react';
import { LanguageSwitcher, type LanguageSwitcherProps, LanguageSwitcherDisplay } from './LanguageSwitcher';

export interface HeaderProps {
  title: string;
  languageSwitcher: Pick<LanguageSwitcherProps, 'supportedLocales' | 'activeLocale' | 'onChange'>;
}

export const Header: React.FC<HeaderProps> = ({ title, languageSwitcher }) => {
  const { supportedLocales, activeLocale, onChange } = languageSwitcher;

  return (
    <header className="flex items-center justify-between gap-6 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500">Manage your workspace preferences</p>
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcherDisplay locale={activeLocale} />
        <LanguageSwitcher
          supportedLocales={supportedLocales}
          activeLocale={activeLocale}
          onChange={onChange}
        />
      </div>
    </header>
  );
};

export default Header;
