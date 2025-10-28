import { useParams } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) return <p>Produkten hittades inte.</p>;

  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">{product.name}</h3>
            <p className="card-text">{product.description}</p>
            <h5 className="card-text">{product.price} kr</h5>
            <button className="btn btn-success">Lägg i varukorg</button>
          </div>
        </div>
      </div>
    </div>
  );
}
