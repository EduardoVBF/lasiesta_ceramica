"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="my-5 w-full px-6">
        <h1 className="text-4xl font-bold text-center">Sobre nós</h1>
      </div>
      <Footer />
    </main>
  );
}
