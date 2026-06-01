import { ChangeDetectionStrategy, Component, inject, input, numberAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { AnimalStore } from '../../data/animal.store';

@Component({
  selector: 'app-animal-profile',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    RouterLink,
    TranslocoPipe,
  ],
  templateUrl: './animal-profile.html',
  styleUrl: './animal-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalProfileComponent {
  protected readonly animalStore = inject(AnimalStore);

  protected readonly id = input.required({ transform: numberAttribute });

  constructor() {
    this.animalStore.selectAnimalById(this.id);
  }
}
