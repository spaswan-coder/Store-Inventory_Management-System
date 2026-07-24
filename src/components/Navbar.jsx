import React from "react";

export default function Navbar({ activeTab, setActiveTab, currentRole, setCurrentRole, resetData }) {
  const tabs = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "inventory", label: "📦 Inventory Stock" },
    { id: "sales", label: "💳 Sales Terminal" },
    { id: "suppliers", label: "🚚 Suppliers" },
    { id: "sql", label: "⚡ SQL Inspector & ER Schema" }
  ];

  const roles = ["Admin", "Store Manager", "Staff / Cashier"];

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="brand-logo">🏬</div>
          <div>
            <h1 className="brand-title">Store Inventory Management System</h1>
            <span className="brand-badge">PostgreSQL DBMS Architecture • IIIT Delhi</span>
          </div>
        </div>

        <div className="nav-controls">
          <div className="role-selector-container">
            <label className="role-label">Active Role:</label>
            <select
              className="role-dropdown"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  👤 {r}
                </option>
              ))}
            </select>
          </div>

          <button className="btn-reset" onClick={resetData} title="Reset data back to default">
            🔄 Reset Data
          </button>
        </div>
      </div>

      <nav className="nav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
