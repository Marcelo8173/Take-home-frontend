"use client"
import { User } from '../domain/users';
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('http://localhost:8080/users');
    if (!response.ok) throw new Error('Error fetching users');
    return response.json();
};

export const useUsers = () => {
    return useQuery<User[], Error>({queryKey: ['users'], queryFn: fetchUsers});
};


