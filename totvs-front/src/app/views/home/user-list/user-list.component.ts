import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/model/User';
import { UserService } from 'src/app/shared/services/User.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'name', 'email', 'docNumber', 'status', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService,
              private dialog: MatDialog) {
    this.userService.getAll().subscribe(data => {
      this.users = data;
      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
   }

  ngOnInit(): void {
  }

  filterTable(input: Event) {
    this.dataSource.filter = (input.target as HTMLInputElement).value.trim().toLowerCase();
  }

  formatStatus(element: any) {
    if(element.status == "N") {
      return "Não importado"
    } else if (element.status == "I") {
      return "Importado com sucesso"
    } else {
      return "Erro na importação"
    }
  }

  deleteUser(row: any) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      minWidth: '350px'
    });
    dialogRef.componentInstance.user = row;
  }

}
