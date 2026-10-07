import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { EnclosureStore } from '@gpdc-zoo/enclosures/data/enclosure.store';

@Component({
  selector: 'app-enclosure-overview',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    RouterLink,
    TranslocoPipe,
  ],
  templateUrl: './enclosure-overview.html',
  styleUrl: './enclosure-overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnclosureOverviewComponent implements OnInit {
  protected readonly enclosureStore = inject(EnclosureStore);

  ngOnInit(): void {
    this.enclosureStore.loadEnclosures();
  }
}
