'use server';

import { revalidateTag } from 'next/cache';
import { get } from '../lib/fetch-api';

const path = 'api';

export const getQuote = async () => get<IQuote>(`random`, { path });

export const updateQuote = async () => revalidateTag('quote');
