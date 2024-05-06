create database conpat2 character set utf8mb4 collate utf8mb4_unicode_ci;

use conpat2;


select * from inventarios;

show tables; 
 describe inventarios;
 
 
 alter table inventarios drop column createdAt;
 
 select * from inventarios;
 
  alter table inventarios drop column updatedAt;
   select * from inventarios;
   
   alter table inventarios drop column createdAt;
   alter table inventarios drop column updatedAt;
   
   select * from inventarios;
   
   
