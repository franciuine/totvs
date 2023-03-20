import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/model/User';
import { UserService } from 'src/app/shared/services/User.service';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.css']
})
export class ImportModalComponent implements OnInit {

  @Input() users: User[];

  constructor(private dialogRef: MatDialogRef<ImportModalComponent>,
              private userService: UserService,
              private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close(true);
  }

  saveWithErrors() {
    this.userService.saveWithErrors(this.users).subscribe(() => {
      this.dialogRef.close(true);
      this._snackBar.open("Usuários cadastrados!", "OK");
      location.reload();
    });
  }

}
