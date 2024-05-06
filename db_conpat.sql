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

insert into iventario(Patrimonio, Produto, Marca, Serie, Modelo, Colaborador, Entrada) values(
"000400", "Gabinete", "HP", "BRJ45hP07JS", "Compaq 4300 ", "Felipe", " Entrada "

);

select * from iventario;


<<<<<<< Updated upstream
=======
upa
>>>>>>> Stashed changes











