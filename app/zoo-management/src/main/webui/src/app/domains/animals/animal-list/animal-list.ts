import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { TranslocoPipe } from '@jsverse/transloco';

import { AnimalStore } from './animal.store';

@Component({
  selector: 'app-animal-list',
  imports: [MatIconModule, MatProgressBarModule, MatTableModule, TranslocoPipe],
  providers: [AnimalStore],
  templateUrl: './animal-list.html',
  styleUrl: './animal-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalListComponent {
  protected readonly animalStore = inject(AnimalStore);
  protected readonly displayedColumns = ['name', 'species'];

  constructor() {
    effect(() => {
      this.animalStore.loadAnimals();
    });
  }
}
