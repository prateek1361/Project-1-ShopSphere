import { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import useFetch from "../useFetch";

const categories = ["Books", "Electronics", "Clothing", "Furniture"];
const ratings = [4, 3, 2, 1];

export default function ProductListingPage() {
  const { data: products = [] } = useFetch(
    "https://shop-sphere-eosin.vercel.app/products",
    []
  );
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const selectedCategoryFromURL = searchParams.get("category") || "";

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [priceRange, setPriceRange] = useState(500000);
  const [sortOrder, setSortOrder] = useState("");
  const { addToCart, addToWishlist } = useShop();

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedRating("");
    setPriceRange(500000);
    setSortOrder("");
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const queryMatch = product.name.toLowerCase().includes(query);

    const ratingMatch =
      selectedRating === "" || product.rating >= selectedRating;
    const priceMatch = product.price <= priceRange;
    return categoryMatch && queryMatch && ratingMatch && priceMatch;
  });
  let sortedProducts = [...filteredProducts];
  if (sortOrder === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const finalProducts =
    !sortOrder && selectedCategoryFromURL
      ? [
          ...sortedProducts.filter(
            (p) => p.category === selectedCategoryFromURL
          ),
          ...sortedProducts.filter(
            (p) => p.category !== selectedCategoryFromURL
          ),
        ]
      : sortedProducts;

  return (
    <div className="container-fluid mt-4 px-5">
      <div className="row">
        <section className="col-md-3 mt-4 ">
          <div className="d-flex justify-content-between">
            <h5 className="fw-bold">Filters</h5>
            <button onClick={clearFilters}>Clear</button>
          </div>
          <hr />
          <div className="mt-3">
            <h5 className="fw-bold mt-4">Price</h5>
            <div className="mb-3" style={{ maxWidth: "400px" }}>
              <div className="d-flex justify-content-between">
                <span>₹0</span>
                <span>₹250000</span>
                <span>₹500000</span>
              </div>

              <input
                type="range"
                min="0"
                max="500000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="form-range"
              />

              <div>Up to ₹{priceRange}</div>
            </div>
          </div>
          <div>
            <h5 className="fw-bold mt-4">Category</h5>
            {categories.map((category) => (
              <div key={category}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                <label className="ms-2">{category}</label>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h5 className="fw-bold">Rating</h5>
            {ratings.map((rating) => (
              <div key={rating}>
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === rating}
                  onChange={() => setSelectedRating(rating)}
                />
                <label className="ms-2">{rating}★ & above</label>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h5 className="fw-bold">Sort By</h5>
            <div>
              <input
                type="radio"
                name="sort"
                checked={sortOrder === "lowToHigh"}
                onChange={() => setSortOrder("lowToHigh")}
              />
              <label className="ms-2">Price: Low to High</label>
            </div>
            <div>
              <input
                type="radio"
                name="sort"
                checked={sortOrder === "highToLow"}
                onChange={() => setSortOrder("highToLow")}
              />
              <label className="ms-2">Price: High to Low</label>
            </div>
          </div>
          <button className="btn btn-secondary mt-3" onClick={clearFilters}>
            Clear Filters
          </button>
        </section>

        <section className="col-md-9 bg-light py-4 px-5">
          <h4 className="fw-bold mb-4">
            Showing {filteredProducts.length} Products
          </h4>
          <div className="row">
            {finalProducts.map((product) => (
              <div className=" col-md-3  mb-4" key={product.id}>
                <div className="card h-100 text-center">
                  <div className="bg-body-secondary">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid rounded p-3"
                        style={{ height: "350px", objectFit: "contain" }}
                      />
                    </Link>
                    <button
                      onClick={() => addToWishlist(product)}
                      className="btn btn-outline-secondary position-absolute bg-white  end-0 m-2 rounded-circle"
                      to="/wishlist"
                    >
                      <i className="bi bi-heart  text-body-secondary"></i>
                    </button>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">{product.name}</h6>
                    <p className="mb-0 fw-bold">₹{product.price}</p>
                  </div>
                  <div className="card-footer p-0">
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn-primary w-100 rounded-0"
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
