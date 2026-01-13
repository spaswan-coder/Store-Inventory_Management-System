-- Customer Table
CREATE TABLE Customer (
	CustomerID SERIAL PRIMARY KEY,
	Name VARCHAR(100) NOT NULL,
	Email VARCHAR(100) UNIQUE,
	ContactNumber VARCHAR(15) UNIQUE NOT NULL,
	Address TEXT,
	MemberShip VARCHAR(20) DEFAULT 'Basic' CHECK (MemberShip IN ('Basic', 'Silver', 'Gold', 'Platinum')), 
	LoyaltyPoints INT DEFAULT 0 CHECK (LoyaltyPoints >= 0)
);

-- Employee Table
CREATE TABLE Employee (
	EmployeeID SERIAL PRIMARY KEY,
	Name VARCHAR(100) NOT NULL,
	Email VARCHAR(100) UNIQUE NOT NULL,
	ContactNumber VARCHAR(15),
	Salary DECIMAL(10,2) CHECK (Salary >= 0)
);

-- Category Table
CREATE TABLE Category (
	CategoryID SERIAL PRIMARY KEY,
	Name VARCHAR(50) NOT NULL,
	Description TEXT
);

-- Supplier Table
CREATE TABLE Supplier (
	SupplierID SERIAL PRIMARY KEY,
	Name VARCHAR(100) NOT NULL,
	ContactNumber VARCHAR(15),
	Email VARCHAR(100),
	Address TEXT
);

-- Vendor Table
CREATE TABLE Vendor (
	VendorID SERIAL PRIMARY KEY,
	Name VARCHAR(100) NOT NULL,
	ContactNumber VARCHAR(15),
	Email VARCHAR(100),
	Address TEXT
);

-- Product Table
CREATE TABLE Product (
	ProductID SERIAL PRIMARY KEY,
	Name VARCHAR(100) NOT NULL,
	Description TEXT,
	Price DECIMAL(10,2) NOT NULL CHECK (Price >= 0),
	StockQuantity INT NOT NULL CHECK (StockQuantity >= 0),
	ExpiryDate DATE,
	ReOrderLevel INT CHECK (ReOrderLevel >= 0),
	CategoryID INT,
	SupplierID INT,
	FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID) ON DELETE SET NULL,
	FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID) ON DELETE SET NULL
);


-- Sales Invoice Table
CREATE TABLE SalesInvoice (
	InvoiceID SERIAL PRIMARY KEY,
	CustomerID INT,
	EmployeeID INT,
	InvoiceDate DATE NOT NULL DEFAULT CURRENT_DATE,
	TotalAmount DECIMAL(10,2) DEFAULT 0 CHECK (TotalAmount >= 0),
	DiscountApplied DECIMAL(10,2) CHECK (DiscountApplied >= 0),
	TaxAmount DECIMAL(10,2) CHECK (TaxAmount >= 0),
	PaymentMode VARCHAR(50),
	FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE SET NULL,
	FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID) ON DELETE SET NULL
);

-- Sales Detail Table
CREATE TABLE SalesDetail (
	InvoiceID INT,
	ProductID INT,
	Quantity INT NOT NULL CHECK (Quantity > 0),
	LineTotal DECIMAL(10,2) CHECK (LineTotal >= 0),
	PRIMARY KEY (InvoiceID, ProductID),
	FOREIGN KEY (InvoiceID) REFERENCES SalesInvoice(InvoiceID) ON DELETE CASCADE,
	FOREIGN KEY (ProductID) REFERENCES Product(ProductID) ON DELETE CASCADE
);

-- Payment Table
CREATE TABLE Payment (
	PaymentID SERIAL PRIMARY KEY,
	InvoiceID INT,
	AmountPaid DECIMAL(10,2) NOT NULL CHECK (AmountPaid >= 0),
	PaymentMethod VARCHAR(50),
	FOREIGN KEY (InvoiceID) REFERENCES SalesInvoice(InvoiceID) ON DELETE CASCADE
);

-- Returns Table
CREATE TABLE Returns (
	ReturnID SERIAL PRIMARY KEY,
	InvoiceID INT,
	CustomerID INT,
	ProductID INT,
	RefundAmount DECIMAL(10,2) CHECK (RefundAmount >= 0),
	Reason TEXT,
	ReturnDate DATE DEFAULT CURRENT_DATE,
	Status VARCHAR(20) CHECK (Status IN ('Pending', 'Approved', 'Rejected')),
	FOREIGN KEY (InvoiceID) REFERENCES SalesInvoice(InvoiceID) ON DELETE CASCADE,
	FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE,
	FOREIGN KEY (ProductID) REFERENCES Product(ProductID) ON DELETE SET NULL
);

-- Feedback Table
CREATE TABLE Feedback (
	FeedbackID SERIAL PRIMARY KEY,
	CustomerID INT,
	Rating INT CHECK (Rating BETWEEN 1 AND 5),
	Comments TEXT,
	ResponseStatus VARCHAR(20) CHECK (ResponseStatus IN ('Pending', 'Resolved')),
	FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE SET NULL
);

-- Complaints Table
CREATE TABLE Complaints (
	ComplaintID SERIAL PRIMARY KEY,
	CustomerID INT,
	IssueDescription TEXT NOT NULL,
	ResolutionStatus VARCHAR(50) CHECK (ResolutionStatus IN ('Pending', 'In Progress', 'Resolved')),
	FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE SET NULL
);

-- Purchase Order Table
CREATE TABLE PurchaseOrder (
	OrderID SERIAL PRIMARY KEY,
	SupplierID INT,
	OrderDate DATE NOT NULL DEFAULT CURRENT_DATE,
	Status VARCHAR(50) CHECK (Status IN ('Pending', 'Shipped', 'Delivered', 'Cancelled')),
	TotalAmount DECIMAL(10,2) DEFAULT 0 CHECK (TotalAmount >= 0),
	FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID) ON DELETE CASCADE
);

-- Purchase Order Details Table
CREATE TABLE PurchaseOrderDetails (
	OrderDetailID SERIAL PRIMARY KEY,
	OrderID INT,
	ProductID INT,
	Quantity INT NOT NULL CHECK (Quantity > 0),
	PricePerUnit DECIMAL(10,2) CHECK (PricePerUnit >= 0),
	FOREIGN KEY (OrderID) REFERENCES PurchaseOrder(OrderID) ON DELETE CASCADE,
	FOREIGN KEY (ProductID) REFERENCES Product(ProductID) ON DELETE CASCADE
);

-- Store Expenses Table
CREATE TABLE StoreExpenses (
	ExpenseID SERIAL PRIMARY KEY,
	VendorID INT,
	ExpenseType VARCHAR(50),
	Amount DECIMAL(10,2) CHECK (Amount >= 0),
	ExpenseDate DATE NOT NULL DEFAULT CURRENT_DATE,
	Status VARCHAR(20) CHECK (Status IN ('Pending', 'Paid')),
	FOREIGN KEY (VendorID) REFERENCES Vendor(VendorID) ON DELETE SET NULL
);


-- Transaction Logs Table
CREATE TABLE TransactionLog (
	LogID SERIAL PRIMARY KEY,
	EmployeeID INT,
	ActionType VARCHAR(50),
	Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID) ON DELETE CASCADE
);

-- Role Table
CREATE TABLE Role (
	RoleID SERIAL PRIMARY KEY,
	RoleName VARCHAR(50) NOT NULL,
	Permission VARCHAR(100) NOT NULL
);
