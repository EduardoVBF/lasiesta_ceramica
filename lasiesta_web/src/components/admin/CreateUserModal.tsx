"use client";

import React, { useState } from "react";
import PrimaryInput from "../ui/primaryInput";
import BrownButton from "../ui/brownButtom";
import GrayButton from "../ui/grayButtom";
import ColoredTextBox from "../ui/coloredTextBox";
import { Info } from "lucide-react";

type CreateUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type Props = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserData) => void;
};

export default function CreateUserModal({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const [infoVisible, setInfoVisible] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ firstName, lastName, email, password });
  }

  function handleClose() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("user");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-2xl w-full max-w-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-normal text-[#a35c42]">
            Novo usuário
          </h2>

          <Info
            size={20}
            className={`cursor-pointer ${
              infoVisible
                ? "text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setInfoVisible((p) => !p)}
          />
        </div>

        <p className="text-gray-600 mb-3 text-sm">
          Crie um novo usuário com acesso ao painel.
        </p>

        {infoVisible && (
          <ColoredTextBox type="info" className="mb-3">
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>
                O usuário receberá acesso imediato ao admin.
              </li>
              <li>
                A senha deve ser compartilhada de forma segura.
              </li>
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <PrimaryInput
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
              text={loading ? "Criando..." : "Criar usuário"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
