import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AnimalCreateDto } from '../model/animal-create-dto';
import { Animal } from '../model/animal';

@Injectable({ providedIn: 'root' })
export class AnimalService {
  private readonly http = inject(HttpClient);

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>('/api/animals');
  }

  createAnimal(data: AnimalCreateDto): Observable<Animal> {
    return this.http.post<Animal>('/api/animals', data);
  }
}
