import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { TranslocoPipe } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';

import { AnimalStore } from '../../data/animal.store';

@Component({
  selector: 'app-animal-list',
  imports: [MatIconModule, MatProgressBarModule, MatTableModule, RouterLink, TranslocoPipe],
  templateUrl: './animal-list.html',
  styleUrl: './animal-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalListComponent {
  protected readonly animalStore = inject(AnimalStore);
  protected readonly displayedColumns = ['name', 'species'];
}
