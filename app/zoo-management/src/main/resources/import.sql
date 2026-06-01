insert into animals (id, name, species, age, enclosure, notes) values(1, 'Leo', 'Löwe', 8, 'Savanne 1', 'Lieblingsplatz am Schattenfelsen.');
insert into animals (id, name, species, age, enclosure, notes) values(2, 'Ellie', 'Elefant', 15, 'Afrika-Haus', 'Genießt die Wasserdusche am Nachmittag.');
insert into animals (id, name, species, age, enclosure, notes) values(3, 'Nemo', 'Clownfisch', 3, 'Riffbecken', 'Versteckt sich oft in der Seeanemone.');
insert into animals (id, name, species, age, enclosure, notes) values(4, 'Buddy', 'Pinguin', 6, 'Polarwelt', 'Sehr aktiv während der Fütterung.');
insert into animals (id, name, species, age, enclosure, notes) values(5, 'Zara', 'Zebra', 5, 'Savanne 2', 'Hält sich meist in der Nähe der Tränke auf.');
insert into animals (id, name, species, age, enclosure, notes) values(6, 'Blitz', 'Gepard', 4, 'Raubkatzen-Areal', 'Reagiert gut auf Enrichment-Training.');
alter sequence animals_seq restart with 7;
