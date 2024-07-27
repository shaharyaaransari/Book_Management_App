import React, { useState } from "react";
import "./AddProduct.css";
import axios from "axios";
const initailState = {
  title: "",
  author: "",
  genre: "",
  price: "",
  image: "",
  createdAt: "",
};
export const AddProduct = () => {
  const [productDetails, setProductDetails] = useState(initailState);
  const { title, price, author, image, genre } = productDetails;

  const handleAddProduct = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: name == "price" ? +value : value,
    });
  };
  const addProduct = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...productDetails,
      createdAt: new Date().toISOString(),
    };

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`https://sample-bakened.onrender.com/books`, updatedProduct, config)
      .then((res) => {
        console.log(res);
        setProductDetails(initailState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-product-container">
      <h2 className="section-title" style={{width:"200px"}}>Admin Section</h2>
      <div className="add-product">
        <h2 style={{width:"200px"}}>Add Product</h2>

        <form onSubmit={addProduct}>
          <label htmlFor="name">
            <b>Name</b>
          </label>
          <input
            type="text"
            id="name"
            value={title}
            name="title"
            placeholder="Enter name"
            onChange={handleAddProduct}
          />

          <label htmlFor="author">
            <b>Author</b>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            onChange={handleAddProduct}
            value={author}
            placeholder="Enter author"
          />

          <label htmlFor="genre">
            <b>Genre</b>
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            onChange={handleAddProduct}
            value={genre}
            placeholder="Enter genre"
          />

          <label htmlFor="price">
            <b>Price</b>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleAddProduct}
            value={price}
            placeholder="Enter price"
          />

          <label htmlFor="image">
            <b>Image URL</b>
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={handleAddProduct}
            placeholder="Enter image URL"
          />

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};
