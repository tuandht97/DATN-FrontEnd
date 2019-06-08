import { Component, OnInit } from '@angular/core';
import { Estate } from '../../_models/estate';
import { EstateService } from '../../_services/estate.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { switchMap, map, first } from 'rxjs/operators';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { StockService } from '../../_services/stock.service';
import { Org } from '../../_enum/org.enum';
import { environment } from 'src/environments/environment';

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

  baseUrl = environment.baseUrl;

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
      if (estate["result"]) {
        this.estate = estate["result"];
        this.estate.images.forEach(img => {
          let url = this.baseUrl + '/uploads/' + img
          this.urls.push(url);
        });
        if (this.estate.actice == 'Publish')
          this.submited = true;
      } else {
        this.toastr.error("Bất động sản không tồn tại");
        this.router.navigate(['estate']);
      }
    });
  }

  submit() {
    this.stockService.create(this.estate.id)
      .pipe(first())
      .subscribe(
        result => {
          this.toastr.success("Xác nhận thành công");
          setTimeout(() => {
            this.router.navigate(['stock'])
          }, 2000)
          // // this.router.navigate(['stock'])
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
