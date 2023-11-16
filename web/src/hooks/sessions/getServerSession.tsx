import api from '@/api';
import { cookies } from 'next/headers';
import { SessionType } from './type';
import { ApiResponse } from '@/types';

export async function getServerSession(): Promise<SessionType> {
  const cookie = cookies();
  const req = {
    token: cookie.get('auth')?.value,
  };
  try {
    const response = await api.post<ApiResponse<SessionType>>(
      '/auth/verify',
      req
    );
    return response.data.data;
  } catch (error) {
    return null;
  }
}
