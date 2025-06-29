import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <div className="col-md-3 mb-4">
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
            <h5 className="card-title text-center">{category.name}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
