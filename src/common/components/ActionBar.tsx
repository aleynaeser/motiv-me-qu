'use client';

import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { updateQuote } from '../actions/quote.action';
import * as motion from 'motion/react-client';
import { useMutation } from '@tanstack/react-query';

export default function ActionBar() {
  const { mutateAsync } = useMutation({
    mutationKey: ['updateQuote'],
    mutationFn: () => updateQuote(),
  });

  return (
    <div className='flex items-center justify-center pt-12 lg:pt-16'>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        className='bg-black-light flex cursor-pointer items-center justify-center rounded-full p-3'
        onClick={async () => await mutateAsync()}
      >
        <RefreshCcw size={22} />
      </motion.button>
    </div>
  );
}
