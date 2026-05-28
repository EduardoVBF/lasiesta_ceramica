"use client";
import { translateApiErrors } from "../../utils/translateApiError";
import { User } from "../../services/users.service";
import React, { useEffect, useState } from "react";
import ColoredTextBox from "../ui/coloredTextBox";
import PrimarySelect from "../ui/primarySelect";
import PrimarySwitch from "../ui/primarySwitch";
import PrimaryInput from "../ui/primaryInput";
import BrownButton from "../ui/brownButtom";
import GrayButton from "../ui/grayButtom";
import LoaderComp from "../ui/loaderComp";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { Info } from "lucide-react";

type Props = {
  open: boolean;
  loading: boolean;
  initialData?: User | null;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => Promise<void>;
};

export default function UserFormModal({
  open,
  loading,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const [infoVisible, setInfoVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
      setEmail(initialData.email);
      setRole(initialData.role as "admin" | "editor");
      setIsActive(initialData.isActive);
      setPassword("");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRole("editor");
      setIsActive(true);
    }
  }, [initialData, open]);

  if (!open) return null;

  function handleClose() {
    onClose();
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("editor");
    setIsActive(true);
    setInfoVisible(false);
    setErrors({});
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    try {
      await onSubmit({
        firstName,
        lastName,
        email,
        role,
        isActive,
        ...(initialData ? {} : { password }),
      });
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("Erro ao salvar o usuário");
        return;
      } else {
        if (!err.response || !err.response.data) {
          toast.error("Erro ao salvar o usuário");
          return;
        }
        const { fieldErrors, toastMessage } = translateApiErrors(
          err.response.data,
        );

        setErrors(fieldErrors);
        toast.error(toastMessage || "Erro ao salvar o usuário");
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative bg-white rounded-2xl w-full max-w-lg p-4 shadow-lg max-h-[95dvh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 font-bold text-gray-500 hover:text-red-700 cursor-pointer"
          onClick={handleClose}
        >
          &#10005;
        </button>

        <div className="flex items-center gap-1 mb-1">
          <h2 className="text-2xl font-normal text-[#a35c42]">
            {initialData ? "Editar usuário" : "Novo usuário"}
          </h2>

          <Info
            size={20}
            className={`cursor-pointer ${
              infoVisible ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setInfoVisible((p) => !p)}
          />
        </div>

        {infoVisible && (
          <ColoredTextBox type="info" className="mb-3">
            <ul className="list-disc pl-4 text-sm space-y-1">
              <li>Email não pode ser alterado</li>
              <li>Senha só é definida na criação</li>
              <li>Administradores têm acesso total ao painel</li>
              <li>Editores têm acesso limitado para edição de conteúdo</li>
              <li>Usuários inativos não acessam o sistema</li>
            </ul>
          </ColoredTextBox>
        )}
        {loading ? (
          <div className="flex justify-center items-center">
            <LoaderComp text={"Salvando usuário..."} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <PrimaryInput
              label="Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              error={errors.firstName}
            />
            <PrimaryInput
              label="Sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              error={errors.lastName}
            />
            <PrimaryInput
              label="Email"
              value={email}
              disabled={!!initialData}
              onChange={(e) => {
                if (!initialData) {
                  setEmail(e.target.value);
                }
              }}
              type="email"
              required
              error={errors.email}
            />

            {!initialData && (
              <PrimaryInput
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={errors.password}
              />
            )}

            <PrimarySelect
              label="Perfil"
              value={role}
              required
              onChange={(e) => setRole(e.target.value as "admin" | "editor")}
              options={[
                { value: "admin", label: "Administrador" },
                { value: "editor", label: "Editor" },
              ]}
              error={errors.role}
            />

            <PrimarySwitch
              label="Usuário ativo"
              checked={isActive}
              onChange={setIsActive}
              error={errors.isActive}
            />

            <div className="flex justify-end gap-3 pt-4">
              <GrayButton
                text="Cancelar"
                onClick={handleClose}
                maxWidth="max-w-fit"
              />
              <BrownButton
                type="submit"
                disabled={loading}
                maxWidth="max-w-fit"
                text={loading ? "Salvando..." : "Salvar"}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
