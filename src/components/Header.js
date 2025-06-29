import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartStatus from "./CartStatus";
import WishlistStatus from "./WishlistStatus";

const Header = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="container-fluid">
      <div
        className="py-2 "
        style={{ marginLeft: "100px", marginRight: "100px" }}
      >
        <nav className="navbar px-4 navbar-expand-lg">
          <Link className="navbar-brand text-body-secondary" to="/">
            ShopSphere
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <form
              className="d-flex ms-auto"
              action="/products"
              method="GET"
              style={{ width: "400px" }}
            >
              <div className="input-group">
                <button
                  type="submit"
                  className="input-group-text bg-white border-end-0"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-search"></i>
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  name="q"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control border-start-0"
                />
              </div>
            </form>

            <div className="ms-auto d-flex align-items-center">
              <button className="btn btn-secondary me-3">Login</button>
              <Link
                className="bi bi-person-circle text-secondary mx-3"
                to="/profile"
              ></Link>

              <Link className="text-decoration-none me-2" to="/wishlistPage">
                <div className="position-relative d-inline-block">
                  <i className="bi bi-heart me-1 text-body-secondary"></i>
                  <WishlistStatus />
                </div>
              </Link>

              <Link
                to="/cartPage"
                className="text-decoration-none text-body-secondary me-3"
              >
                <div className="position-relative d-inline-block">
                  <i className="bi bi-cart text-body-secondary fs-5"></i>
                  <CartStatus />
                </div>
                <span className="ms-1">Cart</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
