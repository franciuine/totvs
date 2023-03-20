import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/model/User';
import { UserService } from 'src/app/shared/services/User.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User;
  registerForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<UserFormComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      docNumber: ['', [Validators.required]]
    });
  }

  cancel() {
    this.dialogRef.close(true);
    this.registerForm.reset();
  }

  createUser() {
    if(this.registerForm.valid) {
      this.user = new User();
      this.user.name = this.registerForm.get('name')?.value;
      this.user.email = this.registerForm.get('email')?.value;
      this.user.docNumber = this.registerForm.get('docNumber')?.value;
      this.userService.save(this.user).subscribe(() => {
        this.dialogRef.close(true);
        this._snackBar.open("Usuário cadastrado com sucesso!", "OK");
        location.reload();
      }, error => {
        console.log(error)
        this._snackBar.open("Usuário já cadastrado!", "Erro");
      });

    }
  }

  getErrorMessage() {
    return 'Este campo é obrigatório';
  }

}
