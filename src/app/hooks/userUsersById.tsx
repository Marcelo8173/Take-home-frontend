import { useQuery } from "@tanstack/react-query";
import { User } from "../domain/listUsers";

export const useUserById = (id: string) => {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/users/${id}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar usuário por ID');
      }

      const data = await response.json();
      return data;
    },
    enabled: !!id,
  });
};