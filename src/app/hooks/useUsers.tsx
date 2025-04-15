"use client"
import { User } from '../domain/listUsers';
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    if (!response.ok) throw new Error('Error fetching users');
    return response.json();
};

export const useUsers = () => {
    return useQuery<User[], Error>({queryKey: ['users'], queryFn: fetchUsers});
};


