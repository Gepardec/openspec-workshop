import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { AnimalStore } from '../../data/animal.store';

@Component({
  selector: 'app-animal-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    RouterLink,
    TranslocoPipe,
  ],
  templateUrl: './animal-list.html',
  styleUrl: './animal-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalListComponent {
  protected readonly animalStore = inject(AnimalStore);
  protected readonly displayedColumns = ['name', 'species'];
}
