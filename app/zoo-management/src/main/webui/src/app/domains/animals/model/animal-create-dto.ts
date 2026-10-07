export type AnimalCreateDto = {
  name: string;
  species: string;
  age: number | null;
  enclosure: string;
};

export const initialAnimal: AnimalCreateDto = {
  age: null,
  enclosure: '',
  name: '',
  species: '',
};
