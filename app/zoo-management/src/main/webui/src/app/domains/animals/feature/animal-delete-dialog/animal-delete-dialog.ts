import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslocoPipe } from '@jsverse/transloco';

type AnimalDeleteDialogData = {
  name: string;
};

@Component({
  selector: 'app-animal-delete-dialog',
  imports: [MatButtonModule, MatDialogModule, TranslocoPipe],
  templateUrl: './animal-delete-dialog.html',
  styleUrl: './animal-delete-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalDeleteDialogComponent {
  protected readonly data = inject<AnimalDeleteDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef =
    inject<MatDialogRef<AnimalDeleteDialogComponent, boolean>>(MatDialogRef);

  protected confirmDelete(): void {
    this.dialogRef.close(true);
  }

  protected cancel(): void {
    this.dialogRef.close(false);
  }
}
