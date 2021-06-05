import React from "react";
import { Link } from "react-router-dom";
import "../../css/Category.css";

function Category(props) {
  return (
    <div className="category">
      <div className="category__info">
        <p className="category__title">{props.title}</p>
      </div>
      <img src={props.image} alt="" className="category__image" />
      <Link to="/subcategory">
        <button className="category__button">Shop Now</button>
      </Link>
    </div>
  );
}

export default Category;
