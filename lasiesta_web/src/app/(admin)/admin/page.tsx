'use client';
import React from "react";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  console.log("Session data:", session);
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Bem-vindo 👋</h2>
      <p>Escolha uma seção para gerenciar.</p>
    </>
  );
}
