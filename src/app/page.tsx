import React from 'react';
import { getQuote } from '@actions/quote.action';
import BlurText from '@/common/components/BlurText';
import LiveTime from '@/common/components/LiveTime';
import ActionBar from '@/common/components/ActionBar';

export default async function MainPage() {
  const quote = await getQuote();

  return (
    <div className='flex flex-col items-center justify-center'>
      <LiveTime />

      <div className='flex flex-col items-center justify-center gap-12'>
        <BlurText text={`"${quote?.[0]?.q}"`} />
        <BlurText text={`- ${quote?.[0]?.a}`} color='off-white' size='md' />
      </div>

      <ActionBar />
    </div>
  );
}
