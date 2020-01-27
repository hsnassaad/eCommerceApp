select u.Email, SUM(o1.TotalPrice) as TotalPrice
from dbo.Orders o1
inner join dbo.Orders o2
ON o1.UserId = o2.UserId AND o1.OrderId = o2.OrderId
inner join dbo.AspNetUsers u
ON o1.UserId = u.Id
Group by u.Email
order by SUM(o1.TotalPrice) desc