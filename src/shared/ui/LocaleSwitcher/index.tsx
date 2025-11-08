'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/shared/i18n/navigation'

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    router.refresh();
  };

  return (
      <select
        value={currentLocale}
        onChange={e => switchLocale(e.target.value)}>
        <option value="ru">RU</option>
        <option value="en">EN</option>     
      </select>
  );
}