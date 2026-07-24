import React from "react";

export default function Dashboard({ products, suppliers, transactions, setActiveTab }) {
  const totalValuation = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  const totalCost = products.reduce((acc, p) => acc + p.costPrice * p.stock, 0);
  const totalProfitPotential = totalValuation - totalCost;
  const lowStockItems = products.filter((p) => p.stock <= p.minStockThreshold);
  const totalSalesRevenue = transactions.reduce((acc, t) => acc + t.totalAmount, 0);

  // Group by Category
  const categoriesMap = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.stock;
    return acc;
  }, {});

  return (
    <div className="dashboard-container">
      <div className="metrics-grid">
        <div className="metric-card metric-primary">
          <div className="metric-card-top">
            <span className="metric-title">Total Inventory Retail Value</span>
            <div className="metric-icon-badge">💰</div>
          </div>
          <div className="metric-value">₹{totalValuation.toLocaleString("en-IN")}</div>
          <span className="metric-subtext">Est. Profit: +₹{totalProfitPotential.toLocaleString("en-IN")}</span>
        </div>

        <div className="metric-card metric-success">
          <div className="metric-card-top">
            <span className="metric-title">Total Revenue Processed</span>
            <div className="metric-icon-badge">📈</div>
          </div>
          <div className="metric-value">₹{totalSalesRevenue.toLocaleString("en-IN")}</div>
          <span className="metric-subtext">{transactions.length} Completed Transactions</span>
        </div>

        <div className="metric-card metric-warning">
          <div className="metric-card-top">
            <span className="metric-title">Low Stock Reorder Alerts</span>
            <div className="metric-icon-badge">⚠️</div>
          </div>
          <div className="metric-value">{lowStockItems.length} Products</div>
          <span className="metric-subtext">Stock ≤ Min Threshold</span>
        </div>

        <div className="metric-card metric-info">
          <div className="metric-card-top">
            <span className="metric-title">Active Suppliers</span>
            <div className="metric-icon-badge">🏢</div>
          </div>
          <div className="metric-value">{suppliers.length} Vendors</div>
          <span className="metric-subtext">Mapped Across {products.length} Products</span>
        </div>
      </div>

      <div className="dashboard-row">
        {/* Low Stock Warning Box */}
        <div className="card-box flex-1">
          <div className="card-header">
            <h3>⚠️ Low Stock Reorder List</h3>
            <button className="btn-secondary btn-sm" onClick={() => setActiveTab("inventory")}>
              View All Inventory →
            </button>
          </div>
          {lowStockItems.length === 0 ? (
            <p className="empty-state">✅ All products have adequate stock levels!</p>
          ) : (
            <div className="table-responsive">
              <table className="mini-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Threshold</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockItems.map((p) => (
                    <tr key={p.id}>
                      <td className="font-semibold">{p.name}</td>
                      <td>{p.category}</td>
                      <td className="text-danger font-bold">{p.stock} {p.unit}</td>
                      <td>{p.minStockThreshold} {p.unit}</td>
                      <td>
                        <span className="badge badge-danger">Reorder Now</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Category Breakdown Box */}
        <div className="card-box flex-1">
          <div className="card-header">
            <h3>📊 Inventory Stock Distribution</h3>
          </div>
          <div className="category-list">
            {Object.entries(categoriesMap).map(([catName, count]) => {
              const percentage = Math.round((count / products.reduce((a, b) => a + b.stock, 0)) * 100) || 0;
              return (
                <div key={catName} className="category-item">
                  <div className="category-info">
                    <span className="category-name">{catName}</span>
                    <span className="category-count">{count} units ({percentage}%)</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="quick-actions-bar">
        <h3>🚀 Quick Action Shortcuts</h3>
        <div className="quick-buttons">
          <button className="btn-action" onClick={() => setActiveTab("inventory")}>
            ➕ Add / Edit Product Stock
          </button>
          <button className="btn-action" onClick={() => setActiveTab("sales")}>
            💳 New Sales Receipt
          </button>
          <button className="btn-action" onClick={() => setActiveTab("sql")}>
            ⚡ Run DBMS Queries & Visualizer
          </button>
        </div>
      </div>
    </div>
  );
}
