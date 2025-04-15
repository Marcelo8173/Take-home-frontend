"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddUsers } from "../domain/addUser";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { id: string; user: AddUsers }) => {
      const response = await fetch(`http://localhost:8080/users/${payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.user),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};