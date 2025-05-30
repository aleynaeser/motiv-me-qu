import { NextResponse } from 'next/server';
import { getQuote } from '@actions/quote.action';

export async function GET() {
  try {
    const quote = await getQuote();
    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 });
  }
}
