import { useQuery } from "@tanstack/react-query";
import { User } from "../domain/listUsers";

export const useUserById = (id: string) => {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar usuário por ID');
      }

      const data = await response.json();
      return data;
    },
    enabled: !!id,
  });
};