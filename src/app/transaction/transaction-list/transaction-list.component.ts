import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Transaction } from '../../_models/transaction';
import { TransactionService } from '../../_services/transaction.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Org } from '../../_enum/org.enum';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  sellColumns = ['tritId', 'amount', 'tritPrice', 'buyer', 'time'];
  buyColumns = ['tritId', 'amount', 'tritPrice', 'seller', 'time'];

  sellSource: MatTableDataSource<any>;
  buySource: MatTableDataSource<any>;

  currentUserRole: string;
  currentUser: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';
  filter2 = '';

  constructor(
    public tranService: TransactionService,
    public auth: AuthService
  ) {
    this.currentUser = this.auth.getCurrentUser;
    this.currentUserRole = this.auth.getCurrentUserRole;
    this.getDataSell();
    this.getDataBuy();
  }

  ngOnInit() {
  }

  applyFilterSell(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.sellSource.filter = filterValue;
  }

  applyFilterBuy(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.buySource.filter = filterValue;
  }

  getDataBuy() {
    this.tranService.getBuy(this.currentUser).subscribe(data => {
      console.log(data)
      this.buySource = new MatTableDataSource(data["result"]);
      this.buySource.paginator = this.paginator;
      this.buySource.sort = this.sort;
    }, error => {
    });
  }

  getDataSell() {
    this.tranService.getSell(this.currentUser).subscribe(data => {
      console.log(data)
      this.sellSource = new MatTableDataSource(data["result"]);
      this.sellSource.paginator = this.paginator;
      this.sellSource.sort = this.sort;
    }, error => {
    });
  }

  get isSeller() {
    return this.currentUserRole === Org.Seller;
  }

  get isUser() {
    return this.currentUserRole === Org.User;
  }
}
