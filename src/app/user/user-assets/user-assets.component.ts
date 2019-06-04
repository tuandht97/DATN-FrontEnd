import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../../_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Org } from '../../_enum/org.enum';

@Component({
  selector: 'app-user-assets',
  templateUrl: './user-assets.component.html',
  styleUrls: ['./user-assets.component.scss']
})
export class UserAssetsComponent implements OnInit {

  assets;
  balance: number = 0;
  displayedColumns = ['code', 'amount'];
  dataSource: MatTableDataSource<Asset>;

  currentUserRole: string;
  currentUser: string;

  loaded: Promise<boolean>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public userService: UserService,
    public auth: AuthService
  ) {
    this.currentUserRole = this.auth.getCurrentUserRole;
    this.currentUser = this.auth.getCurrentUser;
    console.log(this.currentUser)
    this.getData();
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getData() {
    this.userService.getAsset(this.currentUser).subscribe(data => {
      console.log(data)
      const asset = [];
      if (data["result"]) {
        for (let code in data["result"]["tritList"]) {
          let a = { code: code, amount: data["result"]["tritList"][code] };
          asset.push(a);
        }
        this.balance = data['result']['balance'];
      }
      this.dataSource = new MatTableDataSource(asset);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loaded = Promise.resolve(true);
    }, error => {
    });
  }

  get isUser() {
    return this.currentUserRole === Org.User;
  }
}

export interface Asset {
  code: string,
  amount: number
}