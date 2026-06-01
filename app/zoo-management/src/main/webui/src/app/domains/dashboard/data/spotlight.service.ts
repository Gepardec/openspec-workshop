import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SpotlightResponse } from '@gpdc-zoo/dashboard/model/spotlight-response';

@Injectable({ providedIn: 'root' })
export class SpotlightService {
  private readonly http = inject(HttpClient);

  getSpotlight(): Observable<SpotlightResponse> {
    return this.http.get<SpotlightResponse>('/api/dashboard/spotlight');
  }
}
