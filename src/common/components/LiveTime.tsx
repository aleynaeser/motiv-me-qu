'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function LiveTime() {
  const locale = 'en-US';
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const weekdayString = time.toLocaleDateString(locale, { weekday: 'long' });
  const dateString = time.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '.');
  const timeString = time.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const digits = timeString.split('');

  return (
    <div className='flex w-fit flex-col items-baseline p-6'>
      <div className='text-off-white mb-2 flex w-full justify-between text-[12px]'>
        <span>{dateString}</span>
        <span>{weekdayString}</span>
      </div>

      <div className='flex space-x-1'>
        {digits.map((digit, index) => (
          <div key={index} className='relative flex h-16 w-6 items-center justify-center overflow-hidden'>
            <AnimatePresence mode='wait' initial={false}>
              <motion.span
                key={digit}
                className='from-accent to-accent-dark absolute w-6 bg-gradient-to-r bg-clip-text text-center text-4xl text-transparent'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
