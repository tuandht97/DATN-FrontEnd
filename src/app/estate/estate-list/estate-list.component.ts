import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../../_services/auth.service';
import { Estate } from '../../_models/estate';
import { EstateService } from '../../_services/estate.service';
import { Router } from '@angular/router';

import { Org } from '../../_enum/org.enum';

@Component({
  selector: 'app-estate-list',
  templateUrl: './estate-list.component.html',
  styleUrls: ['./estate-list.component.scss']
})
export class EstateListComponent implements OnInit {

  filter = '';
  currentUserRole: string;

  displayedColumns = ['name', 'id', 'ownerId', 'price', 'amount', 'actice', 'btn'];
  dataSource: MatTableDataSource<Estate>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private auth: AuthService,
    private estateService: EstateService,
    private router: Router
  ) {
    this.currentUserRole = this.auth.getCurrentUserRole;
    if (this.currentUserRole === Org.Admin)
      this.getAll();
    if (this.currentUserRole === Org.Seller)
      this.getEstateUser();
  }

  ngOnInit() {
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getAll() {
    this.estateService.getAll().subscribe(data => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }

  getEstateUser() {
    this.estateService.getEstateUser().subscribe(data => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }

  get isAdmin() {
    return this.currentUserRole === Org.Admin;
  }

  get isSeller() {
    return this.currentUserRole === Org.Seller;
  }

  goConfig(id) {
    this.router.navigate(['estate/' + id])
  }

  goUpdate(id) {
    this.router.navigate(['estate/update/' + id])
  }
}
