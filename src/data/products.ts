export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Pureza Blanca",
    description: "Composición minimalista de lirios y rosas blancas. Ideal para espacios modernos y luminosos.",
    price: 42,
    image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Jardín Silvestre",
    description: "Flores de temporada con un toque rústico y natural. Recogidas directamente del campo.",
    price: 35,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Orquídea Zen",
    description: "Elegancia duradera en maceta de piedra volcánica. Perfecta para regalo duradero.",
    price: 48,
    image: "https://images.unsplash.com/photo-1567606143328-2bbd11419bb5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Ramo de Autor",
    description: "Diseño exclusivo de nuestro jefe de floristas con las mejores flores del día.",
    price: 65,
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Eucalipto & Algodón",
    description: "Composición seca ideal para decoración interior que perdura en el tiempo.",
    price: 28,
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    name: "Caja Luxury Mint",
    description: "Presentación premium en caja de terciopelo verde pastel con 24 rosas seleccionadas.",
    price: 75,
    image: "https://images.unsplash.com/photo-1558985103-b230df875086?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    name: "Tulipanes Holanda",
    description: "Selección de tulipanes importados directamente de los mejores campos holandeses.",
    price: 30,
    image: "https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    name: "Composición Oasis",
    description: "Ramo tropical con aves del paraíso y verdes exóticos para un toque refrescante.",
    price: 55,
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
  }
];
