import api from '@/api';
import { cookies } from 'next/headers';
import { SessionType } from '.';

export async function getServerSession() {
  const cookie = cookies();
  const req = {
    token: cookie.get('auth')?.value,
  };
  try {
    const response = await api.post('/auth/verify', req);
    return response.data;
  } catch (error) {
    return null;
  }
}
