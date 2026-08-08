

import { useState, useEffect } from "react";
import InnerBanner from "../components/InnerBanner";
import { themes } from "../config/themeConfig";
import { apiInfo } from "../service/api";
import serviceBanner from "../assets/images/serviceBanner.jpg";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiInfo.get("/products/sequence/?status=true/");
        const data = res.data && Array.isArray(res.data.data) ? res.data.data : [];
        setProducts(data);
        setFilteredProducts(data);
        
        const cats = ["All", ...new Set(data.map(p => p.category).filter(Boolean))];
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <InnerBanner title="Shop" current="Shop" bg={serviceBanner} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-5 rounded-lg">
              <h3 className="font-bold mb-3" style={{ color: themes.primary }}>Categories</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className="w-full text-left px-3 py-2 rounded text-sm"
                      style={{
                        backgroundColor: selectedCategory === cat ? themes.primary : "transparent",
                        color: selectedCategory === cat ? "white" : themes.backgroundGray
                      }}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Products */}
          <div className="lg:w-3/4">
            <p className="text-sm mb-4" style={{ color: themes.backgroundGray }}>
              Showing {filteredProducts.length} of {products.length} results
            </p>

            {loading ? (
              <div className="text-center py-10">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <img src={p.image || "https://via.placeholder.com/300"} alt={p.name} className="w-full h-48 object-cover" />
                    <div className="p-3">
                      <h4 className="font-medium text-sm mb-2">{p.name}</h4>
                      <p className="text-lg font-bold" style={{ color: themes.primary }}>${p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}