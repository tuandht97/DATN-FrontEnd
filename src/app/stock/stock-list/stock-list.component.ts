import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Stock } from 'src/app/_models/stock';
import { StockService } from 'src/app/_services/stock.service';


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  displayedColumns = ['id', 'amount', 'price', 'ownerId'];
  dataSource: MatTableDataSource<Stock>;
  currentUserRole: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public stockService: StockService
  ) {
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
    this.stockService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }
}


