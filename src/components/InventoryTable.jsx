import React, { useState } from "react";

export default function InventoryTable({ products, setProducts, suppliers, currentRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New product state
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Electronics",
    supplierId: suppliers[0]?.id || "",
    price: "",
    costPrice: "",
    stock: "",
    minStockThreshold: "10",
    unit: "pcs",
    sku: ""
  });

  const categories = ["ALL", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "ALL" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill in required fields (Name, Price, Stock).");
      return;
    }

    const selectedSupplier = suppliers.find((s) => s.id === newProduct.supplierId);
    const productToAdd = {
      ...newProduct,
      id: `PRD-${Date.now().toString().slice(-4)}`,
      price: parseFloat(newProduct.price),
      costPrice: parseFloat(newProduct.costPrice || newProduct.price * 0.7),
      stock: parseInt(newProduct.stock, 10),
      minStockThreshold: parseInt(newProduct.minStockThreshold, 10) || 5,
      supplierName: selectedSupplier ? selectedSupplier.name : "Direct Supplier",
      sku: newProduct.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      lastRestocked: new Date().toISOString().split("T")[0]
    };

    setProducts([productToAdd, ...products]);
    setShowAddModal(false);
    setNewProduct({
      name: "",
      category: "Electronics",
      supplierId: suppliers[0]?.id || "",
      price: "",
      costPrice: "",
      stock: "",
      minStockThreshold: "10",
      unit: "pcs",
      sku: ""
    });
  };

  const handleUpdateStock = (id, delta) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const updatedStock = Math.max(0, p.stock + delta);
          return { ...p, stock: updatedStock, lastRestocked: new Date().toISOString().split("T")[0] };
        }
        return p;
      })
    );
  };

  const handleDelete = (id) => {
    if (currentRole === "Staff / Cashier") {
      alert("Permission Denied: Staff users cannot delete inventory items. Switch to Admin role.");
      return;
    }
    if (confirm("Are you sure you want to delete this product from the database?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="inventory-container">
      <div className="table-controls-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by Product Name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <label>Category Filter:</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {currentRole !== "Staff / Cashier" && (
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            ➕ Add New Product
          </button>
        )}
      </div>

      <div className="card-box padding-0">
        <div className="table-responsive">
          <table className="main-table">
            <thead>
              <tr>
                <th>SKU & ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Supplier</th>
                <th>Selling Price</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No matching products found in inventory database.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLowStock = p.stock <= p.minStockThreshold;
                  return (
                    <tr key={p.id} className={isLowStock ? "row-low-stock" : ""}>
                      <td>
                        <span className="sku-badge">{p.sku}</span>
                        <div className="text-muted text-xs">{p.id}</div>
                      </td>
                      <td className="font-semibold text-white">{p.name}</td>
                      <td>
                        <span className="category-pill">{p.category}</span>
                      </td>
                      <td>{p.supplierName}</td>
                      <td className="font-bold text-success">₹{p.price.toLocaleString("en-IN")}</td>
                      <td>
                        <div className="stock-control font-bold">
                          <button
                            className="btn-stock"
                            onClick={() => handleUpdateStock(p.id, -1)}
                            title="Decrease stock"
                          >
                            -
                          </button>
                          <span className={isLowStock ? "text-danger" : ""}>
                            {p.stock} {p.unit}
                          </span>
                          <button
                            className="btn-stock"
                            onClick={() => handleUpdateStock(p.id, +1)}
                            title="Increase stock"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        {isLowStock ? (
                          <span className="badge badge-danger">⚠️ Low Stock ({p.stock})</span>
                        ) : (
                          <span className="badge badge-success">In Stock</span>
                        )}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-icon btn-danger"
                            onClick={() => handleDelete(p.id)}
                            title="Delete Item"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>📦 Add New Product to Inventory</h3>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="modal-body grid-2">
              <div className="form-group col-span-2">
                <label>Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wireless Gaming Headset"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  placeholder="e.g. Electronics"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Supplier</label>
                <select
                  value={newProduct.supplierId}
                  onChange={(e) => setNewProduct({ ...newProduct, supplierId: e.target.value })}
                >
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Selling Price (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="2999"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Cost Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="1800"
                  value={newProduct.costPrice}
                  onChange={(e) => setNewProduct({ ...newProduct, costPrice: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Initial Stock Quantity *</label>
                <input
                  type="number"
                  required
                  placeholder="25"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Min Reorder Threshold</label>
                <input
                  type="number"
                  placeholder="10"
                  value={newProduct.minStockThreshold}
                  onChange={(e) => setNewProduct({ ...newProduct, minStockThreshold: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>SKU Code</label>
                <input
                  type="text"
                  placeholder="KB-GAME-01"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                />
              </div>

              <div className="modal-footer col-span-2">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Product to DBMS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
