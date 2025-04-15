'use client'

"use client"
import { User } from '../domain/users';
import { useMutation } from "@tanstack/react-query";

const addUser = async (user: Partial<User>): Promise<User> => {
    const response = await fetch('http://localhost:8080/users', {
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
    return useMutation<User, Error, User>({
      mutationFn: addUser,
      onError: (error) => {
        console.error('Error adding user:', error);
      },
      onSuccess: (data) => {
        console.log('User added successfully:', data);
      },
    });
  };