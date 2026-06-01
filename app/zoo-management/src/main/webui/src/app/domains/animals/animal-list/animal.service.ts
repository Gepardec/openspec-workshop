import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Animal } from './animal';

@Injectable({ providedIn: 'root' })
export class AnimalService {
  private readonly http = inject(HttpClient);

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>('/api/animals');
  }
}
