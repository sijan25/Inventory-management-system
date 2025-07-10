import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/ui/Layout";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { useProducts } from "../contexts/ProductContext";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    itemCode: "",
    description: "",
    stockSize: "",
    storesAvailability: "",
    productPhotos: "",
    category: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await addProduct({
        name: formData.name,
        itemCode: formData.itemCode,
        description: formData.description,
        stock: parseInt(formData.stockSize) || 0,
        storesAvailability: formData.storesAvailability,
        productPhotos: formData.productPhotos,
        category: formData.category,
        price: parseFloat(formData.price) || 0,
      });

      setSuccess("Producto agregado exitosamente");

      // Resetear formulario
      setFormData({
        name: "",
        itemCode: "",
        description: "",
        stockSize: "",
        storesAvailability: "",
        productPhotos: "",
        category: "",
        price: "",
      });

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (error) {
      setError("Error al agregar el producto: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Add product</h1>

          {error && (
            <Alert type="error" onClose={() => setError("")} className="mb-6">
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              type="success"
              onClose={() => setSuccess("")}
              className="mb-6"
            >
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Columna Izquierda */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
                    placeholder=""
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-gray-900 placeholder-gray-500 resize-none"
                    placeholder=""
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
                    placeholder=""
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    required
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Columna Derecha */}
              <div className="space-y-6">
                {/* Item code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item code<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemCode"
                    value={formData.itemCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
                    placeholder=""
                  />
                </div>

                {/* Stock size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock size<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stockSize"
                    value={formData.stockSize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
                    placeholder=""
                  />
                </div>

                {/* Stores availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stores availability<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="storesAvailability"
                      value={formData.storesAvailability}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="">Select availability</option>
                      <option value="all-stores">All stores</option>
                      <option value="store-1">Store 1</option>
                      <option value="store-2">Store 2</option>
                      <option value="store-3">Store 3</option>
                      <option value="store-4">Store 4</option>
                      <option value="store-5">Store 5</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Product photos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product photos<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="productPhotos"
                    value={formData.productPhotos}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-4 px-16 rounded-lg transition-colors duration-200 text-lg"
              >
                {loading ? "Saving..." : "Save product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
