export const INITIAL_PRODUCTS = [
  {
    id: "PRD-101",
    name: "Wireless Mechanical Keyboard",
    category: "Electronics",
    supplierId: "SUP-01",
    supplierName: "TechLogix Distributors",
    price: 3499.00,
    costPrice: 2200.00,
    stock: 24,
    minStockThreshold: 10,
    unit: "pcs",
    sku: "KB-WL-RGB-01",
    lastRestocked: "2025-02-10"
  },
  {
    id: "PRD-102",
    name: "Ergonomic Gaming Mouse",
    category: "Electronics",
    supplierId: "SUP-01",
    supplierName: "TechLogix Distributors",
    price: 1899.00,
    costPrice: 1100.00,
    stock: 6,
    minStockThreshold: 10,
    unit: "pcs",
    sku: "MS-ERGO-DPI",
    lastRestocked: "2025-01-20"
  },
  {
    id: "PRD-103",
    name: "27-inch 4K IPS Monitor",
    category: "Electronics",
    supplierId: "SUP-02",
    supplierName: "Apex Displays Ltd",
    price: 24999.00,
    costPrice: 19500.00,
    stock: 8,
    minStockThreshold: 5,
    unit: "pcs",
    sku: "MON-27-4K-IPS",
    lastRestocked: "2025-02-01"
  },
  {
    id: "PRD-104",
    name: "USB-C Multi-Port Hub",
    category: "Accessories",
    supplierId: "SUP-01",
    supplierName: "TechLogix Distributors",
    price: 1299.00,
    costPrice: 650.00,
    stock: 42,
    minStockThreshold: 15,
    unit: "pcs",
    sku: "HUB-USBC-7IN1",
    lastRestocked: "2025-02-14"
  },
  {
    id: "PRD-105",
    name: "Noise-Cancelling Headphones",
    category: "Audio",
    supplierId: "SUP-03",
    supplierName: "SoundCraft Electronics",
    price: 5999.00,
    costPrice: 3800.00,
    stock: 3,
    minStockThreshold: 8,
    unit: "pcs",
    sku: "HD-NC-BT5",
    lastRestocked: "2025-01-15"
  },
  {
    id: "PRD-106",
    name: "Standing Desk Mat",
    category: "Furniture",
    supplierId: "SUP-04",
    supplierName: "ErgoWork Office Gear",
    price: 1499.00,
    costPrice: 800.00,
    stock: 19,
    minStockThreshold: 10,
    unit: "pcs",
    sku: "MAT-ST-PAD",
    lastRestocked: "2025-02-05"
  },
  {
    id: "PRD-107",
    name: "Cat6 Ethernet Cable (10m)",
    category: "Networking",
    supplierId: "SUP-01",
    supplierName: "TechLogix Distributors",
    price: 499.00,
    costPrice: 180.00,
    stock: 65,
    minStockThreshold: 20,
    unit: "pcs",
    sku: "CAB-CAT6-10M",
    lastRestocked: "2025-02-18"
  },
  {
    id: "PRD-108",
    name: "Portable NVMe SSD 1TB",
    category: "Storage",
    supplierId: "SUP-02",
    supplierName: "Apex Displays Ltd",
    price: 7499.00,
    costPrice: 5100.00,
    stock: 4,
    minStockThreshold: 8,
    unit: "pcs",
    sku: "SSD-NVME-1TB",
    lastRestocked: "2025-01-28"
  }
];

export const INITIAL_SUPPLIERS = [
  {
    id: "SUP-01",
    name: "TechLogix Distributors",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@techlogix.in",
    phone: "+91 98765 43210",
    address: "Okhla Industrial Area, Phase-III, New Delhi",
    rating: 4.8,
    categories: ["Electronics", "Accessories", "Networking"]
  },
  {
    id: "SUP-02",
    name: "Apex Displays Ltd",
    contactPerson: "Priya Sharma",
    email: "p.sharma@apexdisplays.com",
    phone: "+91 98112 34567",
    address: "Nehru Place Hardware Market, New Delhi",
    rating: 4.6,
    categories: ["Electronics", "Storage"]
  },
  {
    id: "SUP-03",
    name: "SoundCraft Electronics",
    contactPerson: "Amit Verma",
    email: "orders@soundcraft.in",
    phone: "+91 99554 12345",
    address: "Connaught Place, New Delhi",
    rating: 4.9,
    categories: ["Audio"]
  },
  {
    id: "SUP-04",
    name: "ErgoWork Office Gear",
    contactPerson: "Neha Gupta",
    email: "sales@ergowork.co.in",
    phone: "+91 97170 98765",
    address: "Sector 18, Gurugram, Haryana",
    rating: 4.5,
    categories: ["Furniture"]
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-9041",
    date: "2025-02-24 14:32",
    customerName: "Rahul Mehta",
    customerType: "Regular",
    productId: "PRD-101",
    productName: "Wireless Mechanical Keyboard",
    quantity: 2,
    unitPrice: 3499.00,
    totalAmount: 6998.00,
    paymentMethod: "UPI / QR",
    processedBy: "Admin"
  },
  {
    id: "TXN-9042",
    date: "2025-02-24 16:15",
    customerName: "Delhi Tech Solutions",
    customerType: "Corporate",
    productId: "PRD-103",
    productName: "27-inch 4K IPS Monitor",
    quantity: 1,
    unitPrice: 24999.00,
    totalAmount: 24999.00,
    paymentMethod: "Credit Card",
    processedBy: "Store Manager"
  },
  {
    id: "TXN-9043",
    date: "2025-02-25 11:05",
    customerName: "Vikram Singh",
    customerType: "Regular",
    productId: "PRD-107",
    productName: "Cat6 Ethernet Cable (10m)",
    quantity: 5,
    unitPrice: 499.00,
    totalAmount: 2495.00,
    paymentMethod: "Cash",
    processedBy: "Staff"
  }
];

export const SCHEMA_TABLES = [
  {
    tableName: "Products",
    columns: [
      { name: "product_id", type: "VARCHAR(20)", key: "PK", desc: "Unique product identifier" },
      { name: "product_name", type: "VARCHAR(100)", key: "", desc: "Name of item" },
      { name: "category", type: "VARCHAR(50)", key: "", desc: "Item category grouping" },
      { name: "supplier_id", type: "VARCHAR(20)", key: "FK", desc: "References Suppliers(supplier_id)" },
      { name: "price", type: "DECIMAL(10,2)", key: "", desc: "Retail selling price" },
      { name: "cost_price", type: "DECIMAL(10,2)", key: "", desc: "Supplier purchase cost" },
      { name: "stock_quantity", type: "INTEGER", key: "", desc: "Units currently in stock" },
      { name: "min_stock_threshold", type: "INTEGER", key: "", desc: "Reorder trigger level" },
      { name: "sku", type: "VARCHAR(50)", key: "UNIQUE", desc: "Stock Keeping Unit code" }
    ]
  },
  {
    tableName: "Suppliers",
    columns: [
      { name: "supplier_id", type: "VARCHAR(20)", key: "PK", desc: "Unique supplier ID" },
      { name: "company_name", type: "VARCHAR(100)", key: "", desc: "Supplier business name" },
      { name: "contact_person", type: "VARCHAR(100)", key: "", desc: "Primary contact name" },
      { name: "email", type: "VARCHAR(100)", key: "", desc: "Contact email address" },
      { name: "phone", type: "VARCHAR(20)", key: "", desc: "Phone number" },
      { name: "rating", type: "DECIMAL(3,1)", key: "", desc: "Performance score out of 5" }
    ]
  },
  {
    tableName: "Sales_Transactions",
    columns: [
      { name: "transaction_id", type: "VARCHAR(20)", key: "PK", desc: "Unique sale reference" },
      { name: "transaction_date", type: "TIMESTAMP", key: "", desc: "Date and time of sale" },
      { name: "product_id", type: "VARCHAR(20)", key: "FK", desc: "References Products(product_id)" },
      { name: "quantity", type: "INTEGER", key: "", desc: "Number of units sold" },
      { name: "unit_price", type: "DECIMAL(10,2)", key: "", desc: "Price per unit at sale time" },
      { name: "total_amount", type: "DECIMAL(10,2)", key: "", desc: "Computed sale total" },
      { name: "payment_method", type: "VARCHAR(30)", key: "", desc: "UPI / Card / Cash" },
      { name: "processed_by", type: "VARCHAR(50)", key: "", desc: "Staff user role" }
    ]
  }
];

export const PRESET_SQL_QUERIES = [
  {
    title: "Find Low Stock Items (Reorder Warning)",
    sql: "SELECT product_id, name, category, stock, min_stock_threshold FROM Products WHERE stock <= min_stock_threshold ORDER BY stock ASC;",
    description: "Queries all inventory items where current stock is equal to or below the minimum reorder threshold."
  },
  {
    title: "Inventory Valuation & Profit Margins",
    sql: "SELECT category, COUNT(*) as total_items, SUM(stock * price) as total_retail_value, SUM(stock * (price - cost_price)) as estimated_profit_potential FROM Products GROUP BY category ORDER BY total_retail_value DESC;",
    description: "Computes total inventory valuation and profit margin capability grouped by product category."
  },
  {
    title: "Supplier Stock Contribution (JOIN Query)",
    sql: "SELECT s.company_name, p.name AS product_name, p.stock, p.price FROM Products p INNER JOIN Suppliers s ON p.supplier_id = s.supplier_id ORDER BY s.company_name;",
    description: "Executes a relational INNER JOIN to map products to their respective supplying companies."
  },
  {
    title: "Top Revenue Generating Products",
    sql: "SELECT product_id, product_name, SUM(quantity) as units_sold, SUM(total_amount) as total_revenue FROM Sales_Transactions GROUP BY product_id, product_name ORDER BY total_revenue DESC;",
    description: "Aggregates sales records to identify top-performing products by revenue."
  }
];
