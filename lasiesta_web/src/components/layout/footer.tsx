"use client";
import { Phone, MapPin, Instagram } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-[#6f422b] text-[#f5eee6]">
      <div className="max-w-8xl mx-auto px-6 py-6">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Marca */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3">
              <Image
                src="/image/lasiesta_icon.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h1 className="text-3xl font-semibold tracking-tight">
                LaSiesta Cerâmica
              </h1>
            </div>

            <p className="mt-4 text-[#f5eee6]/80 leading-relaxed">
              Arte em cerâmica manual, experiências criativas e um espaço onde o
              tempo desacelera entre barro, silêncio e presença.
            </p>

            <p className="mt-6 text-sm text-[#f5eee6]/60">
              © {new Date().getFullYear()} LaSiesta Cerâmica.
              <br />
              Todos os direitos reservados.
            </p>
          </div>

          {/* Localização */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Localização</h3>

            <div className="space-y-3 text-[#f5eee6]/80">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />

                <div>
                  <p>Rua Santos Pereira, 557</p>
                  <p>Cidade Nova - Franca/SP</p>
                  <p>CEP: 14401-130</p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/R.+Santos+Pereira,+557,+Cidade+Nova,+Franca+-+SP,+14401-130"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  text-sm
                  text-[#f5eee6]
                  hover:text-white
                  transition-colors
                  underline-offset-4
                  hover:underline
                "
              >
                Ver no mapa
              </a>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contato</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#f5eee6]/80">
                <Phone size={18} />
                <span>(16) 99140-1921</span>
              </div>

              <a
                href="https://instagram.com/lasiestaceramica"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-3
                  text-[#f5eee6]/80
                  hover:text-white
                  transition-colors
                "
              >
                <Instagram size={18} />
                <span>@lasiestaceramica</span>
              </a>

              <a
                href="https://wa.me/5516991401921?text=Olá!%20Gostaria%20de%20mais%20informações"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-3
                  text-[#f5eee6]/80
                  hover:text-white
                  transition-colors
                "
              >
                <SiWhatsapp size={18} />
                <span>Enviar mensagem</span>
              </a>
            </div>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-center text-sm text-[#f5eee6]/50">
            Feito com cuidado, tempo e barro.
          </p>
        </div>
      </div>
    </footer>
  );
}
