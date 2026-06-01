import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { TranslocoPipe } from '@jsverse/transloco';

import { AnimalStore } from '../../data/animal.store';
import { AnimalCreateDto } from '../../model/animal-create-dto';

@Component({
  selector: 'app-animal-create',
  imports: [
    FormField,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    TranslocoPipe,
    FormRoot,
  ],
  templateUrl: './animal-create.html',
  styleUrl: './animal-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalCreateComponent {
  protected readonly animalStore = inject(AnimalStore);

  protected readonly model = signal<AnimalCreateDto>({
    age: null,
    enclosure: '',
    name: '',
    notes: '',
    species: '',
  });

  protected readonly animalCreateForm = form(
    this.model,
    (schemaPath) => {
      required(schemaPath.name);
      required(schemaPath.species);
    },
    {
      submission: {
        action: async (field) => {
          this.animalStore.create(field().value());
        },
      },
    },
  );
}
