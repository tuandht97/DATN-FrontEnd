import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['username', 'firstName', 'lastName', 'identityCard'];
  userSource: MatTableDataSource<User>;
  currentUserRole: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public userService: UserService
  ) {
    this.getData();
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.userSource.filter = filterValue;
  }

  getData() {
    this.userService.getAllUser().subscribe(data => {
      if (data.result)
        this.userSource = new MatTableDataSource(data.result);
      else
        this.userSource = new MatTableDataSource();
      this.userSource.paginator = this.paginator;
      this.userSource.sort = this.sort;
    }, error => {
    });
  }
}

