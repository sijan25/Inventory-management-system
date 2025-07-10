import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

const ProductContext = createContext({});

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Cargar productos del usuario
  useEffect(() => {
    if (!currentUser) return;

    // OPCIÓN TEMPORAL: Solo filtrar por userId (sin orderBy)
    const q = query(
      collection(db, "products"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Ordenar en el cliente (temporal)
      const sortedProducts = productsData.sort((a, b) => {
        const aDate = a.createdAt?.toDate?.() || new Date(0);
        const bDate = b.createdAt?.toDate?.() || new Date(0);
        return bDate.getTime() - aDate.getTime();
      });

      setProducts(sortedProducts);

      // Extraer categorías únicas
      const uniqueCategories = [
        ...new Set(productsData.map((p) => p.category)),
      ];
      setCategories(uniqueCategories);

      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  // Agregar producto
  const addProduct = async (productData) => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...productData,
        userId: currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  // Actualizar producto
  const updateProduct = async (productId, updates) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  // Eliminar producton
  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  // Obtener estadísticas
  const getStats = () => {
    const totalProducts = products.length;
    const totalCategories = categories.length;
    const lowStock = products.filter((p) => p.stock < 10).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;

    return {
      totalProducts,
      totalCategories,
      lowStock,
      outOfStock,
    };
  };

  const value = {
    products,
    categories,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getStats,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
