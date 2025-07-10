import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/ui/Layout";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { useProducts } from "../contexts/ProductContext";

const Categories = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("👕");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { products, categories, loading } = useProducts();
  const navigate = useNavigate();

  // Iconos para las categorías
  const categoryIcons = {
    "T-shirts": "👕",
    Bottoms: "👖",
    Coats: "🧥",
    Jeans: "👖",
    Tops: "👚",
    Accessories: "👓",
    Shoes: "👟",
    Bags: "👜",
    Hats: "🧢",
    Watches: "⌚",
    Jewelry: "💍",
    Electronics: "📱",
    Books: "📚",
    Sports: "⚽",
    Beauty: "💄",
    Home: "🏠",
  };

  const getCategoryStats = (category) => {
    const categoryProducts = products.filter((p) => p.category === category);
    return {
      total: categoryProducts.length,
      inStock: categoryProducts.filter((p) => p.stock > 0).length,
      outOfStock: categoryProducts.filter((p) => p.stock === 0).length,
      totalValue: categoryProducts.reduce(
        (sum, p) => sum + p.price * p.stock,
        0
      ),
    };
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      // En un caso real, aquí agregarías la categoría a la base de datos
      setSuccess(`Categoría "${newCategory}" agregada exitosamente`);
      setNewCategory("");
      setShowAddModal(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const getLastUpdateDate = () => {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return now.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading categories...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-500 mt-1">
              Last update {getLastUpdateDate()}
            </p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add Category</span>
          </Button>
        </div>

        {success && (
          <Alert type="success" onClose={() => setSuccess("")}>
            {success}
          </Alert>
        )}

        {error && (
          <Alert type="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const stats = getCategoryStats(category);
            const icon = categoryIcons[category] || "📦";

            return (
              <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              >
                {/* Icon Section */}
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 h-48 flex items-center justify-center">
                  <div className="text-6xl text-indigo-600">{icon}</div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {category}
                  </h3>
                  <p className="text-gray-500 text-sm">{stats.total} items</p>
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="col-span-full">
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No categories found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding your first product to create categories.
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => navigate("/add-product")}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add Product
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Category Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add New Category
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Icon
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {Object.entries(categoryIcons)
                      .slice(0, 12)
                      .map(([name, icon]) => (
                        <button
                          key={name}
                          onClick={() => setSelectedIcon(icon)}
                          className={`p-2 rounded-lg text-2xl hover:bg-gray-100 ${
                            selectedIcon === icon
                              ? "bg-indigo-100 ring-2 ring-indigo-500"
                              : ""
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCategory}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Category
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Categories;
