import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/model/User';
import { UserService } from 'src/app/shared/services/User.service';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usersList: User[];

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private _snackBar: MatSnackBar) {
      this.usersList = [];
  }

  ngOnInit(): void {
  }

  newUser() {
    console.log("teste")
    const dialogRef = this.dialog.open(UserFormComponent, {
      minWidth: '500px',
    });
  }

  importUsers($event: any) {
    let self = this;
    let reader = new FileReader();
    let file = $event.target.files[0];
    reader.readAsText(file);
    reader.onload = () => {
      let importFile = reader.result as string;
      for(let data of JSON.parse(importFile)) {
        let user = new User();
        user.name = data.name;
        user.email = data.email;
        user.docNumber = data.docNumber;
        this.usersList.push(user);
      }
      this.userService.importUsers(this.usersList).subscribe((data) => {
        if(data != null) {
          const dialogRef = this.dialog.open(ImportModalComponent, {
            minWidth: '500px',
          });
          dialogRef.componentInstance.users = data;
        } else {
          this._snackBar.open("Usuários importados com sucesso!", "OK");
          location.reload();
        }
      });
    };
  }

}
