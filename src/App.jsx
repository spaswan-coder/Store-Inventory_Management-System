import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import InventoryTable from "./components/InventoryTable";
import SalesManager from "./components/SalesManager";
import SupplierManager from "./components/SupplierManager";
import SqlInspector from "./components/SqlInspector";

import {
  INITIAL_PRODUCTS,
  INITIAL_SUPPLIERS,
  INITIAL_TRANSACTIONS,
  SCHEMA_TABLES,
  PRESET_SQL_QUERIES
} from "./data/initialData";

import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentRole, setCurrentRole] = useState("Admin");

  // LocalStorage state management
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("store_products");
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem("store_suppliers");
    return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("store_transactions");
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  useEffect(() => {
    localStorage.setItem("store_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("store_suppliers", JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem("store_transactions", JSON.stringify(transactions));
  }, [transactions]);

  const resetData = () => {
    if (confirm("Reset all inventory data, sales, and suppliers back to initial default state?")) {
      localStorage.removeItem("store_products");
      localStorage.removeItem("store_suppliers");
      localStorage.removeItem("store_transactions");
      setProducts(INITIAL_PRODUCTS);
      setSuppliers(INITIAL_SUPPLIERS);
      setTransactions(INITIAL_TRANSACTIONS);
    }
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        resetData={resetData}
      />

      <main className="content-area">
        {activeTab === "dashboard" && (
          <Dashboard
            products={products}
            suppliers={suppliers}
            transactions={transactions}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "inventory" && (
          <InventoryTable
            products={products}
            setProducts={setProducts}
            suppliers={suppliers}
            currentRole={currentRole}
          />
        )}

        {activeTab === "sales" && (
          <SalesManager
            products={products}
            setProducts={setProducts}
            transactions={transactions}
            setTransactions={setTransactions}
            currentRole={currentRole}
          />
        )}

        {activeTab === "suppliers" && (
          <SupplierManager
            suppliers={suppliers}
            setSuppliers={setSuppliers}
            products={products}
            currentRole={currentRole}
          />
        )}

        {activeTab === "sql" && (
          <SqlInspector
            products={products}
            suppliers={suppliers}
            transactions={transactions}
            schemaTables={SCHEMA_TABLES}
            presetQueries={PRESET_SQL_QUERIES}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>
          Store Inventory Management System • Designed by <strong>Sonu Paswan</strong> (IIIT Delhi B.Tech CSSS)
        </p>
      </footer>
    </div>
  );
}

export default App;
