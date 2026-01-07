"use client";
import BackgroundImage from "@/components/layout/backgroundImage";
import ColoredTextBox from "@/components/ui/coloredTextBox";
import PrimaryInput from "@/components/ui/primaryInput";
import BrownButton from "@/components/ui/brownButtom";
import toast, { Toaster } from 'react-hot-toast';
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Email ou senha inválidos");
      setError("Email ou senha inválidos");
      setLoading(false);
      return;
    }

    toast.success("Login realizado com sucesso!");

    window.location.href = "/admin";
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#80542fab] px-4">
      <Toaster position="top-center" reverseOrder={true} />
      <BackgroundImage
        src="/image/organic3.jpg"
        alt="Textura de fundo do ateliê"
        opacity={15}
      />
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg py-8 px-6 z-10">
        {/* Header */}
        <div className="mb-5 text-center">
          <h1 className="text-4xl font-bold text-[#a35c42]">LaSiesta</h1>
          <p className="text-gray-600 mt-2">Área administrativa</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <PrimaryInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
          />

          <PrimaryInput
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && <ColoredTextBox type="error" text={error} />}

          <BrownButton
            type="submit"
            disabled={loading}
            text={loading ? "Entrando..." : "Entrar"}
            className="mt-5"
          />
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Acesso restrito a administradores</p>
        </div>
      </div>
    </main>
  );
}
