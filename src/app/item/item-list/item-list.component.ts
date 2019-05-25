import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ItemService } from '../../_services/item.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items;
  displayedColumns = ['tritId', 'amount', 'price', 'btn'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter = '';

  constructor(
    public itemService: ItemService,
    private router: Router,
    private toastr: ToastrService
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
    this.itemService.getByUser().subscribe(data => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }

  removeItem(id) {
    this.itemService.delete(id).subscribe(
      result => {
        this.toastr.success("Ngừng bán mã thành công")
        this.router.navigate(['exchange']);
      },
      err => {
        this.toastr.error("Ngừng bán mã không thành công")
      });
  }
}
