import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Enclosure } from '@gpdc-zoo/enclosures/model/enclosure';

@Injectable({ providedIn: 'root' })
export class EnclosureService {
  private readonly http = inject(HttpClient);

  getEnclosures(): Observable<Enclosure[]> {
    return this.http.get<Enclosure[]>('/api/enclosures');
  }
}
