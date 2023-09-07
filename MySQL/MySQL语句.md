# MySQL语句

## 选择性语句

### `use`语句

```sql
USE sql_store;   -- 选择当前使用的数据库
```

### `select`语句

```sql
-- 应当保持以下语句顺序的正确性
SELECT customer_id, first_name -- 选择customer_id 和first_name列
SELECT * -- 选择所有的列 （注意选择所有的列可能对服务器造成性能压力）
FROM customers -- 从customers数据表中进行获取
-- FROM sql_store.customers
WHERE customer_id = 1 -- 筛选出customer_id = 1的行
ORDER BY first_name -- 按照first_name进行排序
LIMIT 3; -- 取前三行
```

```sql
SELECT last_name, first_name, points
FROM customers; -- 从customers中依次选择last_name, first_name和points列

SELECT points, points + 10; 
FROM customers; -- 从customers中依次选择points和points列每行中的值加10之后的列

SELECT 
        last_name,
        first_name,
        points,
        points * 10 + 10  -- 先乘以后相加，可以使用()改变顺序
FROM customers;

SELECT 
        last_name,
        first_name,
        points,
        points * 10 + 10 AS discount_factor  -- 并将该列的类名更改为discount_factor
FROM customers;

SELECT 
        name,
        unit_price,
        unit_price * 1.1 AS "new price" -- 并将该列的类名更改为new price
FROM sql_store.products;

SELECT DISTINCT state
FROM customers; -- 从customers中选择state列，如果在该列中存在重复的行，则只取其中一行
```

### `where`语句

关系运算符

```sql
SELECT * 
FROM customers
WHERE points > 3000; -- 从customers中选择所有points列的值 > 3000的列

SELECT * 
FROM customers
WHERE state = 'VA'  -- 从customers中选择所有state列的值等于VA的列

SELECT * 
FROM customers
-- WHERE state <> 'VA'
WHERE state != 'VA'  -- 从customers中选择所有state列的值等于VA的列

SELECT * 
FROM customers
WHERE birth_date > '1990-01-01'; -- 从customers中选择所有出生日期的值在1990-01-01之后的列，日期的标准格式


SELECT * 
FROM customers
WHERE birth_date > '1990-01-01'
AND points > 1000; -- 从customers中选择所有出生日期的值在1990-01-01之后且points列的值大于1000的列


SELECT * 
FROM customers
WHERE birth_date > '1990-01-01'
OR points > 1000; -- 从customers中选择所有出生日期的值在1990-01-01之后或者points列的值大于1000的列


SELECT * 
FROM customers
WHERE birth_date > '1990-01-01'
OR (points > 1000
AND state = 'VA'); -- 从customers中选择所有points列的值大于100并且state列的值等于VA之后或者出生日期大于1990-01-01的所有列，AND的优先级高于OR，可以使用()更改
 

SELECT * 
FROM customers
WHERE NOT (birth_date > '1990-01-01' OR points > 1000); -- 对后面的条件进行取反

SELECT * 
FROM order_items
WHERE order_id = 6
AND quantity * unit_price > 30; -- 在order_items中选择所有order_id的值等于6且quantity列的值 * unit_price列的值大于30的列

-- 关系运算符包括
-- > >= < <= 
-- =
-- != 或者 <>  
```

取反运算

```sql
SELECT * 
FROM customers
WHERE state = 'VA' OR state = 'GA' OR state = 'FL'; 
-- 等价于
WHERE state IN ("VA", "FL", "GA");
-- 取反
WHERE state NOT IN ("VA", "FL", "GA");
```

`between...and...`

```sql
SELECT * 
FROM customers
WHERE points >= 1000 AND points <= 3000;
-- 等价于
WHERE points BETWEEN 1000 AND 3000;

```

```sql
SELECT * 
FROM customers
WHERE birth_date BETWEEN '1990-01-01' AND '2000-01-01';
```

字符串匹配

```sql
SELECT *
FROM customers
WHERE last_name LIKE 'b%'; -- 从customers中选择所有last_name的值以b(B)开头且字符个数任意的列，%表示任意长度的任意字符
WHERE last_name LIKE '%b%'; -- last_name列的值的字符串中任意位置包含b的所有列
WHERE last_name LIKE '%y'; -- 以y结尾
WHERE last_name LIKE '_y'; -- _表示任意的单个字符
WHERE last_name LIKE '_____y'; -- y前面包含5个任意字符
WHERE last_name LIKE 'b____y'; 

SELECT *
FROM customers
WHERE address LIKE '%trail%' OR 
      address LIKE '%avenue%';
-- WHERE phone LIKE '%9';


-- 使用正则表达式进行匹配
SELECT * 
FROM customers
WHERE last_name LIKE '%field%';
-- 等价于
WHERE last_name REGEXP 'field';

SELECT * 
FROM customers
WHERE last_name REGEXP 'field'; -- 包含field
WHERE last_name REGEXP 'field$'; -- 以field结尾
WHERE last_name REGEXP 'field|mac'; -- 包含field或者mac
WHERE last_name REGEXP '^field|mac'; -- 以field或者mac开头
WHERE last_name REGEXP 'field$|mac'; -- 以field结尾或者包含mac
WHERE last_name REGEXP '[gim]e'; -- 包含ge或者ie或者me
WHERE last_name REGEXP '[a-h]e'; -- 包含ae或者be或者ce...或者he

SELECT * 
FROM customers
-- WHERE first_name REGEXP 'elka|ambur';
-- WHERE last_name REGEXP 'ey$|on$';
-- WHERE last_name REGEXP '^my|se';
WHERE last_name REGEXP 'br|bu';
-- 或者
WHERE last_name REGEXP 'b[ru]';
```

`Null`

```sql
SELECT * 
FROM customers
WHERE phone IS NULL; -- phone列的值为Null
WHERE phone IS NOT NULL; -- phone列的值不为Null

SELECT * 
FROM orders
WHERE shipped_date IS NULL;
```

### `order by`语句

```sql
SELECT * 
FROM customers
ORDER BY first_name DESC; -- 根据first_name进行降序排序


SELECT * 
FROM customers
ORDER BY state, first_name; -- 同时根据state和first_name进行排序，state优先于first_name


SELECT *, quantity * unit_price AS total_price -- 新增total_price列用于展示
FROM order_items
WHERE order_id = 2
ORDER BY quantity * unit_price DESC;
-- 等价于
SELECT *, quantity * unit_price AS total_price
FROM order_items
WHERE order_id = 2
ORDER BY total_price DESC;
```

### `limit`语句

```sql
SELECT * 
FROM customers
LIMIT 3; -- 从customers中前三行的所有列

SELECT *
FROM customers
LIMIT 6, 3; -- 第一个数字表示偏移量，跳过前六行，取第7-9三行中的所有列

SELECT *
FROM customers
ORDER BY points DESC
LIMIT 3;
```

## 连接性语句

使用内连接或者外连接语句来同时选取多张数据表或数据库中的内容

### 内连接

#### 跨数据表连接

```sql
-- 同时选取orders和customers数据表中的所有列，当两表中的customer_id列的值相同时
SELECT *
FROM orders
JOIN customers
ON orders.customer_id = customers.customer_id;


-- 同时选取orders和customers数据表中的order_id, orders.customer_id, first_name, last_name列，当两表中的customer_id列的值相同时
SELECT order_id, orders.customer_id, first_name, last_name
FROM orders
JOIN customers
ON orders.customer_id = customers.customer_id;


-- 分别给orders和customers取别名
-- 取别名后原名orders和customers将失效
SELECT order_id, o.customer_id, first_name, last_name
FROM orders o
JOIN customers c
ON o.customer_id = c.customer_id;


SELECT order_id, oi.product_id, quantity, oi.unit_price, p.name
FROM order_items oi
JOIN products p
ON oi.product_id = p.product_id;
```

#### 跨数据库连接

```sql
-- 跨sql_inventory和sql_store数据库
USE sql_inventory;


SELECT *
FROM sql_store.order_items oi
JOIN products p 
ON oi.product_id = p.product_id;
```

#### 自连接

```sql
USE sql_hr;

-- 将employees表进行自连接，
-- 展示所有员工以及其对应的reports_to的上级领导的信息
-- 便于建立类似于以下的组织架构图
--         上级领导
--  
-- 员工一   员工二  员工三 ...
SELECT *
FROM employees e
JOIN employees m
ON e.reports_to = m.employee_id;


SELECT 
 e.employee_id,
    e.first_name,
    m.first_name AS manager
FROM employees e
JOIN employees m
ON e.reports_to = m.employee_id;
```

#### 连接多张数据表

```sql
USE sql_store;

-- 连接多张数据表 
SELECT * 
FROM orders o 
JOIN customers c
 ON o.customer_id = c.customer_id
JOIN order_statuses os
 ON o.status = os.order_status_id;

SELECT 
    o.order_id,
    o.order_date,
    c.first_name,
    c.last_name
FROM orders o
JOIN customers c
 ON o.customer_id = c.customer_id
JOIN order_statuses os
 ON o.status = os.order_status_id;
```

```sql
USE sql_invoicing;

SELECT *
FROM payments p
JOIN clients c
 ON p.client_id = c.client_id
JOIN payment_methods pm
 ON p.payment_method = pm.payment_method_id;
    
    
SELECT 
    p.date,
    p.invoice_id,
    p.amount,
    c.name,
    pm.name AS payment_method
FROM payments p
JOIN clients c
 ON p.client_id = c.client_id
JOIN payment_methods pm
 ON p.payment_method = pm.payment_method_id;
```

#### 复合连接条件

连接带有复合主键的数据表

复合主键只一个数据表中存在多个列名作为主键值，以便将他们结合起来来标记每项的唯一性

```sql
USE sql_store;

SELECT *
FROM order_items oi
JOIN order_item_notes oin
 ON oi.order_id = oin.order_id
 AND oi.product_id = oin.product_id;

```

#### 隐式连接条件写法

建议使用显式写法

```sql
-- 连接条件的隐式写法
USE sql_store;

-- 显式写法
SELECT * 
FROM orders o
JOIN customers c
 ON o.customer_id = c.customer_id;
    
-- 等价于
-- 隐式写法
SELECT * 
FROM orders o, customers c
WHERE o.customer_id = c.customer_id;

```

### 外连接

#### 左连接

```sql
USE sql_store;

-- 使用以下内连接只能选取到有订单的客户
SELECT 
    c.customer_id, c.first_name, o.order_id
FROM
    customers c
        JOIN
    orders o ON c.customer_id = o.customer_id
ORDER BY c.customer_id;

-- 现使用外连接，选取到所有的客户
-- 左连接，JOIN关键字左侧的数据表(customers)中的行都会被选取，无论是否符合连接条件
SELECT 
 c.customer_id,
    c.first_name,
    o.order_id
FROM customers c
LEFT JOIN orders o
 ON c.customer_id = o.customer_id
ORDER BY c.customer_id;
```

#### 右连接

```sql
-- 右连接，JOIN关键字右侧的数据表(orders)中的行都会被选取，无论是否符合连接条件
SELECT 
 c.customer_id,
    c.first_name,
    o.order_id
FROM customers c
RIGHT JOIN orders o
 ON c.customer_id = o.customer_id
ORDER BY c.customer_id;
```

```sql
USE sql_store;

SELECT 
 p.product_id,
    name,
    quantity
FROM products p
LEFT JOIN order_items oi
 ON p.product_id = oi.product_id;

```

#### 多表外连接

```sql
USE sql_store;

SELECT * 
FROM customers c
LEFT JOIN orders o
 ON c.customer_id = o.customer_id
LEFT JOIN shippers s
 ON o.shipper_id = s.shipper_id
ORDER BY c.customer_id;

```

```sql
USE sql_store;

SELECT 
 order_date,
    o.order_id,
    c.first_name,
    s.name AS shipper,
    os.name AS status
FROM orders o
JOIN customers c
 ON o.customer_id = c.customer_id
LEFT JOIN shippers s
 ON o.shipper_id = s.shipper_id
JOIN order_statuses os
 ON o.status = os.order_status_id
ORDER BY order_id;
```

#### 结合自连接

```sql
USE sql_hr;

SELECT 
 e.employee_id,
    e.first_name,
    m.first_name
FROM employees e
LEFT JOIN employees m
 ON e.reports_to = m.employee_id;
```

### `using`语句

当例如连接条件中出现多个同名的名称时，可以使用`using`语句来简化连接条件的书写

```sql
USE sql_store;

SELECT 
 o.order_id,
    c.first_name
FROM orders o
JOIN customers c
 -- ON o.customer_id = c.customer_id;
    -- 等价于
    USING(customer_id);

```

```sql
USE sql_store;

SELECT 
 o.order_id,
    c.first_name,
    sh.name AS shipper
FROM orders o
JOIN customers c
    USING(customer_id)
LEFT JOIN shippers sh
 USING(shipper_id);

```

```sql
-- 处理复合连接条件（主键）
USE sql_store;

SELECT *
FROM order_items oi
JOIN order_item_notes oin
 -- ON oi.order_id = oin.order_id
    -- AND oi.product_id = oin.product_id;
-- 等价于
 USING(order_id, product_id);
```

```sql
USE sql_invoicing;


SELECT 
 date,
    c.name AS client,
    amount,
    pm.name AS payment_method
FROM payments p 
JOIN clients c
 USING(client_id)
JOIN payment_methods pm
 ON p.payment_method = pm.payment_method_id;

```

### 自然连接

让系统自己基于不同的数据表之间共同的列来进行连接

```sql
USE sql_store;


SELECT 
 o.order_id,
    c.first_name
FROM orders o
NATURAL JOIN customers c
```

### 交叉连接

```sql
USE sql_store;


SELECT
 c.first_name AS customer,
    p.name AS product
FROM customers c
CROSS JOIN products p
ORDER BY c.first_name;

-- 隐式写法
SELECT
 c.first_name AS customer,
    p.name AS product
FROM customers c, products p
ORDER BY c.first_name
```

```sql
USE sql_store;


SELECT 
 s.name AS shipper,
    p.name AS product
FROM shippers s
CROSS JOIN products p
ORDER BY s.name;

-- 隐式写法
SELECT 
 s.name AS shipper,
    p.name AS product
FROM shippers s, products p
ORDER BY s.name;
```

### 联合连接

将多个选择语句进行联合执行

```sql
USE sql_store;


SELECT 
 order_id,
    order_date,
    'Active' AS status -- 增加一列名称为status的列用于展示，其值为Active
FROM orders
WHERE order_date >= '2019-01-01'

UNION -- 使用联合连接，联合上述和下面的选择语句进行执行

SELECT 
 order_id,
    order_date,
    'Archived' AS status -- 增加一列名称为status的列用于展示，其值为Archived
FROM orders
WHERE order_date < '2019-01-01'
```

```sql
USE sql_store;


SELECT first_name
FROM customers
UNION
SELECT name
FROM shippers;

```

```sql
USE sql_store;

-- 使用联合连接根据points的值所处的区间来划分type的值
SELECT 
 customer_id,
    first_name,
    points,
    'Bronze' AS type
FROM customers
WHERE points < 2000
UNION
SELECT 
 customer_id,
    first_name,
    points,
    'Silver' AS type
FROM customers
WHERE points BETWEEN 2000 AND 3000
UNION
SELECT  
 customer_id,
    first_name,
    points,
    'Gold' AS type
FROM customers
WHERE points > 3000
ORDER BY first_name;
```

## 对行进行操作

### 列属性

根据当前列的属性对当前列中能输入的每行的值、值的类型、该列是否为主键、值是否递增等进行限制

![image-20230908011240674](C:\Users\ycx\AppData\Roaming\Typora\typora-user-images\image-20230908011240674.png)

#### 插入单行

```sql
USE sql_store;

-- 对所有的列进行赋值
INSERT INTO customers
-- 依次填写第一列(customer_id)、第二列(first_name)、第三列(last_name)...的值
-- 因为第一列(存在默认值)默认自动递增，所以直接填写其默认值DEFAULT，而不是填写自定义的值
VALUES(
    DEFAULT,
    'JOhn',
    'Smith',
    '1990-01-01',
    NULL,
    'address',
    'city',
    'CA',
    DEFAULT
    )

```

```sql
-- 对指定的列进行赋值，不赋值的使用默认值
INSERT INTO customers (
    first_name,
    last_name,
    birth_date,
    address,
    city,
    state
    )
VALUES(
    'JOhn2',
    'Smith2',
    '1990-01-01',
    'address',
    'city',
    'CA'
);

```
