import React from 'react';

type LocaleCode = 'en' | 'th' | 'zh-CN' | 'ja' | 'km' | 'lo';

type LanguageMeta = {
  label: string;
  country: string;
  flag?: string;
};

const LANGUAGE_META: Record<LocaleCode, LanguageMeta> = {
  en: { label: 'English', country: 'United States', flag: '🇺🇸' },
  th: { label: 'ไทย', country: 'ประเทศไทย', flag: '🇹🇭' },
  'zh-CN': { label: '中文', country: '中国', flag: '🇨🇳' },
  ja: { label: '日本語', country: '日本', flag: '🇯🇵' },
  km: { label: 'ខ្មែរ', country: 'កម្ពុជា', flag: '🇰🇭' },
  lo: { label: 'ລາວ', country: 'ປະເທດລາວ', flag: '🇱🇦' },
};

export interface LanguageSwitcherProps {
  supportedLocales: LocaleCode[];
  activeLocale: LocaleCode;
  onChange(locale: LocaleCode): void;
}

const getLocaleLabel = (locale: LocaleCode) => {
  const { label, country, flag } = LANGUAGE_META[locale];
  return `${flag ? `${flag} ` : ''}${label} · ${country}`;
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  supportedLocales,
  activeLocale,
  onChange,
}) => {
  return (
    <div className="relative inline-flex">
      <label className="sr-only" htmlFor="language-selector">
        Select language
      </label>
      <select
        id="language-selector"
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={activeLocale}
        onChange={(event) => onChange(event.target.value as LocaleCode)}
      >
        {supportedLocales.map((locale) => (
          <option key={locale} value={locale}>
            {getLocaleLabel(locale)}
          </option>
        ))}
      </select>
    </div>
  );
};

export const LanguageSwitcherDisplay: React.FC<{ locale: LocaleCode }> = ({ locale }) => {
  return <span className="inline-flex items-center gap-2 text-sm font-medium">{getLocaleLabel(locale)}</span>;
};

export default LanguageSwitcher;
