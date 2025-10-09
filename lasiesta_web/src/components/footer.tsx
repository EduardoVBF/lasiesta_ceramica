"use client";
import React from "react";
import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="w-full bg-marrom-avermelhado text-bege-claro mt-auto">
      <div className="mx-auto px-8 py-4 flex flex-col md:flex-row gap-10 justify-between w-full">
        {/* Identidade */}
        <div className="w-full md:w-fit px-4 text-center md:text-left">
          <h2 className="text-2xl font-bold font-playwrite">Lasiesta Cerâmica</h2>
          <p className="mt-2 text-sm text-marrom-avermelhado/80">
            Arte em cerâmica manual
          </p>
          <p className="mt-4 text-xs text-marrom-avermelhado/70">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 w-full md:w-auto">
          {/* Localização */}
          <div className="w-full md:w-fit px-4 text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3">Localização</h3>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-2">
              <MapPin className="w-5 h-5" />
              <p className="text-sm leading-relaxed">
                Rua Santos Pereira, 557 - Cidade Nova, Franca - SP <br />
                CEP: 14401-130 <br />
                <a
                  href="https://www.google.com/maps/place/R.+Santos+Pereira,+557,+Cidade+Nova,+Franca+-+SP,+14401-130"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-marrom-avermelhado/70 transition"
                >
                  Ver no mapa
                </a>
              </p>
            </div>
          </div>
          {/* Contato */}
          <div className="w-full md:w-fit px-4 text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3">Contato</h3>
            {/* Telefone */}
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <Phone className="w-5 h-5" />
              <p className="text-sm">(16) 99140-1921</p>
            </div>
            {/* Instagram */}
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <Instagram className="w-5 h-5" />
              <a
                href="https://instagram.com/lasiestaceramica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                @lasiestaceramica
              </a>
            </div>
            {/* Whatsapp */}
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <SiWhatsapp className="w-5 h-5" />
              <a
                href="https://wa.me/5516991401921?text=Olá!%20Gostaria%20de%20mais%20informações"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                Enviar mensagem
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
