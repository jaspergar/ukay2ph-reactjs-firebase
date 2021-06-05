import React from "react";
import menTop from "../../images/menTop.jpg";
import "../../css/SubcategoryRow.css";
import { Link } from "react-router-dom";

function SubcategoryRow(props) {
  return (
    <div className="subcategoryrow">
      <div className="subcategoryrow__info">
        <p className="subcategoryrow__title">{props.title}</p>
      </div>
      <img src={props.image} alt="" className="subcategoryrow__image" />
      <Link to="/items">
        <button className="subcategoryrow__button">Go</button>
      </Link>
    </div>
  );
}

export default SubcategoryRow;
