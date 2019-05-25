import { Component, OnInit } from '@angular/core';
import { Stock } from '../../_models/stock';
import { StockService } from '../../_services/stock.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  stock: Stock;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('code')),
      switchMap(code => this.stockService.getStockByCode(code))
    ).subscribe(stock => {
      this.stock = stock;
    });
  }

}
