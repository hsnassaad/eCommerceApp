SELECT Top(5) p.Title, SUM(op.Quantity) as TotalQuantity
FROM Product p 
INNER JOIN OrderProducts op
ON op.ProductId = p.ProductId
GROUP BY p.Title
ORDER BY SUM(op.Quantity) DESC