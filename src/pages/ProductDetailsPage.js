import { useParams } from "react-router-dom";
import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";

export default function ProductDetailPage() {
  const { data: products = [] } = useFetch(
    "https://shop-sphere-eosin.vercel.app/products",
    []
  );
  const [quantity, setQuantity] = useState(1);
  const increaseQty = () => setQuantity((qty) => qty + 1);
  const decreaseQty = () => setQuantity((qty) => (qty > 1 ? qty - 1 : 1));
  const { productId } = useParams();
  const { addToCart, addToWishlist } = useShop();
  const product = products.find((prod) => prod.id === productId);

  if (!product) {
    return <div className="container mt-5">Product not found</div>;
  }

  const originalPrice = Math.round(product.price * 1.25);

  const renderStars = (rating) => {
    const fullStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return fullStars + emptyStars;
  };

  return (
    <div className="bg-body-secondary py-2">
      <div className="container mt-5 bg-white p-4 rounded">
        <section>
          <div className="row">
            <div className="col-md-5">
              <div className="card text-center">
                <div className="bg-body-secondary p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: "500px", objectFit: "contain" }}
                  />
                </div>

                <div className="mt-2">
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="btn btn-primary me-2 w-100 rounded-0"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => addToWishlist(product)}
                    className="btn btn-secondary me-2 w-100 rounded-0 mt-2"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <h2>{product.name}</h2>
              <p className="fs-5 fw-bold">
                ₹{product.price}{" "}
                <span className="text-muted text-decoration-line-through fs-6">
                  ₹{originalPrice}
                </span>
                <p className="text-success ms-2">(20% OFF)</p>
              </p>

              <p>
                {product.rating}{" "}
                <span className="text-warning fs-5">
                  {renderStars(product.rating)}{" "}
                </span>
              </p>

              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label fw-semibold">
                  Quantity:
                </label>
                <div className="input-group w-25">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={decreaseQty}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    id="quantity"
                    value={quantity}
                    readOnly
                    className="form-control text-center"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={increaseQty}
                  >
                    +
                  </button>
                </div>
              </div>

              <hr />
              <div className="d-flex justify-content-between mt-4 text-center">
                <div>
                  <i className="bi bi-truck fs-4"></i>
                  <p className="small">Free Delivery</p>
                </div>
                <div>
                  <i className="bi bi-arrow-counterclockwise fs-4"></i>
                  <p className="small">Easy Returns</p>
                </div>
                <div>
                  <i className="bi bi-shield-check fs-4"></i>
                  <p className="small">Secure Purchase</p>
                </div>
                <div>
                  <i class="bi bi-currency-rupee fs-4"></i>
                  <p>Pay on Delivery</p>
                </div>
              </div>
              <hr />
              <h5>Description:</h5>
              <ul>
                <li>{product.description}</li>
              </ul>
            </div>
          </div>
        </section>
        <hr />
        <section className="mt-5">
          <h3>More items you may like</h3>
          <div className="row">
            {products
              .filter(
                (item) =>
                  item.category === product.category && item.id !== product.id
              )
              .slice(0, 4)
              .map((item) => (
                <div className="col-md-3 mt-3" key={item.id}>
                  <div className="card h-100">
                    <div className="bg-body-secondary py-3">
                      <Link to={`/product/${item.id}`}>
                        <img
                          src={item.image}
                          className="card-img-top"
                          style={{ height: "200px", objectFit: "contain" }}
                          alt={item.name}
                        />
                      </Link>
                    </div>
                    <div className="card-body text-center pb-1">
                      <h6 className="card-title">{item.name}</h6>
                      <p className="fw-bold">₹{item.price}</p>
                    </div>
                    <div className="card-footer p-0">
                      <button
                        onClick={() => addToCart(item)}
                        className="btn btn-secondary rounded-0 w-100"
                        style={{ marginTop: "-12px" }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
