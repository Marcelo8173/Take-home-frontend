'use client'

import { useState } from "react";
import Modal from "./components/Modal";
import Input from "./components/input";
import { useUsers } from "./hooks/useUsers";
import { User } from "./domain/users";
import { useAddUser } from "./hooks/addUser";


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useUsers();
  const { mutate } = useAddUser();

  const handleAddUser = () => {
    mutate({
      email: '123',
      name: "123",
      id: '23'
    })
    // console.log(newUser); // Aqui você pode adicionar a lógica para adicionar o usuário
    setIsModalOpen(false); // Fecha a modal após adicionar
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
                  // onClick={() => handleEdit(item.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                  Editar
                </button>
                <button
                  // onClick={() => handleDelete(item.id)}
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
            onChange={() => console.log()}
            value="123"
            alt="Input de nome do usuário"
            placeholder="Coloque o nome do usuário" />
        </div>
        <div className="mb-4">
          <Input label="Nome"
            onChange={() => console.log()}
            value="123"
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

