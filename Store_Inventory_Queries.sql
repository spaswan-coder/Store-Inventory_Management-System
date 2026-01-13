--What products are currently in stock
 select productid, name, stockquantity from product 
 where stockquantity > 0;

--What are today’s sales? example for 2024-10-31
select sum(totalamount) from salesinvoice
where invoicedate = '2024-10-31';

--What was the total revenue last month? for ex: for 5th month ie May
select sum(totalamount) from salesinvoice 
where invoicedate between '2024-05-01' and '2024-05-31';

--Which product has the highest sales this week
 select product.productid, product.name, sum(linetotal) from product 
 join salesdetail on salesdetail.productid = product.productid 
 group by product.productid 
 order by sum(linetotal) desc;

--Show the top 5 best-selling products. 
select product.productid, product.name, sum(quantity) from product 
join salesdetail on product.productid = salesdetail.productid 
group by product.productid 
order by sum(quantity) desc 
limit 5;

--Which employee made the most sales for a given day; ex: on 2024-10-31
select employeeid, count(invoiceid) from salesinvoice 
where invoicedate = '2024-10-31' 
group by employeeid order by count(invoiceid) desc;

--How much did we spend on inventory purchases last month? ex: for January 2025
select sum(totalamount) from purchaseorder 
where orderdate between '2025-01-01' and '2025-01-31';

--Show all purchases from [Supplier Name], ex: supplier name = Topdrive
select * from purchaseorder 
join supplier on purchaseorder.supplierid = supplier.supplierid 
where supplier.name = 'Topdrive';

--Find the top 5 customers who spent the most in the last 6 months, including their
--total spending and the number of orders placed.
select customer.customerid, customer.name, count(invoiceid), sum(totalamount) from customer 
join salesinvoice on customer.customerid = salesinvoice.customerid 
where invoicedate between '2024-09-01' and '2025-02-28' 
group by customer.customerid 
order by sum(totalamount) desc limit 5;

--Find the best-performing employee by calculating the total sales they made and 
--revenue generated from their sales
select employee.employeeid, employee.name, count(invoiceid) as sales_made, sum(totalamount) from salesinvoice
join employee on employee.employeeid = salesinvoice.employeeid 
group by employee.employeeid 
order by sum(totalamount) desc limit 5;

--Find the top selling item on the sales
select product.productid, product.name, count(invoiceid) from product 
join salesdetail on product.productid = salesdetail.productid 
group by product.productid 
order by count(invoiceid) desc limit 5;

--Find products that have'nt been sold yet
select product.productid, product.name from product 
left join salesdetail on product.productid = salesdetail.productid 
where salesdetail.productid is null;

--Find the top 3 suppliers who provide the most number of 
--unique products that have been sold at least once in the last year
SELECT s.SupplierID, s.Name, 
       COUNT(DISTINCT p.ProductID) AS UniqueProductsSold
FROM Supplier s
JOIN Product p ON s.SupplierID = p.SupplierID
WHERE p.ProductID IN (
    SELECT DISTINCT p.productid
    FROM SalesInvoice si
    WHERE si.InvoiceDate >= CURRENT_DATE - INTERVAL '1 year'
)
GROUP BY s.SupplierID, s.Name
ORDER BY UniqueProductsSold DESC
LIMIT 3;

