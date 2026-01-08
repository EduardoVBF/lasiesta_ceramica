"use client";
import { getAdminUsers, User, createUser } from "../../../../services/users.service";
import BackgroundImage from "@/components/layout/backgroundImage";
import CreateUserModal from "@/components/admin/CreateUserModal";
import BrownButton from "@/components/ui/brownButtom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUsers()
      .then(setUsers)
      .catch((err) =>
        toast.error(
          err.response?.data?.error ||
            "Erro ao carregar usuários"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col">
      <BackgroundImage
        src="/image/organic3.jpg"
        alt="Textura de fundo do ateliê"
        opacity={20}
      />

      <Toaster position="top-center" />

      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 z-10">
        <div>
          <h2 className="text-4xl font-normal text-[#a35c42]">
            Usuários
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl">
            Gerencie os usuários que têm acesso ao painel
            administrativo.
          </p>
        </div>

        <BrownButton
          text="+ Novo usuário"
          maxWidth="max-w-fit"
          onClick={() => setIsModalOpen(true)}
        />
      </header>

      {/* TABELA */}
      <section className="bg-white/70 rounded-2xl border border-gray-100 shadow-sm overflow-hidden z-10">
        <table className="w-full text-sm">
          <thead className="bg-[#a35c42]">
            <tr>
              <th className="text-left px-6 py-4 font-medium text-white">
                NOME
              </th>
              <th className="text-left px-6 py-4 font-medium text-white">
                EMAIL
              </th>
              <th className="text-left px-6 py-4 font-medium text-white">
                PERFIL
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
            {loading && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-8 text-gray-500"
                >
                  Carregando usuários...
                </td>
              </tr>
            )}

            {!loading && users.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Nenhum usuário cadastrado
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-200/60 transition"
              >
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <CreateUserModal
        open={isModalOpen}
        loading={creating}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          try {
            setCreating(true);
            const created = await createUser(data);
            setUsers((prev) => [created, ...prev]);
            toast.success("Usuário criado com sucesso!");
            setIsModalOpen(false);
          } catch (err: any) {
            toast.error(
              err.response?.data?.error ||
                "Erro ao criar usuário"
            );
          } finally {
            setCreating(false);
          }
        }}
      />
    </div>
  );
}
