'use client'

import { useEffect, useState } from "react";
import Input from '../../../components/input';
import { useUserById } from "@/app/hooks/userUsersById";
import { useUpdateUser } from "@/app/hooks/editUser";
import { useRouter } from "next/navigation";

export default function EditUser({ params }: { params: { id: string } }) {
    const { id } = params;
    const { data } = useUserById(id);
    const { mutate } = useUpdateUser();
    const router = useRouter();

    const [editUser, setEditUser] = useState({
        name: data?.name,
        email: data?.email,
    });

    useEffect(() => {
        if (data) {
            setEditUser({
                email: data.email,
                name: data.name
            })
        }
    }, [data])

    const handleSave = () => {
        mutate(
            { id, user: editUser },
            {
                onSuccess: () => {
                    setTimeout(() => {
                        router.push("/");
                    }, 200);
                },
            }
        );
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Editar Usuário</h1>
            <p className="mb-6 text-gray-900">ID do usuário: <span className="font-mono">{id}</span></p>
            <p className="mb-6 text-gray-900">Nome do usuário: <span className="font-mono">{data?.name}</span></p>

            <div className="space-y-4">
                <div>
                    <Input label="Nome"
                        onChange={(e) =>
                            setEditUser((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        value={editUser?.name}
                        alt="Input de nome do usuário"
                        placeholder="Coloque o nome do usuário" />s
                </div>

                <div>
                    <Input label="Nome"
                        onChange={(e) =>
                            setEditUser((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        value={editUser?.email}
                        alt="Input de nome do usuário"
                        placeholder="Coloque o nome do usuário" />
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
}