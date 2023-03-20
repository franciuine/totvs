import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/model/User';
import { UserService } from 'src/app/shared/services/User.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input() user: User;

  constructor(private dialogRef: MatDialogRef<DeleteUserComponent>,
              private userService: UserService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close(true);
  }

  deleteUser() {
    this.userService.delete(this.user.id).subscribe(() => {
          this.dialogRef.close(true);
          this._snackBar.open("Usuário removido com sucesso!", "OK").afterDismissed().subscribe(() => {
            location.reload();
          });
    });
  }

}
