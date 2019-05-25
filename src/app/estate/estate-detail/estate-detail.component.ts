import { Component, OnInit } from '@angular/core';
import { Estate } from '../../_models/estate';
import { EstateService } from '../../_services/estate.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { switchMap, map, first } from 'rxjs/operators';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { StockService } from '../../_services/stock.service';
import { Org } from '../../_enum/org.enum';

@Component({
  selector: 'app-estate-detail',
  templateUrl: './estate-detail.component.html',
  styleUrls: ['./estate-detail.component.scss']
})
export class EstateDetailComponent implements OnInit {

  currentUserRole: string;
  currentUser: string;
  public estate: Estate;

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
      this.estate = estate["result"];
      console.log(estate)
      this.estate.images.forEach(img => {
        let url = 'http://localhost:3000/uploads/' + img
        this.urls.push(url);
      });
      console.log(this.urls)
      if (this.estate.actice == 'Publish')
        this.submited = true;
    });
  }

  submit() {
    this.stockService.create(this.estate.id)
      .pipe(first())
      .subscribe(
        result => {
          this.toastr.success("Xác nhận thành công"),
            this.router.navigate(['estate'])
        },
        err => {
          this.toastr.error("Xác nhận và tạo mã không thành công")
        }
      );
  }

  get isAdmin() {
    return this.currentUserRole === Org.Admin;
  }

  get isSeller() {
    return this.currentUserRole === Org.Seller;
  }

  goUpdate(id) {
    this.router.navigate(['estate/update/' + id])
  }
}
