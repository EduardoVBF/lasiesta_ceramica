"use client";
import { User } from "../../services/users.service";
import React, { useEffect, useState } from "react";
import ColoredTextBox from "../ui/coloredTextBox";
import PrimarySelect from "../ui/primarySelect";
import PrimarySwitch from "../ui/primarySwitch";
import PrimaryInput from "../ui/primaryInput";
import BrownButton from "../ui/brownButtom";
import GrayButton from "../ui/grayButtom";
import { Info } from "lucide-react";

type Props = {
  open: boolean;
  loading: boolean;
  initialData?: User | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export default function UserFormModal({
  open,
  loading,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [infoVisible, setInfoVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const [isActive, setIsActive] = useState(true);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      firstName,
      lastName,
      email,
      role,
      isActive,
      ...(initialData ? {} : { password }),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
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
              <li>Usuários inativos não acessam o sistema</li>
            </ul>
          </ColoredTextBox>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <PrimaryInput
            label="Nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <PrimaryInput
            label="Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
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
          />

          {!initialData && (
            <PrimaryInput
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          <PrimarySelect
            label="Perfil"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            options={[
              { value: "admin", label: "Administrador" },
              { value: "editor", label: "Editor" },
            ]}
          />

          <PrimarySwitch
            label="Usuário ativo"
            checked={isActive}
            onChange={setIsActive}
          />

          <div className="flex justify-end gap-3 pt-4">
            <GrayButton
              text="Cancelar"
              onClick={onClose}
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
      </div>
    </div>
  );
}
