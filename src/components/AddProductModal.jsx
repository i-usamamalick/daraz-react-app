import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const AddProductModal = ({ toggleModal }) => {
  const { addNewProduct } = useContext(CartContext);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    specifications: '',
    price: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
        setImageFile(file);
      };
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewProduct(newProduct);
    toggleModal();
  };

  return (
    <div className="modal">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} required />
        </label>
        <label>
          Category:
          <select name="category" value={newProduct.category} onChange={handleInputChange} required>
            <option value="">Select Category</option>
            <option value="1">Mobile Phones</option>
            <option value="2">Laptops</option>
            <option value="3">Cars</option>
          </select>
        </label>
        <label>
          Specifications:
          <input type="text" name="specifications" value={newProduct.specifications} onChange={handleInputChange} required />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} required />
        </label>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
          {imageFile && <img src={newProduct.image} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
        </label>
        <button type="submit">Add Product</button>
      </form>
      <button onClick={toggleModal}>Close</button>
    </div>
  );
};

export default AddProductModal;
