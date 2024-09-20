import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddProductModal from './AddProductModal'; 

const categories = [
  { id: 1, name: 'Mobile Phones' },
  { id: 2, name: 'Laptops' },
  { id: 3, name: 'Cars' }
];

const CategoryList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      
      <button onClick={toggleModal}>Add New Product</button>

      {isModalOpen && <AddProductModal toggleModal={toggleModal} />}
    </div>
  );
};

export default CategoryList;
