"use client";
import { useEffect } from 'react';

const YANDEX_METRIKA_ID = 103423983;

const YandexMetrika = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}`;
    const firstScript = document.getElementsByTagName('script')[0] as HTMLElement | null;
    if (firstScript) {
      const parentNode = firstScript.parentNode as Node | null;
      if (parentNode) {
        parentNode.insertBefore(script, firstScript);
      }
    }

    window['ym'] = window['ym'] || function () {
      (window['ym'].a = window['ym'].a || []).push(arguments);
    };
    window['ym'](YANDEX_METRIKA_ID, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      accurateTrackBounce: true,
      trackLinks: true,
    });
  }, []);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt=""
        />
      </div>
    </noscript>
  );
};

export default YandexMetrika;
