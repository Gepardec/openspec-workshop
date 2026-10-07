insert into animals (id, name, species, age, enclosure) values(1, 'Leo', 'Löwe', 8, 'Savanne 1');
insert into animals (id, name, species, age, enclosure) values(2, 'Ellie', 'Elefant', 15, 'Afrika-Haus');
insert into animals (id, name, species, age, enclosure) values(3, 'Nemo', 'Clownfisch', 3, 'Riffbecken');
insert into animals (id, name, species, age, enclosure) values(4, 'Buddy', 'Pinguin', 6, 'Polarwelt');
insert into animals (id, name, species, age, enclosure) values(5, 'Zara', 'Zebra', 5, 'Savanne 2');
insert into animals (id, name, species, age, enclosure, fun_fact) values(6, 'Blitz', 'Gepard', 4, 'Raubkatzen-Areal', 'Kann in wenigen Sekunden von 0 auf 100 km/h sprinten.');
alter sequence animals_seq restart with 7;
