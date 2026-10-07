import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { AnimalStore } from '../../data/animal.store';

@Component({
  selector: 'app-animal-list',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
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
  protected readonly selectedSpecies = signal<string | null>(null);

  protected readonly speciesOptions = computed(() =>
    [...new Set(this.animalStore.entities().map((animal) => animal.species))].sort((a, b) =>
      a.localeCompare(b),
    ),
  );

  protected readonly filteredAnimals = computed(() => {
    const species = this.selectedSpecies();
    const animals = this.animalStore.entities();
    return species !== null && this.speciesOptions().includes(species)
      ? animals.filter((animal) => animal.species === species)
      : animals;
  });
}
