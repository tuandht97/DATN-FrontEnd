import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Transaction } from '../../_models/transaction';
import { TransactionService } from '../../_services/transaction.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Org } from '../../_enum/org.enum';
import { ToastrService } from 'ngx-toastr';

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

  displayProgressSpinner: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';
  filter2 = '';

  constructor(
    private tranService: TransactionService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.currentUser = this.auth.getCurrentUser;
    this.currentUserRole = this.auth.getCurrentUserRole;
    this.displayProgressSpinner = true;
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
      if (data["result"])
        this.buySource = new MatTableDataSource(data["result"]);
      else
        this.buySource = new MatTableDataSource();
      this.buySource.paginator = this.paginator;
      this.buySource.sort = this.sort;
    }, error => {
      this.toastr.error("Lỗi tải dữ liệu");
    });
    this.displayProgressSpinner = false;
  }

  getDataSell() {
    this.tranService.getSell(this.currentUser).subscribe(data => {
      if (data["result"])
        this.sellSource = new MatTableDataSource(data["result"]);
      else
        this.sellSource = new MatTableDataSource();
      this.sellSource.paginator = this.paginator;
      this.sellSource.sort = this.sort;
    }, error => {
      this.toastr.error("Lỗi tải dữ liệu");
    });
  }

  get isSeller() {
    return this.currentUserRole === Org.Seller;
  }

  get isUser() {
    return this.currentUserRole === Org.User;
  }
}
