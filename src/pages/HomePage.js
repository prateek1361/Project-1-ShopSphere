import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";

const HomePage = () => {
  const { data: categories = [] } = useFetch(
    "https://shop-sphere-eosin.vercel.app/categories"
  );
  const { data: products = [] } = useFetch(
    "https://shop-sphere-eosin.vercel.app/products",
    []
  );

  return (
    <div className="mt-2 bg-light">
      <div className="container-fluid">
        <div style={{ marginLeft: "120px", marginRight: "120px" }}>
          <div className="row">
            {categories.map((category) => (
              <div className="col-md-3 mb-4" key={category.id}>
                <Link
                  to={`/products?category=${category.name}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card">
                    <img
                      src={category.image}
                      className="card-img-fluid"
                      alt={category.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        {category.name}
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-body-secondary">
            <div className="row">
              <h2 className="text-center my-4 font-monospace text-black">
                Top Deals
              </h2>
              {products
                .filter((p) => p.topDeal)
                .map((product) => (
                  <div className="col-md-2 mb-4 text-center" key={product.id}>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid rounded mb-1"
                        style={{
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                    <p className="fw-medium">{product.name}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="row ">
            <div className="col-md-6  mt-4">
              <div className="bg-body-secondary text-black mt-4">
                <div className="row">
                  <div className="col-md-5">
                    <Link to={"/products"}>
                      <img
                        src={
                          "https://images.unsplash.com/photo-1641745921155-6e62d2cd4131?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt="New Arrival"
                        className="img-fluid rounded mx-5 my-5  "
                        style={{
                          width: "330px",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="col-md-7 p-5">
                    <p className="fs-5">New Arrivals</p>
                    <h4 className="pt-5">Summer Collection</h4>
                    <p>Check out our best summer collection.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-4">
              <div className="bg-body-secondary text-black mt-4">
                <div className="row">
                  <div className="col-md-5">
                    <Link to={"/products"}>
                      <img
                        src={
                          "https://images.unsplash.com/photo-1660844817855-3ecc7ef21f12?q=80&w=972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt="Top Picks"
                        className="img-fluid rounded mx-5 my-5 d"
                        style={{
                          width: "330px",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="col-md-7 p-5">
                    <p className="fs-5">Suggested Items</p>
                    <h4 className="pt-5">Top Rated</h4>
                    <p>Check out Apple Series 9.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
