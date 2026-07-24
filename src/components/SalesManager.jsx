import React, { useState } from "react";

export default function SalesManager({ products, setProducts, transactions, setTransactions, currentRole }) {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState("Regular");
  const [paymentMethod, setPaymentMethod] = useState("UPI / QR");
  const [latestReceipt, setLatestReceipt] = useState(null);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleProcessSale = (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      alert("Please select a valid product.");
      return;
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      alert("Please enter a valid sale quantity greater than zero.");
      return;
    }

    if (selectedProduct.stock < qty) {
      alert(`Insufficient Stock! Only ${selectedProduct.stock} units available for ${selectedProduct.name}.`);
      return;
    }

    // Deduct stock from products
    setProducts(
      products.map((p) => (p.id === selectedProductId ? { ...p, stock: p.stock - qty } : p))
    );

    const totalAmount = selectedProduct.price * qty;
    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" }),
      customerName: customerName || "Walk-in Customer",
      customerType,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity: qty,
      unitPrice: selectedProduct.price,
      totalAmount,
      paymentMethod,
      processedBy: currentRole
    };

    setTransactions([newTxn, ...transactions]);
    setLatestReceipt(newTxn);

    // Reset Form
    setQuantity(1);
    setCustomerName("");
  };

  return (
    <div className="sales-container">
      <div className="sales-grid">
        {/* Checkout Form */}
        <div className="card-box">
          <h3>💳 Process New Sales Receipt</h3>
          <p className="text-muted text-sm mb-4">
            Record retail or corporate sales transactions with automatic stock deduction and database logging.
          </p>

          <form onSubmit={handleProcessSale} className="sales-form">
            <div className="form-group">
              <label>Select Product *</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ₹{p.price} ({p.stock} units left)
                  </option>
                ))}
              </select>
            </div>

            {selectedProduct && (
              <div className="product-summary-badge">
                <span>SKU: {selectedProduct.sku}</span>
                <span>Available Stock: <strong>{selectedProduct.stock} {selectedProduct.unit}</strong></span>
              </div>
            )}

            <div className="grid-2">
              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  min="1"
                  max={selectedProduct ? selectedProduct.stock : 100}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="UPI / QR">UPI / QR Code</option>
                  <option value="Credit Card">Credit / Debit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer (NEFT/IMPS)</option>
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Customer Type</label>
                <select value={customerType} onChange={(e) => setCustomerType(e.target.value)}>
                  <option value="Regular">Regular Customer</option>
                  <option value="VIP">VIP Customer</option>
                  <option value="Corporate">Corporate / Bulk Buyer</option>
                </select>
              </div>
            </div>

            <div className="total-calculation-box">
              <span>Total Payable Amount:</span>
              <h2 className="text-success">
                ₹{((selectedProduct ? selectedProduct.price : 0) * (parseInt(quantity, 10) || 0)).toLocaleString("en-IN")}
              </h2>
            </div>

            <button type="submit" className="btn-primary btn-block">
              ⚡ Process Transaction & Log to Database
            </button>
          </form>
        </div>

        {/* Receipt Preview */}
        <div className="card-box">
          <h3>🧾 Transaction Receipt Invoice</h3>
          {latestReceipt ? (
            <div className="receipt-box">
              <div className="receipt-header">
                <h4>STORE INVENTORY SYSTEM</h4>
                <p>Receipt ID: {latestReceipt.id}</p>
                <p>Date: {latestReceipt.date}</p>
              </div>
              <hr />
              <div className="receipt-details">
                <p><strong>Customer:</strong> {latestReceipt.customerName} ({latestReceipt.customerType})</p>
                <p><strong>Processed By:</strong> {latestReceipt.processedBy}</p>
                <p><strong>Payment Method:</strong> {latestReceipt.paymentMethod}</p>
              </div>
              <hr />
              <div className="receipt-items">
                <div className="receipt-item-row font-bold">
                  <span>Item</span>
                  <span>Qty x Price</span>
                  <span>Total</span>
                </div>
                <div className="receipt-item-row">
                  <span>{latestReceipt.productName}</span>
                  <span>{latestReceipt.quantity} x ₹{latestReceipt.unitPrice}</span>
                  <span>₹{latestReceipt.totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <hr />
              <div className="receipt-footer">
                <h3>GRAND TOTAL: ₹{latestReceipt.totalAmount.toLocaleString("en-IN")}</h3>
                <span className="badge badge-success">PAID & LOGGED</span>
              </div>
            </div>
          ) : (
            <div className="empty-state py-8">
              <p>🧾 Process a transaction to generate a live print-ready receipt invoice.</p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Log History */}
      <div className="card-box mt-6">
        <h3>📜 Sales Transaction Log History (Sales_Transactions Table)</h3>
        <div className="table-responsive">
          <table className="main-table">
            <thead>
              <tr>
                <th>Txn ID</th>
                <th>Date & Time</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total Amount</th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Processed By</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td><span className="sku-badge">{t.id}</span></td>
                  <td>{t.date}</td>
                  <td className="font-semibold text-white">{t.productName}</td>
                  <td>{t.quantity}</td>
                  <td>₹{t.unitPrice}</td>
                  <td className="font-bold text-success">₹{t.totalAmount.toLocaleString("en-IN")}</td>
                  <td>{t.customerName}</td>
                  <td><span className="category-pill">{t.paymentMethod}</span></td>
                  <td>{t.processedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
