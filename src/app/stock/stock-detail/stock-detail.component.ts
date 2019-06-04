import { Component, OnInit } from '@angular/core';
import { Stock } from '../../_models/stock';
import { StockService } from '../../_services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, first } from 'rxjs/operators';
import { Org } from 'src/app/_enum/org.enum';
import { AuthService } from 'src/app/_services/auth.service';
import { EstateService } from 'src/app/_services/estate.service';
import { ToastrService } from 'ngx-toastr';
import { Estate } from 'src/app/_models/estate';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  currentUserRole: string;
  currentUser: string;
  public estate: Estate;
  price: number;

  submited: boolean = false;

  urls = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private estateService: EstateService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.currentUserRole = this.auth.getCurrentUserRole;
    this.currentUser = this.auth.getCurrentUser;

    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.estateService.getById(id))
    ).subscribe(estate => {
      console.log(estate)
      if (estate["result"]) {
        this.estate = estate["result"];
        this.price = Math.ceil(this.estate.price / this.estate.amount);
        if (this.price < 1)
          this.price = 1;
        this.estate.images.forEach(img => {
          let url = 'http://localhost:3000/uploads/' + img
          this.urls.push(url);
        });
        if (this.estate.actice == 'Publish')
          this.submited = true;
      } else {
        this.toastr.error("Mã không tồn tại");
        this.router.navigate(['exchange']);
      }
    });
  }

  get isUser() {
    return this.currentUserRole === Org.User;
  }

  goBuy() {
    this.router.navigate(['exchange'])
  }
}
