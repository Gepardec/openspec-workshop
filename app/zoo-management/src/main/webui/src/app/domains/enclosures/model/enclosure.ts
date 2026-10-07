export type EnclosureAnimal = {
  id: number;
  name: string;
  species: string;
};

export type Enclosure = {
  name: string;
  animalCount: number;
  animals: EnclosureAnimal[];
};
