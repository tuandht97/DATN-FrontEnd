import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Stock } from 'src/app/_models/stock';
import { StockService } from 'src/app/_services/stock.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  displayedColumns = ['id', 'price', 'ownerId'];
  dataSource: MatTableDataSource<Stock>;
  currentUserRole: string;

  loaded: Promise<boolean>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public stockService: StockService,
    private router: Router
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
      this.loaded = Promise.resolve(true);
      if (data.result)
        this.dataSource = new MatTableDataSource(data.result);
      else
        this.dataSource = new MatTableDataSource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }

  getRecord(value: any){
    this.router.navigate(['stock/' + value])
  }
}


