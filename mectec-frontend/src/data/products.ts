import imgSkruv from "../assets/images/skruv.jpg";
import imgSkruvTwo from "../assets/images/skruv2.jpg";
import imgSkruvTree from "../assets/images/skruv3.jpg";
import imgSkruvFour from "../assets/images/skruv4.jpg";

export interface Product {
  id: number;
  title: string;
  articleNumber: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1001,
    title: "Skruv M4",
    articleNumber: "SKR-M4-20",
    category: "Skruvar",
    price: 1.5,
    imageUrl: imgSkruv,
    stock: 500,
    description: "En standard möbelskruv i dimensionen M4x20 mm, tillverkad i galvaniserat stål för ökad rostbeständighet. Lämplig för montering av mindre trädetaljer, beslag och möbelkomponenter. Krysspår (PH2) för enkel montering med skruvdragare."
  },
  {
    id: 1002,
    title: "Skruv M5",
    articleNumber: "SKR-M5-30",
    category: "Skruvar",
    price: 2,
    imageUrl: imgSkruvTwo,
    stock: 7000,
    description: "Robust möbelskruv i dimensionen M5x30 mm. Försedd med försänkt huvud för en snygg infästning i trä eller spånskiva. Tillverkad i elförzinkat stål för god hållbarhet."
  },
  {
    id: 1003,
    title: "Skruv M6",
    articleNumber: "SKR-M6-40",
    category: "Skruvar",
    price: 2,
    imageUrl: imgSkruvTree,
    stock: 100,
    description: "Extra stark skruv i dimensionen M6x40 mm. Passar för tyngre möbelmontage där extra bärighet krävs. Tillverkad i rostfritt stål (A2) för att tåla fuktiga miljöer."
  },
  {
    id: 1004,
    title: "Skruv M6", 
    articleNumber: "SKR-M6-40-SS",
    category: "Skruvar",
    price: 2.5,
    imageUrl: imgSkruvFour,
    stock: 0,
    description: "Extra stark skruv i dimensionen M6x40 mm. Passar för tyngre möbelmontage där extra bärighet krävs. Tillverkad i rostfritt stål (A2) för att tåla fuktiga miljöer."
  },
];
