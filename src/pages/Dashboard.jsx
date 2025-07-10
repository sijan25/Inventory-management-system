import React from "react";
import Layout from "../components/ui/Layout";
import Card from "../components/ui/Card";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { products, categories, loading, getStats } = useProducts();
  const navigate = useNavigate();
  const stats = getStats();

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
    Clothing: "👔",
    Food: "🍎",
    Toys: "🧸",
    fgf: "📦",
    category: "📦",
  };

  const getCategoryStats = (category) => {
    const categoryProducts = products.filter((p) => p.category === category);
    return {
      name: category,
      count: categoryProducts.length,
      icon: categoryIcons[category] || "📦",
    };
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Cargando...</div>
        </div>
      </Layout>
    );
  }

  const recentProducts = products.slice(0, 5);
  const topCategories = categories
    .map((category) => getCategoryStats(category))
    .sort((a, b) => b.count - a.count); // Eliminar el .slice(0, 6) para mostrar todas

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recent activity</h1>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <div className="text-3xl font-bold text-indigo-600">
              {stats.totalProducts}
            </div>
            <div className="text-sm text-gray-500 mt-1">NEW ITEMS</div>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {stats.totalCategories}
            </div>
            <div className="text-sm text-gray-500 mt-1">CATEGORIES</div>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {stats.lowStock}
            </div>
            <div className="text-sm text-gray-500 mt-1">LOW STOCK</div>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {stats.outOfStock}
            </div>
            <div className="text-sm text-gray-500 mt-1">OUT OF STOCK</div>
          </Card>
        </div>

        {/* Sección inferior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock numbers */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Stock numbers</h3>
              <button
                onClick={() => navigate("/products")}
                className="text-indigo-600 hover:text-indigo-500 text-sm"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        {product.productPhotos ? (
                          <img
                            src={product.productPhotos}
                            alt={product.name}
                            className="w-6 h-6 object-cover rounded"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">📦</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.name}
                      </span>
                    </div>
                    <span className="font-medium text-sm">
                      {product.stock || 0}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">No products yet</p>
                  <button
                    onClick={() => navigate("/add-product")}
                    className="text-indigo-600 hover:text-indigo-500 text-sm mt-2"
                  >
                    Add your first product
                  </button>
                </div>
              )}
            </div>
          </Card>

          {/* Top item categories */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Top item categories</h3>
              <button
                onClick={() => navigate("/categories")}
                className="text-indigo-600 hover:text-indigo-500 text-sm"
              >
                View all
              </button>
            </div>

            {topCategories.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {topCategories.map((category) => (
                  <div
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors cursor-pointer"
                  >
                    <div className="text-2xl mb-2 text-blue-600">
                      {category.icon}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {category.count} items
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl text-gray-300 mb-2">📦</div>
                <p className="text-gray-500 text-sm">No categories yet</p>
                <button
                  onClick={() => navigate("/add-product")}
                  className="text-indigo-600 hover:text-indigo-500 text-sm mt-2"
                >
                  Add products to create categories
                </button>
              </div>
            )}
          </Card>
        </div>

        {/* Sales Chart Placeholder */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Sales</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl text-gray-300 mb-2">📊</div>
              <p className="text-gray-500">Sales chart coming soon</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
