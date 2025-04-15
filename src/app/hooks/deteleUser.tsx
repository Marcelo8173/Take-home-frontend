"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`http://localhost:8080/users/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erro ao deletar usuário');
        },
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['users'] });
            }, 2000);
        },
    });
};