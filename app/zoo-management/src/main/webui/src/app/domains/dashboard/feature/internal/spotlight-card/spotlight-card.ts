import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { SpotlightResponse } from '@gpdc-zoo/dashboard/model/spotlight-response';

@Component({
  selector: 'app-spotlight-card',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink, TranslocoPipe],
  templateUrl: './spotlight-card.html',
  styleUrl: './spotlight-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotlightCardComponent {
  readonly spotlight = input.required<SpotlightResponse>();
}
