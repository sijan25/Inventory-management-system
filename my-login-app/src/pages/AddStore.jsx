import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/ui/Layout";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { useStores } from "../contexts/StoreContext";

const AddStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    phone: "",
    email: "",
    manager: "",
    employees: "",
    image: "",
    status: "Active",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { addStore } = useStores();
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

      await addStore(formData);
      setSuccess("Store added successfully");

      // Reset form
      setFormData({
        name: "",
        location: "",
        address: "",
        phone: "",
        email: "",
        manager: "",
        employees: "",
        image: "",
        status: "Active",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/stores");
      }, 2000);
    } catch (error) {
      setError("Error adding store: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Store</h1>

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
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                    placeholder="Enter store name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors resize-none"
                    placeholder="Full address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manager
                  </label>
                  <input
                    type="text"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                    placeholder="Manager name"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                    placeholder="store@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Under Construction">
                      Under Construction
                    </option>
                  </select>
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
                {loading ? "Saving..." : "Save Store"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddStore;
