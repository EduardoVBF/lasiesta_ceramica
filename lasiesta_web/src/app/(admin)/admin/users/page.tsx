"use client";
import {
  useCreateUserMutation,
  useResetUserPasswordMutation,
  useUpdateUserMutation,
  useUpdateUserStatusMutation,
} from "../../../../hooks/mutations/useUserMutations";
import { User, CreateUserPayload } from "../../../../services/users.service";
import UsersTableSkeleton from "@/components/skeletons/usersTableSkeleton";
import { useAdminUsers } from "../../../../hooks/queries/useAdminUsers";
import ResetPasswordModal from "@/components/admin/ResetPasswordModal";
import BackgroundImage from "@/components/layout/backgroundImage";
import UserFormModal from "@/components/admin/UserFormModal";
import ColoredTextBox from "@/components/ui/coloredTextBox";
import BrownButton from "@/components/ui/brownButtom";
import StatusBadge from "@/components/ui/statusBadge";
import toast, { Toaster } from "react-hot-toast";
import { Pencil, Key, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { BsToggleOn } from "react-icons/bs";
import { useState } from "react";

export default function AdminUsersPage() {
  const usersQuery = useAdminUsers();

  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();
  const updateUserStatusMutation = useUpdateUserStatusMutation();
  const resetUserPasswordMutation = useResetUserPasswordMutation();

  const users = usersQuery.data ?? [];
  const loading = usersQuery.isLoading;
  const usersError = usersQuery.isError;

  const savingUser =
    createUserMutation.isPending || updateUserMutation.isPending;

  const resettingPassword = resetUserPasswordMutation.isPending;

  const togglingUserId = updateUserStatusMutation.variables?.id;

  const [infoVisible, setInfoVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [resetUser, setResetUser] = useState<User | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const { data: session } = useSession();

  function handleToggleUser(user: User) {
    updateUserStatusMutation.mutate(
      {
        id: user.id,
        isActive: !user.isActive,
      },
      {
        onSuccess: (updated) => {
          toast.success(
            `Usuário ${updated.isActive ? "ativado" : "desativado"}`,
          );
        },
        onError: () => {
          toast.error("Erro ao atualizar status");
        },
      },
    );
  }

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
          <h2 className="text-4xl font-normal text-[#a35c42]">Usuários</h2>
          <div className="flex items-center mt-2 gap-1">
            <p className="text-gray-600 max-w-xl">
              Gerencie os usuários com acesso ao painel administrativo.
            </p>
            <Info
              size={20}
              className={`cursor-pointer ${
                infoVisible
                  ? "text-blue-500 hover:text-gray-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setInfoVisible((prev) => !prev)}
            />
          </div>
        </div>

        <BrownButton
          text="+ Novo usuário"
          maxWidth="max-w-fit"
          onClick={() => setFormOpen(true)}
        />
      </header>

      {infoVisible && (
        <ColoredTextBox className="my-2 z-10 w-fit" type="info">
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li>Estes são os usuários com acesso ao painel administrativo.</li>
            <li>Usuários administradores têm acesso total ao painel.</li>
            <li>
              Usuários editores têm acesso limitado para edição de conteúdo.
            </li>
            <li>
              Apenas administradores podem criar, editar ou desativar usuários.
            </li>
          </ul>
        </ColoredTextBox>
      )}

      {usersError ? (
        <ColoredTextBox className="my-2 z-10 w-fit" type="error">
          Erro ao carregar usuários. Tente novamente mais tarde.
        </ColoredTextBox>
      ) : loading ? (
        <UsersTableSkeleton />
      ) : users.length == 0 ? (
        <p className="text-gray-600 italic z-10">Nenhum usuário encontrado.</p>
      ) : (
        <section className="bg-white/70 rounded-2xl border border-gray-100 shadow-sm overflow-hidden z-10">
          <table className="w-full text-sm">
            <thead className="bg-[#a35c42]">
              <tr>
                <th className="text-left px-6 py-4 text-white">NOME</th>
                <th className="text-left px-6 py-4 text-white">EMAIL</th>
                <th className="text-left px-6 py-4 text-white">PERFIL</th>
                <th className="text-left px-6 py-4 text-white">STATUS</th>
                <th className="text-right px-6 py-4 text-white">AÇÕES</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300">
              {!loading &&
                users.map((user) => {
                  const isToggling =
                    updateUserStatusMutation.isPending &&
                    togglingUserId === user.id;
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-200/60 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                      </td>

                      <td className="px-6 py-4 text-gray-600">{user.email}</td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.role === "admin" ? "Administrador" : "Editor"}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge active={user.isActive} />
                      </td>

                      <td className="px-6 py-4 text-right">
                        {session?.user?.role === "admin" ? (
                          <div className="inline-flex items-center gap-4">
                            {/* EDITAR */}
                            <button
                              onClick={() => {
                                setEditingUser(user);
                                setFormOpen(true);
                              }}
                              className="text-gray-600 hover:text-[#a35c42]"
                              title="Editar usuário"
                            >
                              <Pencil size={20} />
                            </button>

                            {/* RESET SENHA */}
                            <button
                              onClick={() => {
                                setResetUser(user);
                                setResetOpen(true);
                              }}
                              className="text-gray-600 hover:text-[#a35c42]"
                              title="Redefinir senha"
                            >
                              <Key size={20} />
                            </button>

                            {/* TOGGLE */}
                            <button
                              title={
                                user.isActive
                                  ? "Desativar usuário"
                                  : "Ativar usuário"
                              }
                              onClick={() => handleToggleUser(user)}
                              disabled={isToggling}
                              className={`${
                                isToggling
                                  ? "cursor-not-allowed opacity-50"
                                  : "cursor-pointer"
                              } ${
                                user.isActive
                                  ? "text-green-600 hover:text-red-700"
                                  : "text-red-600 hover:text-green-700"
                              }`}
                            >
                              <BsToggleOn
                                size={25}
                                className={
                                  user.isActive ? "" : "rotate-180 transition"
                                }
                              />
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">
                            Sem ações
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      )}

      {/* MODAL CRIAR / EDITAR */}
      <UserFormModal
        open={formOpen}
        loading={savingUser}
        initialData={editingUser}
        onClose={() => {
          setFormOpen(false);
          setEditingUser(null);
        }}
        onSubmit={async (data) => {
          if (editingUser) {
            await updateUserMutation.mutateAsync({
              id: editingUser.id,
              data,
            });

            toast.success("Usuário atualizado");
          } else {
            await createUserMutation.mutateAsync(data as CreateUserPayload);

            toast.success("Usuário criado");
          }

          setFormOpen(false);
          setEditingUser(null);
        }}
      />

      {/* MODAL RESET SENHA */}
      <ResetPasswordModal
        open={resetOpen}
        loading={resettingPassword}
        user={resetUser}
        onClose={() => {
          setResetOpen(false);
          setResetUser(null);
        }}
        onSubmit={async (newPassword) => {
          if (!resetUser) return;

          await resetUserPasswordMutation.mutateAsync({
            id: resetUser.id,
            newPassword,
          });

          toast.success("Senha redefinida com sucesso");
          setResetOpen(false);
          setResetUser(null);
        }}
      />
    </div>
  );
}
