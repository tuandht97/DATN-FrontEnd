import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ItemService } from '../_services/item.service';
import { Item } from '../_models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Org } from '../_enum/org.enum';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})

export class ExchangeComponent implements OnInit {

  items = [];
  displayedColumns = ['tritId', 'amount', 'price', 'seller'];
  dataSource: MatTableDataSource<any>;
  currentUserRole: string;
  currentUser: string;

  buyItem: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    this.currentUserRole = this.auth.getCurrentUserRole;
    this.currentUser = this.auth.getCurrentUser;
    if (this.isUser)
      this.displayedColumns.push('buy')
    this.getData();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.filter = params['code'];
      }
    )
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getData() {
    this.itemService.getAll().subscribe(data => {
      if (data.result) {
        this.items = data.result;
        this.dataSource = new MatTableDataSource(data.result);
      } else {
        this.dataSource = new MatTableDataSource();
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }

  get isUser() {
    return this.currentUserRole === Org.User;
  }

  goBuy(id) {
    let item = this.items.find(i => i.uuid == id);
    this.itemService.setCurrentItem(item);
    this.router.navigate(['transaction/create/'])
  }

  getRecord(value: any) {
    this.router.navigate(['stock/' + value])
  }
}