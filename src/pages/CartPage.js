import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const {
    cart,
    loading,
    removeFromCart,
    moveToWishlist,
    increaseQty,
    decreaseQty,
  } = useShop();

  if (loading) return <p className="text-center mt-5">Loading cart...</p>;

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * (item.quantity || 1),
    0
  );
  const discount = Math.round(totalPrice * 0.1);
  const deliveryCharge = 199;
  const totalAmount = totalPrice - discount + deliveryCharge;

  return (
    <div className="bg-light py-3">
      <div className="container mt-4">
        <h2 className="mb-4 text-center">My Cart ({cart.length})</h2>

        {cart.length === 0 ? (
          <p className="text-center">No items in cart.</p>
        ) : (
          <div className="row">
            <div className="col-md-7">
              {cart.map((item) => {
                const product = item.productId || {};
                const originalPrice = Math.round(product.price * 1.25 || 0);
                return (
                  <div className="row mb-4 shadow-sm" key={item._id}>
                    <div className="col-md-4 bg-body-secondary d-flex align-items-center justify-content-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid"
                        style={{ maxHeight: "300px", objectFit: "contain" }}
                      />
                    </div>

                    <div className="col-md-8 bg-white">
                      <h5 className="mt-3">{product.name}</h5>
                      <p className="fw-bold fs-5 mb-2 mt-2">
                        ₹{product.price}{" "}
                        <span className="text-muted text-decoration-line-through fs-6">
                          ₹{originalPrice}
                        </span>
                        <p className="text-success ms-2">50% off</p>
                      </p>

                      <div className="d-flex align-items-center mb-3">
                        <strong className="me-2">Quantity:</strong>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => decreaseQty(item._id)}
                            disabled={item.quantity <= 1}
                          >
                            –
                          </button>
                          <span className="btn btn-light disabled">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => increaseQty(item._id)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        className="btn btn-secondary w-100"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove From Cart
                      </button>
                      <button
                        className="btn btn-outline-dark w-100 mt-2"
                        onClick={() => moveToWishlist(item)}
                      >
                        Move to Wishlist
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price Details */}
            <div className="col-md-5 px-3">
              <div
                className="card p-3 shadow-sm sticky-top"
                style={{ top: "90px" }}
              >
                <h5>PRICE DETAILS</h5>
                <hr />
                <p className="d-flex justify-content-between">
                  <span>
                    Price ({cart.length} item{cart.length > 1 ? "s" : ""})
                  </span>
                  <span>₹{totalPrice}</span>
                </p>
                <p className="d-flex justify-content-between">
                  <span>Discount</span>
                  <span className="text-success">– ₹{discount}</span>
                </p>
                <p className="d-flex justify-content-between">
                  <span>Delivery Charges</span>
                  <span>₹{deliveryCharge}</span>
                </p>
                <hr />
                <p className="d-flex justify-content-between fw-bold">
                  <span>TOTAL AMOUNT</span>
                  <span>₹{totalAmount}</span>
                </p>
                <p className="text-success small">
                  You will save ₹{discount} on this order
                </p>
                <Link to="/checkout" className="btn btn-primary w-100 mt-2">
                  PLACE ORDER
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
