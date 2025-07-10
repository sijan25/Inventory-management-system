import React, { useState } from "react";
import Layout from "../components/ui/Layout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile } from "firebase/auth";

const Settings = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || "",
    email: currentUser?.email || "",
    store: "John Doe Store",
    status: "Online",
    companyEmail: currentUser?.email || "",
    role: "Manager",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

      // Actualizar perfil de Firebase
      await updateProfile(currentUser, {
        displayName: formData.name,
      });

      setSuccess("Configuración actualizada exitosamente");
    } catch (error) {
      setError("Error al actualizar la configuración: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const permissions = [
    { name: "Customer", read: true, write: true, edit: true, delete: true },
    { name: "Products", read: true, write: true, edit: true, delete: true },
    { name: "Sales", read: true, write: false, edit: false, delete: false },
    { name: "Supplier", read: true, write: true, edit: true, delete: false },
    { name: "Store", read: true, write: false, edit: false, delete: false },
    { name: "Billing", read: true, write: false, edit: false, delete: false },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Personal Settings</h1>

        {error && (
          <Alert type="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert type="success" onClose={() => setSuccess("")}>
            {success}
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Información Personal */}
          <Card>
            <h2 className="text-lg font-semibold mb-6">Personal Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Store"
                name="store"
                value={formData.store}
                onChange={handleChange}
              />

              <Input
                label="Store"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />

              <Input
                label="Company email"
                name="companyEmail"
                type="email"
                value={formData.companyEmail}
                onChange={handleChange}
              />

              <Button type="submit" loading={loading} className="w-full">
                Save Changes
              </Button>
            </form>
          </Card>

          {/* Roles y Permisos */}
          <Card>
            <h2 className="text-lg font-semibold mb-6">Role & Permissions</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Manager">Manager</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                  <option value="Supplier">Supplier</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Permissions
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-xs text-gray-500 uppercase">
                        <th className="text-left py-2"></th>
                        <th className="text-center py-2">Read</th>
                        <th className="text-center py-2">Write</th>
                        <th className="text-center py-2">Edit</th>
                        <th className="text-center py-2">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      {permissions.map((permission) => (
                        <tr
                          key={permission.name}
                          className="border-b border-gray-100"
                        >
                          <td className="py-2 text-sm text-gray-700">
                            {permission.name}
                          </td>
                          <td className="text-center py-2">
                            <div
                              className={`w-4 h-4 rounded mx-auto ${
                                permission.read ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></div>
                          </td>
                          <td className="text-center py-2">
                            <div
                              className={`w-4 h-4 rounded mx-auto ${
                                permission.write
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                          </td>
                          <td className="text-center py-2">
                            <div
                              className={`w-4 h-4 rounded mx-auto ${
                                permission.edit ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></div>
                          </td>
                          <td className="text-center py-2">
                            <div
                              className={`w-4 h-4 rounded mx-auto ${
                                permission.delete
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
