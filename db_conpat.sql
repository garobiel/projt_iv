create database conpat character set utf8mb4 collate utf8mb4_unicode_ci;
use conpat; 
CREATE TABLE iventario(
Patrimonio VARCHAR(6),
Produto VARCHAR(100),
Marca VARCHAR(100),
Serie VARCHAR(100),
Modelo VARCHAR(100),
Colaborador VARCHAR(100),
Entrada  VARCHAR(100),
Saida VARCHAR(100)
);

select * from iventario;

describe iventario;

insert into iventario(Patrimonio, Produto, Marca, Serie, Modelo, Colaborador, Entrada, Saida) values(
"000750", "Gabinete", "HP", "BRJ534WS4G", "HP Prodesk 600 G1 SFF", "Lucas Lopes", " - ", " Saída "

);

select * from iventario;






