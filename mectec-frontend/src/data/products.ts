import imgSkruv from "../assets/images/skruv.jpg";
import imgSkruvTwo from "../assets/images/skruv2.jpg";
import imgSkruvTree from "../assets/images/skruv3.jpg";
import imgSkruvFour from "../assets/images/skruv4.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Skruv M6",
    price: 99,
    image: imgSkruv,
    description: "Stålskruv för industriellt bruk."
  },
  {
    id: 2,
    name: "Sågmaskin X2000",
    price: 34,
    image: imgSkruvTwo,
    description: "Kraftfull sågmaskin för verkstäder."
  },
  {
    id: 3,
    name: "Skruv Pro",
    price: 99,
    image: imgSkruvTree,
    description: "Högpresterande borrmaskin."
  },
  {
    id: 4,
    name: "Skruv M6", 
    price: 18,
    image: imgSkruvFour,
    description: "Högpresterande borrmaskin."
  },
];
