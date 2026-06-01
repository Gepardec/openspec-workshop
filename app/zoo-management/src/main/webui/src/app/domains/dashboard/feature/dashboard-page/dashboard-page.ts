import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoPipe } from '@jsverse/transloco';

import { SpotlightStore } from '@gpdc-zoo/dashboard/data/spotlight.store';
import { SpotlightCardComponent } from '../internal/spotlight-card/spotlight-card';

@Component({
  selector: 'app-dashboard-page',
  imports: [MatCardModule, MatProgressSpinnerModule, SpotlightCardComponent, TranslocoPipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  protected readonly spotlightStore = inject(SpotlightStore);

  ngOnInit(): void {
    this.spotlightStore.loadSpotlight();
  }
}
