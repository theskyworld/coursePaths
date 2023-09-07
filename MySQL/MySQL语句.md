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

使用内连接或者外连接语句来同时选取多张数据表中的内容

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
