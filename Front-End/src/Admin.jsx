import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import PopUpMessage from "./components/ui/PopUpMessage";
import axios from "axios";
import { BASE_URL } from "./lib/utils";
import { useTranslation } from "react-i18next";

export default function Admin() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [existingProducts, setExistingProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "/assets/custom.png",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products/all`);
        setExistingProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setMessage(t("admin.fetchError"));
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(existingProducts);
    } else {
      const filtered = existingProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, existingProducts]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.image
    ) {
      setMessage(t("admin.fillAll"));
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE_URL}/products/add`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExistingProducts([...existingProducts, response.data]);
      setFilteredProducts([...filteredProducts, response.data]);

      setNewProduct({ name: "", price: "", description: "", image: "" });

      setMessage(t("admin.added"));
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response) {
        setMessage(
          error.response.data.message || t("admin.addError")
        );
      } else {
        setMessage(t("admin.connectError"));
      }
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  const handleDeleteExistingProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${BASE_URL}/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExistingProducts(
        existingProducts.filter((product) => product._id !== id)
      );
      setFilteredProducts(
        filteredProducts.filter((product) => product._id !== id)
      );
      setMessage(t("admin.deleted"));
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error.response && error.response.status !== 401) {
        setMessage(
          error.response.data.message || t("admin.deleteError")
        );
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    }
  };

  return (
    <div className="py-10 bg-bg_clr w-full">
      <article className="py-10 px-10 rounded-lg w-3/4 mx-auto bg-cn_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
        <header className="flex justify-center items-center py-10">
          <h2 className="text-4xl font-bold">{t("admin.title")}</h2>
        </header>

        <div className="grid grid-cols-1 gap-10">
          <div className="p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold mb-6">{t("admin.addTitle")}</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t("admin.name")}
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-t_clr"
                  placeholder={t("admin.namePlaceholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t("admin.price")}
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (value >= 0 || e.target.value === "") {
                      setNewProduct({ ...newProduct, price: e.target.value });
                    }
                  }}
                  min="0"
                  step="1"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-t_clr"
                  placeholder={t("admin.pricePlaceholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t("admin.description")}
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-t_clr"
                  placeholder={t("admin.descriptionPlaceholder")}
                  rows="3"
                />
              </div>
              <Button type="submit" className="w-full">
                {t("admin.add")}
              </Button>
            </form>
          </div>

          <div className="mt-10 p-6 rounded-lg shadow-lg bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">
                {t("admin.existing")}
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-t_clr"
                  placeholder={t("admin.search")}
                />
                <i className="fa-solid fa-magnifying-glass absolute right-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        product.photos?.[0]?.src || "/assets/placeholder.jpg"
                      }
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-gray-600">${product.price}</p>
                      <p className="text-xs text-gray-500">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteExistingProduct(product._id)}>
                    {t("admin.delete")}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
      <PopUpMessage text={message} show={showMessage} />
    </div>
  );
}
