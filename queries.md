# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.

SELECT ProductName, CategoryName 
FROM Products as P
LEFT JOIN Categories AS C
ON P.CategoryID=C.CategoryID

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.

SELECT OrderID as Orders, ShipperName as Shipper
FROM Orders as O
LEFT JOIN Shippers as S
ON O.ShipperID=S.ShipperID
WHERE OrderDate < '1997-01-09'

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.
SELECT ProductName, Quantity FROM OrderDetails as O
JOIN Products as P
ON O.ProductID=P.ProductID
WHERE OrderID = 10251
ORDER BY ProductName

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.
SELECT OrderID as 'Order', CustomerName as Customer, LastName as 'Employee Last Name' FROM Orders as O
JOIN Customers as C
ON O.CustomerID = C.CustomerID
JOIN Employees as E
ON O.EmployeeID = E.EmployeeID

### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

SELECT CategoryName as Category, count(ProductName) as '# of Products' 
FROM Categories as C
JOIN Products as P
ON C.CategoryID = P.CategoryID
GROUP BY CategoryName

### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records. https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all

SELECT O.OrderID, count(ProductID) as '# of Products'
FROM Orders as O
JOIN OrderDetails as OD
ON O.OrderID = OD.OrderID
GROUP BY O.OrderID