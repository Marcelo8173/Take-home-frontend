"use client"
import { AddUsers } from '../domain/addUser';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addUser = async (user: Partial<AddUsers>): Promise<AddUsers> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
     
    });
  
    if (!response.ok) {
      throw new Error('Error adding user');
    }
  
    return response.json();
  };
  
  export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation<AddUsers, Error, AddUsers>({
      mutationFn: addUser,
      onError: (error) => {
        console.error('Error adding user:', error);
      },
      onSuccess: () => {
        setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }, 2000);
      },
    });
  };

  