import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/users/user.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['Fname', 'Lname', 'email', 'gender', 'edit'];
  dataSource: MatTableDataSource<User>;
  show = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.show = true;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, error => {
      console.log(error);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(userId: string) {
    if (confirm('Are you sure?')) {
    this.userService.deleteUser(userId).subscribe(() => {

      const user = this.dataSource.data.find(u => u.id === userId);
      if (user) {
          const index = this.dataSource.data.indexOf(user, 0);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
    });
  }
  }


  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Fname': return compare(a.firstName, b.firstName, isAsc);
        case 'Lname': return compare(a.lastName, b.lastName, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'gender': return compare(a.gender, b.gender, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

