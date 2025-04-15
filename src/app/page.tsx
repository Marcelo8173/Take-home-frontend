'use client'

import { useState } from "react";
import Modal from "./components/Modal";
import Input from "./components/input";
import { useUsers } from "./hooks/useUsers";
import { User } from "./domain/listUsers";
import { useAddUser } from "./hooks/addUser";
import { AddUsers } from "./domain/addUser";
import { useDeleteUser } from "./hooks/deteleUser";
import { useRouter } from 'next/navigation';


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<AddUsers>({
    email: '',
    name: ''
  })
  const { data } = useUsers();
  const { mutate } = useAddUser();
  const { mutate: deleteUser } = useDeleteUser();
  const router = useRouter();

  const handleAddUser = () => {
    mutate(newUser);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (confirmed) {
      deleteUser(id);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/users/${id}/edit`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Lista de Usuários</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer"
        >
          Adicionar Usuário
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Nome</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item: User) => (
            <tr key={item.id} className="border-t">
              <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{item.email}</td>
              <td className="px-6 py-4 text-sm">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleAddUser={handleAddUser}
        title="Adicionar novo usuário"
      >
        <div className="mb-4">
          <Input label="Nome"
            onChange={(e) =>
              setNewUser((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            value={newUser?.name}
            alt="Input de nome do usuário"
            placeholder="Coloque o nome do usuário" />
        </div>
        <div className="mb-4">
          <Input label="Email"
            onChange={(e) =>
              setNewUser((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            value={newUser?.email}
            alt="Input de email do úsuario"
            placeholder="Coloque o email do usuário" />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Adicionar
          </button>
        </div>
      </Modal>
    </div>
  );
}

