import React, { useState } from "react";
import ErDiagram from "./ErDiagram";

export default function SqlInspector({ products, suppliers, transactions, schemaTables, presetQueries }) {
  const [activeSubTab, setActiveSubTab] = useState("runner");
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [customSql, setCustomSql] = useState(presetQueries[0].sql);
  const [queryResult, setQueryResult] = useState(null);
  const [executionTime, setExecutionTime] = useState(null);

  const handleSelectPreset = (index) => {
    setSelectedPresetIndex(index);
    setCustomSql(presetQueries[index].sql);
    setQueryResult(null);
  };

  const handleExecuteQuery = () => {
    const startTime = performance.now();
    const sqlUpper = customSql.toUpperCase();

    let columns = [];
    let rows = [];

    if (sqlUpper.includes("FROM PRODUCTS") && sqlUpper.includes("MIN_STOCK_THRESHOLD")) {
      columns = ["product_id", "name", "category", "stock", "min_stock_threshold"];
      rows = products
        .filter((p) => p.stock <= p.minStockThreshold)
        .map((p) => [p.id, p.name, p.category, p.stock, p.minStockThreshold]);
    } else if (sqlUpper.includes("FROM PRODUCTS") && sqlUpper.includes("GROUP BY CATEGORY")) {
      columns = ["category", "total_items", "total_retail_value", "estimated_profit_potential"];
      const grouped = products.reduce((acc, p) => {
        if (!acc[p.category]) {
          acc[p.category] = { count: 0, retail: 0, profit: 0 };
        }
        acc[p.category].count += 1;
        acc[p.category].retail += p.price * p.stock;
        acc[p.category].profit += (p.price - p.costPrice) * p.stock;
        return acc;
      }, {});

      rows = Object.entries(grouped).map(([cat, d]) => [
        cat,
        d.count,
        `₹${d.retail.toLocaleString("en-IN")}`,
        `+₹${d.profit.toLocaleString("en-IN")}`
      ]);
    } else if (sqlUpper.includes("JOIN SUPPLIERS")) {
      columns = ["company_name", "product_name", "stock", "price"];
      rows = products.map((p) => [
        p.supplierName,
        p.name,
        p.stock,
        `₹${p.price.toLocaleString("en-IN")}`
      ]);
    } else if (sqlUpper.includes("FROM SALES_TRANSACTIONS")) {
      columns = ["product_id", "product_name", "units_sold", "total_revenue"];
      const grouped = transactions.reduce((acc, t) => {
        if (!acc[t.productId]) {
          acc[t.productId] = { name: t.productName, qty: 0, rev: 0 };
        }
        acc[t.productId].qty += t.quantity;
        acc[t.productId].rev += t.totalAmount;
        return acc;
      }, {});

      rows = Object.entries(grouped).map(([pid, data]) => [
        pid,
        data.name,
        data.qty,
        `₹${data.rev.toLocaleString("en-IN")}`
      ]);
    } else if (sqlUpper.includes("FROM SUPPLIERS")) {
      columns = ["supplier_id", "company_name", "contact_person", "email", "rating"];
      rows = suppliers.map((s) => [s.id, s.name, s.contactPerson, s.email, `${s.rating} ⭐`]);
    } else {
      // Default: Select all products
      columns = ["product_id", "product_name", "category", "price", "stock", "sku"];
      rows = products.map((p) => [p.id, p.name, p.category, `₹${p.price}`, p.stock, p.sku]);
    }

    const endTime = performance.now();
    setExecutionTime((endTime - startTime).toFixed(2));
    setQueryResult({ columns, rows });
  };

  return (
    <div className="sql-inspector-container">
      <div className="sub-tab-bar">
        <button
          className={`sub-tab ${activeSubTab === "runner" ? "active" : ""}`}
          onClick={() => setActiveSubTab("runner")}
        >
          ⚡ Interactive SQL Query Simulator
        </button>
        <button
          className={`sub-tab ${activeSubTab === "er" ? "active" : ""}`}
          onClick={() => setActiveSubTab("er")}
        >
          📐 Relational ER Schema Inspector
        </button>
      </div>

      {activeSubTab === "er" ? (
        <ErDiagram schemaTables={schemaTables} />
      ) : (
        <div className="sql-runner-grid">
          {/* Presets Sidebar */}
          <div className="card-box preset-sidebar">
            <h3>📜 Sample DBMS Queries</h3>
            <p className="text-muted text-xs mb-3">
              Click any query below to auto-populate the SQL editor:
            </p>
            <div className="preset-list">
              {presetQueries.map((pq, idx) => (
                <div
                  key={idx}
                  className={`preset-card ${selectedPresetIndex === idx ? "active" : ""}`}
                  onClick={() => handleSelectPreset(idx)}
                >
                  <h4 className="preset-title">{pq.title}</h4>
                  <p className="preset-desc">{pq.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SQL Editor & Results */}
          <div className="sql-editor-container">
            <div className="card-box">
              <div className="card-header">
                <h3>💻 PostgreSQL Query Console</h3>
                <span className="badge badge-info">PostgreSQL Engine Engine v16.2</span>
              </div>

              <textarea
                className="sql-editor-textarea"
                rows="4"
                value={customSql}
                onChange={(e) => setCustomSql(e.target.value)}
                placeholder="Enter SQL query..."
              ></textarea>

              <div className="editor-actions">
                <button className="btn-primary" onClick={handleExecuteQuery}>
                  ▶️ Execute SQL Query
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setCustomSql(presetQueries[0].sql)}
                >
                  Clear / Reset
                </button>
              </div>
            </div>

            {/* Results Window */}
            {queryResult && (
              <div className="card-box mt-4">
                <div className="card-header">
                  <h3>
                    📊 Query Results Output ({queryResult.rows.length} rows returned)
                  </h3>
                  <span className="text-muted text-xs">Executed in {executionTime} ms</span>
                </div>

                <div className="table-responsive">
                  <table className="main-table sql-output-table">
                    <thead>
                      <tr>
                        {queryResult.columns.map((col, i) => (
                          <th key={i}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.rows.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className={cellIdx === 0 ? "font-mono font-bold" : ""}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
