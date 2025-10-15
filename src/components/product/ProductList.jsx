import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';


const API_URL = 'http://localhost:9001/product';

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const fetchProducts = async (search = '') => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}`);
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(query);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8 gap-2"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiSearch /> Search
        </button>
      </form>

      {loading ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition"
            >
              <img
                src={p.imageUrl || 'https://via.placeholder.com/200x150'}
                alt={p.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 truncate">{p.name}</h3>
                <p className="text-gray-500 text-sm">{p.category || 'General'}</p>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="font-bold text-blue-600">₹{p.price}</span>
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                  <FaShoppingCart /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

