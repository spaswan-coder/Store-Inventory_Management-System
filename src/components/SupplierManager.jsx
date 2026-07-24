import React, { useState } from "react";

export default function SupplierManager({ suppliers, setSuppliers, products, currentRole }) {
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    categories: ""
  });

  const handleSaveSupplier = (e) => {
    e.preventDefault();
    if (!newSupplier.name || !newSupplier.email) {
      alert("Please enter company name and email.");
      return;
    }

    const supplierToAdd = {
      id: `SUP-0${suppliers.length + 1}`,
      name: newSupplier.name,
      contactPerson: newSupplier.contactPerson || "Manager",
      email: newSupplier.email,
      phone: newSupplier.phone || "+91 90000 00000",
      address: newSupplier.address || "Delhi NCR",
      rating: 4.5,
      categories: newSupplier.categories ? newSupplier.categories.split(",").map((c) => c.trim()) : ["General"]
    };

    setSuppliers([...suppliers, supplierToAdd]);
    setShowAddSupplierModal(false);
    setNewSupplier({ name: "", contactPerson: "", email: "", phone: "", address: "", categories: "" });
  };

  return (
    <div className="suppliers-container">
      <div className="table-controls-bar">
        <div>
          <h3>🚚 Approved Supplier & Vendor Directory</h3>
          <p className="text-muted text-sm">
            Manage vendor relations, contact info, and supplier mapping across inventory categories.
          </p>
        </div>
        {currentRole !== "Staff / Cashier" && (
          <button className="btn-primary" onClick={() => setShowAddSupplierModal(true)}>
            ➕ Register New Supplier
          </button>
        )}
      </div>

      <div className="suppliers-grid">
        {suppliers.map((s) => {
          const suppliedProducts = products.filter((p) => p.supplierId === s.id || p.supplierName === s.name);
          return (
            <div key={s.id} className="card-box supplier-card">
              <div className="supplier-header">
                <div>
                  <span className="sku-badge">{s.id}</span>
                  <h3 className="supplier-title">{s.name}</h3>
                </div>
                <span className="badge badge-success">⭐ {s.rating} / 5.0</span>
              </div>

              <div className="supplier-info">
                <p>👤 <strong>Contact:</strong> {s.contactPerson}</p>
                <p>✉️ <strong>Email:</strong> {s.email}</p>
                <p>📞 <strong>Phone:</strong> {s.phone}</p>
                <p>📍 <strong>Address:</strong> {s.address}</p>
              </div>

              <div className="supplied-categories">
                <label className="text-xs text-muted block mb-1">Supplied Categories:</label>
                <div className="flex gap-1 flex-wrap">
                  {s.categories.map((cat, i) => (
                    <span key={i} className="category-pill">{cat}</span>
                  ))}
                </div>
              </div>

              <hr />

              <div className="supplied-products-list">
                <label className="text-xs text-muted block mb-1">Mapped Inventory Items ({suppliedProducts.length}):</label>
                {suppliedProducts.length === 0 ? (
                  <span className="text-xs text-muted">No items mapped yet.</span>
                ) : (
                  <ul className="text-xs">
                    {suppliedProducts.map((p) => (
                      <li key={p.id} className="flex justify-between py-1 border-b border-gray">
                        <span>{p.name}</span>
                        <span className="font-bold text-white">{p.stock} units</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAddSupplierModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>🚚 Register New Vendor Supplier</h3>
              <button className="btn-close" onClick={() => setShowAddSupplierModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveSupplier} className="modal-body grid-2">
              <div className="form-group col-span-2">
                <label>Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextGen Hardware Ltd"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Contact Person</label>
                <input
                  type="text"
                  placeholder="e.g. Vikram Sharma"
                  value={newSupplier.contactPerson}
                  onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="sales@nextgen.com"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 00000"
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Categories (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Electronics, Audio, Networking"
                  value={newSupplier.categories}
                  onChange={(e) => setNewSupplier({ ...newSupplier, categories: e.target.value })}
                />
              </div>

              <div className="form-group col-span-2">
                <label>Office Address</label>
                <textarea
                  rows="2"
                  placeholder="Street address, City, Pincode"
                  value={newSupplier.address}
                  onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                ></textarea>
              </div>

              <div className="modal-footer col-span-2">
                <button type="button" className="btn-secondary" onClick={() => setShowAddSupplierModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
