'use client';

type Product = {
  id: number;
  nome: string;
  preco: number;
  cores: { name: string; hex: string }[];
  categoria: string;
  dimensoes: string;
  material: string;
  image: string;
  destaque: boolean;
  description: string; // Added description field
};

export default function mockProducts(): Product[] {

    const handleMockImage = (categoria: string) => {
  switch (categoria.toLowerCase()) {
    case "copos":
      return "/image/IMG_0190.JPG";
    case "pratos":
      return "/image/IMG_0036.JPG";
    case "bowls":
      return "/image/IMG_0070.JPG";
    case "tigelas":
      return "/image/IMG_0229.JPG";
    case "vasos":
      return "/image/IMG_0152.JPG";
    case "canecas":
      return "/image/IMG_0094.JPG";
    case "saboneteiras":
      return "/image/IMG_0094.JPG";
    case "manteigueiras":
      return "/image/IMG_0129.JPG";
    case "bandejas":
      return "/image/IMG_0023.JPG";
    default:
      return "/image/IMG_0065.JPG";
  }
};

const products = [
  {
    id: 1,
    nome: "Copo de Cerâmica Rústico",
    preco: 35.0,
    cores: [
      { name: "Bege", hex: "#F5F5DC" },
      { name: "Marrom", hex: "#964B00" },
      { name: "Verde Musgo", hex: "#556B2F" },
    ],
    categoria: "Copos",
    dimensoes: "8x10cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Copos"),
    destaque: true,
    description:
      "Feito à mão com acabamento rústico e textura natural, este copo de cerâmica traz o equilíbrio entre simplicidade e elegância. Ideal para cafés, sucos ou chás, ele valoriza o toque artesanal e transforma qualquer momento em uma pausa cheia de aconchego."
  },
  {
    id: 2,
    nome: "Prato Raso Mediterrâneo",
    preco: 48.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Azul", hex: "#0000FF" },
    ],
    categoria: "Pratos",
    dimensoes: "27cm de diâmetro",
    material: "Cerâmica artesanal",
    image: handleMockImage("Pratos"),
    destaque: false,
    description:
      "Inspirado nas cores vibrantes e na leveza do Mediterrâneo, este prato raso une estética e funcionalidade. Seu acabamento artesanal e tonalidades suaves criam uma peça que celebra o prazer de servir bem e apreciar o momento."
  },
  {
    id: 3,
    nome: "Prato Fundo Minimalista",
    preco: 52.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Branco Gelo", hex: "#F8F8FF" },
    ],
    categoria: "Pratos",
    dimensoes: "22cm de diâmetro",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Pratos"),
    destaque: false,
    description:
      "Com design limpo e elegante, este prato fundo é ideal para sopas e massas. Seu acabamento esmaltado realça a textura da cerâmica, trazendo uma atmosfera moderna e refinada à mesa sem perder a autenticidade do feito à mão."
  },
  {
    id: 4,
    nome: "Bowl Orgânico Pequeno",
    preco: 40.0,
    cores: [
      { name: "Terracota", hex: "#E2725B" },
      { name: "Areia", hex: "#F4A460" },
    ],
    categoria: "Bowls",
    dimensoes: "15x7cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Bowls"),
    destaque: false,
    description:
      "Este bowl pequeno, com formato natural e curvas suaves, reflete a beleza do imperfeito. Ideal para porções individuais, frutas ou sobremesas, ele traz um toque acolhedor e rústico, perfeito para quem aprecia o artesanal."
  },
  {
    id: 5,
    nome: "Tigela Tradicional Japonesa",
    preco: 60.0,
    cores: [
      { name: "Preto Fosco", hex: "#0A0A0A" },
      { name: "Vermelho", hex: "#FF0000" },
    ],
    categoria: "Tigelas",
    dimensoes: "18x9cm",
    material: "Cerâmica de alta temperatura",
    image: handleMockImage("Tigelas"),
    destaque: false,
    description:
      "Inspirada na estética japonesa, esta tigela tradicional combina equilíbrio e funcionalidade. Seu acabamento fosco e textura marcante tornam cada refeição — seja ramen, arroz ou caldos — uma experiência visual e sensorial."
  },
  {
    id: 6,
    nome: "Vaso Decorativo Ondas",
    preco: 120.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Azul Turquesa", hex: "#40E0D0" },
    ],
    categoria: "Vasos",
    dimensoes: "25x15cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Vasos"),
    destaque: false,
    description:
      "Com design fluido e textura inspirada nas ondas do mar, este vaso é uma peça decorativa que transmite leveza e movimento. Perfeito para flores naturais ou secas, ele adiciona serenidade e sofisticação a qualquer espaço."
  },
  {
    id: 7,
    nome: "Caneca com Alça Orgânica",
    preco: 42.0,
    cores: [
      { name: "Bege", hex: "#F5F5DC" },
      { name: "Cinza", hex: "#808080" },
    ],
    categoria: "Canecas",
    dimensoes: "9x12cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Canecas"),
    destaque: false,
    description:
      "Com formato fluido e pegada confortável, esta caneca celebra o design orgânico e a beleza do simples. Feita à mão, é ideal para momentos de pausa — seja para um café, chá ou chocolate quente em dias tranquilos."
  },
  {
    id: 8,
    nome: "Saboneteira Texturizada",
    preco: 28.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Azul Claro", hex: "#ADD8E6" },
    ],
    categoria: "Saboneteiras",
    dimensoes: "12x9cm",
    material: "Cerâmica com relevo",
    image: handleMockImage("Saboneteiras"),
    destaque: false,
    description:
      "A textura delicada e o acabamento artesanal tornam esta saboneteira uma peça funcional e decorativa. Perfeita para banheiros ou lavabos, ela ajuda a manter o sabonete seco enquanto adiciona charme e naturalidade ao ambiente."
  },
  {
    id: 9,
    nome: "Manteigueira Clássica",
    preco: 55.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Amarelo Suave", hex: "#FFFACD" },
    ],
    categoria: "Manteigueiras",
    dimensoes: "16x10cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Manteigueiras"),
    destaque: false,
    description:
      "A manteigueira clássica é sinônimo de elegância simples. Feita em cerâmica artesanal, mantém a manteiga fresca e traz um toque acolhedor às mesas de café da manhã ou brunch, unindo funcionalidade e estilo."
  },
  {
    id: 10,
    nome: "Bandeja Oval Minimal",
    preco: 75.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Preto", hex: "#000000" },
    ],
    categoria: "Bandejas",
    dimensoes: "30x18cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Bandejas"),
    destaque: false,
    description:
      "Com linhas suaves e acabamento moderno, esta bandeja oval é ideal para servir ou decorar. Seu visual minimalista combina facilmente com diferentes estilos, tornando-se uma peça versátil e sofisticada."
  },
  {
    id: 11,
    nome: "Copo Esmaltado Azul",
    preco: 32.0,
    cores: [
      { name: "Azul Claro", hex: "#ADD8E6" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Copos",
    dimensoes: "8x9cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Copos"),
    destaque: false,
    description:
      "Com brilho suave e tonalidade inspirada no céu, o copo esmaltado azul é perfeito para o dia a dia. Seu toque delicado e acabamento artesanal tornam cada gole uma experiência agradável e cheia de charme."
  },
  {
    id: 12,
    nome: "Prato Rústico de Pedra",
    preco: 50.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Marrom", hex: "#964B00" },
    ],
    categoria: "Pratos",
    dimensoes: "26cm de diâmetro",
    material: "Cerâmica de alta temperatura",
    image: handleMockImage("Pratos"),
    destaque: false,
    description:
      "Inspirado nas texturas naturais da pedra, este prato rústico combina resistência e autenticidade. Ideal para servir pratos quentes, ele traz uma presença marcante e natural à mesa."
  },
  {
    id: 13,
    nome: "Prato de Sobremesa Floral",
    preco: 38.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Verde", hex: "#008000" },
      { name: "Amarelo", hex: "#FFFF00" },
    ],
    categoria: "Pratos",
    dimensoes: "20cm de diâmetro",
    material: "Cerâmica pintada à mão",
    image: handleMockImage("Pratos"),
    destaque: false,
    description:
      "Com delicada pintura floral feita à mão, este prato de sobremesa adiciona cor e leveza à mesa. Ideal para doces, frutas ou pequenas porções, ele traduz a alegria do artesanal em cada detalhe."
  },
  {
    id: 14,
    nome: "Bowl Minimalista Branco",
    preco: 35.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Cinza", hex: "#808080" },
    ],
    categoria: "Bowls",
    dimensoes: "14x6cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Bowls"),
    destaque: false,
    description:
      "Com design limpo e contemporâneo, este bowl branco é um coringa na cozinha. Ideal para servir pequenas porções, cereais ou acompanhamentos, ele combina simplicidade e elegância em uma única peça."
  },
  {
    id: 15,
    nome: "Tigela Grande Oriental",
    preco: 70.0,
    cores: [
      { name: "Preto", hex: "#000000" },
      { name: "Azul", hex: "#0000FF" },
    ],
    categoria: "Tigelas",
    dimensoes: "22x10cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Tigelas"),
    destaque: false,
    description:
      "Inspirada no design oriental, esta tigela grande é ideal para servir pratos como ramen, saladas ou massas. Seu acabamento esmaltado reflete o cuidado em cada detalhe e transforma o servir em um ritual."
  },
  {
    id: 16,
    nome: "Vaso Alto Texturizado",
    preco: 150.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Bege", hex: "#F5F5DC" },
    ],
    categoria: "Vasos",
    dimensoes: "40x18cm",
    material: "Cerâmica com relevo",
    image: handleMockImage("Vasos"),
    destaque: false,
    description:
      "Com textura marcante e linhas verticais, este vaso alto é uma peça de destaque. Ideal para arranjos florais ou decoração de interiores, ele combina robustez e elegância com o toque natural da cerâmica artesanal."
  },
  {
    id: 17,
    nome: "Caneca de Chá Minimal",
    preco: 38.0,
    cores: [
      { name: "Verde", hex: "#008000" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Canecas",
    dimensoes: "8x11cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Canecas"),
    destaque: false,
    description:
      "Simples e equilibrada, esta caneca minimalista é perfeita para momentos de pausa. Seu formato delicado e textura suave convidam à contemplação — o complemento ideal para um bom chá."
  },
  {
    id: 18,
    nome: "Saboneteira Minimal",
    preco: 26.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Saboneteiras",
    dimensoes: "11x8cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Saboneteiras"),
    destaque: false,
    description:
      "Com acabamento liso e discreto, esta saboneteira minimalista é ideal para quem aprecia ambientes limpos e elegantes. Sua forma prática e durável une estética e funcionalidade no dia a dia."
  },
  {
    id: 19,
    nome: "Manteigueira Modernista",
    preco: 60.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Azul", hex: "#0000FF" },
    ],
    categoria: "Manteigueiras",
    dimensoes: "18x11cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Manteigueiras"),
    destaque: false,
    description:
      "Com linhas retas e contraste de cores sutis, esta manteigueira modernista é funcional e elegante. Feita em cerâmica artesanal, adiciona um toque contemporâneo e criativo à mesa."
  },
  {
    id: 20,
    nome: "Bandeja Retangular",
    preco: 80.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Preto", hex: "#000000" },
    ],
    categoria: "Bandejas",
    dimensoes: "35x20cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Bandejas"),
    destaque: false,
    description:
      "Elegante e versátil, esta bandeja retangular é ideal para servir refeições, cafés ou como base decorativa. Seu acabamento fino e formato equilibrado transformam o comum em sofisticado."
  },
  {
    id: 21,
    nome: "Copo Rústico Terracota",
    preco: 34.0,
    cores: [
      { name: "Terracota", hex: "#E2725B" },
      { name: "Areia", hex: "#F4A460" },
    ],
    categoria: "Copos",
    dimensoes: "7x10cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Copos"),
    destaque: false,
    description:
      "Com tom terroso e textura levemente porosa, este copo de terracota evoca o calor do artesanal. Ideal para bebidas geladas, é uma peça que une rusticidade e delicadeza."
  },
  {
    id: 22,
    nome: "Prato de Jantar Clássico",
    preco: 55.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Dourado", hex: "#FFD700" },
    ],
    categoria: "Pratos",
    dimensoes: "28cm de diâmetro",
    material: "Cerâmica pintada à mão",
    image: handleMockImage("Pratos"),
    destaque: false,
    description:
      "Com bordas pintadas à mão e detalhes dourados, este prato de jantar clássico traz sofisticação e calor à mesa. Ideal para ocasiões especiais, une tradição e requinte em uma única peça."
  },
  {
    id: 23,
    nome: "Bowl Colorido Esmaltado",
    preco: 45.0,
    cores: [
      { name: "Vermelho", hex: "#FF0000" },
      { name: "Azul", hex: "#0000FF" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Bowls",
    dimensoes: "16x8cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Bowls"),
    destaque: false,
    description:
      "Vibrante e expressivo, este bowl esmaltado é perfeito para trazer cor e energia à mesa. Cada peça é única, refletindo o trabalho cuidadoso das mãos que moldam e esmaltam a cerâmica."
  },
  {
    id: 24,
    nome: "Tigela Pequena de Chá",
    preco: 35.0,
    cores: [
      { name: "Verde Musgo", hex: "#556B2F" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Tigelas",
    dimensoes: "12x7cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Tigelas"),
    destaque: false,
    description:
      "Esta tigela pequena, inspirada nas cerimônias do chá oriental, tem formato leve e natural. Ideal para chás, caldos leves ou sobremesas, oferece uma experiência sensorial serena e elegante."
  },
  {
    id: 25,
    nome: "Vaso Baixo Decorativo",
    preco: 110.0,
    cores: [
      { name: "Azul", hex: "#0000FF" },
      { name: "Cinza", hex: "#808080" },
    ],
    categoria: "Vasos",
    dimensoes: "20x12cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Vasos"),
    destaque: false,
    description:
      "Este vaso baixo combina linhas suaves e acabamento brilhante para criar um ponto de destaque discreto. Ideal para composições florais horizontais ou como peça decorativa isolada."
  },
  {
    id: 26,
    nome: "Caneca Esmaltada Alta",
    preco: 48.0,
    cores: [
      { name: "Azul Escuro", hex: "#00008B" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Canecas",
    dimensoes: "10x13cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Canecas"),
    destaque: false,
    description:
      "Com formato alongado e esmalte profundo, esta caneca alta é ideal para cafés longos ou chás especiais. Cada peça é moldada manualmente, resultando em variações únicas e cheias de personalidade."
  },
  {
    id: 27,
    nome: "Saboneteira com Drenagem",
    preco: 30.0,
    cores: [
      { name: "Bege", hex: "#F5F5DC" },
      { name: "Cinza Claro", hex: "#D3D3D3" },
    ],
    categoria: "Saboneteiras",
    dimensoes: "13x9cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Saboneteiras"),
    destaque: false,
    description:
      "Prática e charmosa, esta saboneteira possui pequenos sulcos que permitem o escoamento da água, mantendo o sabonete seco. Seu design artesanal traz um toque natural e acolhedor ao banheiro."
  },
  {
    id: 28,
    nome: "Manteigueira de Cúpula Translúcida",
    preco: 65.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Ambar", hex: "#FFBF00" },
    ],
    categoria: "Manteigueiras",
    dimensoes: "17x10cm",
    material: "Cerâmica e vidro artesanal",
    image: handleMockImage("Manteigueiras"),
    destaque: false,
    description:
      "Uma combinação de cerâmica e vidro translúcido cria uma manteigueira elegante e funcional. O design leve e contemporâneo mantém a manteiga fresca enquanto embeleza a mesa com sutileza."
  },
  {
    id: 29,
    nome: "Bandeja Circular Esmaltada",
    preco: 95.0,
    cores: [
      { name: "Verde", hex: "#008000" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Bandejas",
    dimensoes: "28cm de diâmetro",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Bandejas"),
    destaque: false,
    description:
      "Esta bandeja circular esmaltada é um equilíbrio entre design artesanal e funcionalidade. Ideal para servir cafés ou sobremesas, traz um toque natural e sofisticado à rotina."
  },
  {
    id: 30,
    nome: "Copo de Degustação",
    preco: 30.0,
    cores: [
      { name: "Cinza Claro", hex: "#D3D3D3" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Copos",
    dimensoes: "6x8cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Copos"),
    destaque: false,
    description:
      "Compacto e delicado, este copo de degustação é perfeito para cafés curtos, vinhos ou licores. Seu formato pequeno e textura suave valorizam a experiência sensorial em cada detalhe."
  },
];

    return products;
}