import api from '@/api';
import { cookies } from 'next/headers';

export async function getServerSession() {
  const cookie = cookies();
  const req = {
    token: cookie.get('auth')?.value,
  };
  const response = await api.post('/auth/verify', req);
  return response.data;
}
