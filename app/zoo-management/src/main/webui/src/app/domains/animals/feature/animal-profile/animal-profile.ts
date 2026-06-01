import { ChangeDetectionStrategy, Component, inject, input, numberAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { AnimalStore } from '../../data/animal.store';
import { AnimalDeleteDialogComponent } from '../animal-delete-dialog/animal-delete-dialog';

@Component({
  selector: 'app-animal-profile',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
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
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  protected readonly id = input.required({ transform: numberAttribute });

  constructor() {
    this.animalStore.selectAnimalById(this.id);
  }

  protected openDeleteDialog(animalId: number, animalName: string): void {
    this.dialog
      .open(AnimalDeleteDialogComponent, {
        data: { name: animalName },
      })
      .afterClosed()
      .subscribe((confirmed: boolean | undefined) => {
        if (confirmed !== true) {
          return;
        }

        this.animalStore.delete(animalId);
        void this.router.navigateByUrl('/animals');
      });
  }
}
