import type { Metadata } from 'next';
import localFont from 'next/font/local';
import * as motion from 'motion/react-client';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SilkBackground } from '@/common/components/SilkBackground';
import ReactQueryProvider from '@providers/ReactQueryProvider';

import '@styles/global.css';

const wdxlLubrifont = localFont({
  weight: '400',
  display: 'swap',
  preload: true,
  variable: '--font-wdxl-lubrifont',
  src: '../../public/fonts/WDXLLubrifontTC-Regular.ttf',
});

export const metadata: Metadata = {
  title: 'Motiv Me Qu',
  description: 'Daily motivational quotes to inspire and uplift your mind.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={wdxlLubrifont.className}>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
        <link rel='manifest' href='/favicons/site.webmanifest' />
        <link rel='mask-icon' href='/favicons/safari-pinned-tab.svg' color='1F1F1F' />
        <link rel='shortcut icon' href='/favicons/favicon.ico' />
        <meta name='msapplication-TileColor' content='#1F1F1F' />
        <meta name='msapplication-config' content='/favicons/browserconfig.xml' />
        <meta name='theme-color' content='#1F1F1F' />
      </head>

      <ReactQueryProvider>
        <motion.body
          suppressHydrationWarning
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`relative flex h-full min-h-screen flex-col items-center justify-center bg-black`}
          transition={{ duration: 0.5, scale: { type: 'spring', visualDuration: 0.5, bounce: 0.5 } }}
        >
          <main
            className={`relative z-50 flex w-full items-center justify-center overflow-hidden p-6 text-white lg:max-w-6xl`}
          >
            {children}
          </main>

          <SilkBackground />
          <SpeedInsights />
        </motion.body>
      </ReactQueryProvider>
    </html>
  );
}
