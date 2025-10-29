import imgSkruv from "../assets/images/skruv.jpg";
import imgSkruvTwo from "../assets/images/skruv2.jpg";
import imgSkruvTree from "../assets/images/skruv3.jpg";
import imgSkruvFour from "../assets/images/skruv4.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  storlek?: string;
  image: string;
  use: string;
  saldo?: number;
  description: string;
}

export const products: Product[] = [
  {
    id: 1001,
    name: "Skruv M4",
    price: 1.5,
    storlek: "M4x20mm",
    image: imgSkruv,
    use: "inomhusmöbler",
    saldo: 500,
    description: "En standard möbelskruv i dimensionen M4x20 mm, tillverkad i galvaniserat stål för ökad rostbeständighet. Lämplig för montering av mindre trädetaljer, beslag och möbelkomponenter. Krysspår (PH2) för enkel montering med skruvdragare."
  },
  {
    id: 1002,
    name: "Skruv M5",
    price: 2,
    storlek: "M5x30mm",
    image: imgSkruvTwo,
    use: "inomhusmöbler, utomhusmöbler",
    saldo: 7000,
    description: "Robust möbelskruv i dimensionen M5x30 mm. Försedd med försänkt huvud för en snygg infästning i trä eller spånskiva. Tillverkad i elförzinkat stål för god hållbarhet."
  },
  {
    id: 1003,
    name: "Skruv M6",
    price: 2,
    storlek: "M6x40mm",
    image: imgSkruvTree,
    use: "köksinredning, utomhusmöbler",
    saldo: 100,
    description: "Extra stark skruv i dimensionen M6x40 mm. Passar för tyngre möbelmontage där extra bärighet krävs. Tillverkad i rostfritt stål (A2) för att tåla fuktiga miljöer."
  },
  {
    id: 1004,
    name: "Skruv M6", 
    price: 2.5,
    storlek: "M6x40mm",
    image: imgSkruvFour,
    use: "köksinredning, utomhusmöbler",
    saldo: 0,
    description: "Extra stark skruv i dimensionen M6x40 mm. Passar för tyngre möbelmontage där extra bärighet krävs. Tillverkad i rostfritt stål (A2) för att tåla fuktiga miljöer."
  },
];
