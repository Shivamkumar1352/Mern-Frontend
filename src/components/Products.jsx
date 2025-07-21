import React, { useEffect, useState, useRef } from "react";
import "./Products.css";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      setError("Product Deleted Successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      await axios.post(`${API_URL}/api/products`, form);
      setError("Product added successfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm(product);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      await axios.patch(`${API_URL}/api/products/${editId}`, form);
      setError("Product updated successfully");
      fetchProducts();
      setEditId();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };

  const toggleReadMore = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="prod-page">
      <div className="prod-title">
        <h2>Product Management</h2>
      </div>

      <div className="prod-form-container">
        <form ref={frmRef}>
          <input
            className="prod-form-input"
            name="productName"
            value={form.productName}
            type="text"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />
          <input
            className="prod-form-input"
            name="description"
            value={form.description}
            type="text"
            placeholder="Description"
            onChange={handleChange}
            required
          />
          <input
            className="prod-form-input"
            name="price"
            value={form.price}
            type="text"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <input
            className="prod-form-input"
            name="imgUrl"
            value={form.imgUrl}
            type="text"
            placeholder="Image URL"
            onChange={handleChange}
            required
          />
          {editId ? (
            <>
              <button className="prod-form-btn" onClick={handleUpdate}>Update</button>
              <button className="prod-form-btn" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="prod-form-btn" onClick={handleAdd}>Add</button>
          )}
        </form>
      </div>

      <div className="prod-search-bar">
        <input
          className="prod-search-input"
          type="text"
          placeholder="Search by name..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button className="prod-search-btn" onClick={fetchProducts}>Search</button>
      </div>

      {error && <div className="prod-error">{error}</div>}

      <div className="prod-table-container">
        <table className="prod-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image URL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((value) => (
              <tr key={value._id}>
                <td>{value.productName}</td>
                <td>
                  <div className={`prod-text-cell ${expandedRows.includes(value._id) ? "expanded" : ""}`}>
                    {value.description}
                  </div>
                  {value.description.length > 50 && (
                    <button
                      className="prod-read-more"
                      onClick={() => toggleReadMore(value._id)}
                    >
                      {expandedRows.includes(value._id) ? "Read less" : "Read more"}
                    </button>
                  )}
                </td>
                <td>{value.price}</td>
                <td>{value.imgUrl}</td>
                <td>
                  <button className="prod-action-btn" onClick={() => handleEdit(value)}>Edit</button>
                  <button className="prod-action-btn" onClick={() => handleDelete(value._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prod-pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        Page {page} of {totalPages}
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
