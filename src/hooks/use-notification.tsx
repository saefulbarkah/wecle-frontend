/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/features/auth/store';
import NotificationService from '@/services/notification/notification-service';
import { socket } from '@/socket/socket';
import { ApiResponse } from '@/types';
import { Notification } from '@/types/notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useMemo } from 'react';

export const useNotification = () => {
  const auth = useAuth((state) => state.session);
  const queryData = useQuery({
    queryKey: ['notification'],
    queryFn: () =>
      NotificationService.findByUserId(
        auth?.id as string,
        auth?.token as string
      ),
    enabled: auth ? true : false,
  });

  const queryClient = useQueryClient();

  // count unread notification
  const unreadCount = useMemo(() => {
    if (!queryData.data) return null;
    const data = queryData.data.filter((item) => item.readAt === undefined);
    return data.length === 0 ? null : data.length;
  }, [queryData.data]);

  useEffect(() => {
    if (socket?.connected) {
      socket.on('recieve-notification', (data: Notification) => {
        queryClient.setQueryData(
          ['notification'],
          (oldData: Notification[]) => {
            return [
              {
                ...data,
              },
              ...oldData,
            ];
          }
        );
      });
      return () => {
        socket?.off('recieve-notification');
      };
    }
  }, [socket]);

  // assign user socket
  useEffect(() => {
    if (socket?.connected) {
      if (auth) {
        socket.emit('new-user', auth.id);
      }
      return () => {
        socket?.off('new-user');
      };
    }
  }, [socket, auth]);

  return { ...queryData, auth, unreadCount };
};

export const useReadOneNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<ApiResponse>,
    AxiosError<any>,
    { id: string; userId: string; token: string }
  >({
    mutationKey: ['read-one'],
    mutationFn: ({ id, userId, token }) =>
      NotificationService.readOne(id, userId, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
  });
};

export const useReadAllNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<ApiResponse>,
    AxiosError<any>,
    { userId: string; token: string }
  >({
    mutationKey: ['read-all'],
    mutationFn: ({ userId, token }) =>
      NotificationService.readAll(userId, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
  });
};
