"use client";
import { User } from "../../services/users.service";
import PrimaryInput from "../ui/primaryInput";
import BrownButton from "../ui/brownButtom";
import GrayButton from "../ui/grayButtom";
import LoaderComp from "../ui/loaderComp";
import React, { useState } from "react";

type Props = {
  open: boolean;
  loading: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (newPassword: string) => void;
};

export default function ResetPasswordModal({
  open,
  loading,
  user,
  onClose,
  onSubmit,
}: Props) {
  const [password, setPassword] = useState("");

  if (!open || !user) return null;

  function handleClose() {
    onClose();
    setPassword("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(password);
    setPassword("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative bg-white rounded-2xl w-full max-w-md p-4 shadow-lg">
        <button
          className="absolute top-3 right-3 font-bold text-gray-500 hover:text-red-700 cursor-pointer"
          onClick={handleClose}
        >
          &#10005;
        </button>

        <h2 className="text-2xl font-normal text-[#a35c42] mb-2">
          Redefinir senha
        </h2>

        <p className="text-gray-600 mb-4 text-sm">
          Nova senha para <strong>{user.email}</strong>
        </p>

        {loading ? (
          <div className="flex justify-center items-center">
            <LoaderComp text={"Redefinindo senha..."} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <PrimaryInput
              label="Nova senha"
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
                text={loading ? "Salvando..." : "Redefinir"}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
