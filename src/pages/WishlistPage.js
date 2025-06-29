import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";

export default function WishlistPage() {
  const { wishlist, loading, removeFromWishlist, moveToCart } = useShop();

  if (loading) return <p className="text-center mt-5">Loading wishlist...</p>;

  return (
    <div className="bg-light py-3">
      <div className="container mt-4 text-center">
        <h2 className="mb-4">My Wishlist</h2>
        <div className="row">
          {wishlist.length === 0 && <p>No items in wishlist.</p>}

          {wishlist.map((item) => (
            <div className="col-md-3 mb-4" key={item._id}>
              <div className="card h-100 text-center bg-body-secondary">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="img-fluid p-3"
                  style={{ height: "250px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h6>{item.productId?.name}</h6>
                  <p className="fw-bold">₹{item.productId?.price}</p>

                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    Remove From Wishlist
                  </button>

                  <button
                    className="btn btn-outline-secondary w-100 mt-1"
                    onClick={() => moveToCart(item)}
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
