import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, switchMap, map } from 'rxjs/operators';
import { EstateService } from '../../_services/estate.service';
import { Estate } from 'src/app/_models/estate';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-estate-update',
  templateUrl: './estate-update.component.html',
  styleUrls: ['./estate-update.component.scss']
})
export class EstateUpdateComponent implements OnInit {

  estateForm: FormGroup;

  pay: number;

  sum: number;

  estate: Estate;

  loaded: Promise<boolean>;

  baseUrl = environment.baseUrl;
  listImages: string[] = [];
  nameImages: string[] = [];

  constructor(
    private auth: AuthService,
    private estateService: EstateService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.estateService.getById(id))
    ).subscribe(estate => {
      this.estate = estate["result"];
      this.estate.images.forEach(img => {
        let url = this.baseUrl + '/uploads/' + img;
        this.nameImages.push(img);
        this.listImages.push(url);
      });
      this.estateForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(100)]],
        code: ['', [Validators.required, Validators.maxLength(10)]],
        amount: [1, [Validators.required, Validators.min(1)]],
        sumPrice: ['', [Validators.required, Validators.min(10000)]],
        price: [1, Validators.required],
        typeEstate: ['', Validators.required],
        address: ['', [Validators.required, Validators.maxLength(200)]],
        squareMeter: ['', [Validators.required, Validators.min(0)]],
        description: [null, Validators.required]
      });
      this.setValueForm(this.estate, this.estateForm)
      this.sum = this.estate.price * 100000;
      this.loaded = Promise.resolve(true);
    });
  }


  urls = [];
  images: string[] = [];

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {

        this.images.push(event.target.files[i]);

        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImage(id: number) {
    this.urls.splice(id, 1);
    this.images.splice(id, 1);
  }

  removeOldImage(id: number) {
    this.nameImages.splice(id, 1);
    this.listImages.splice(id, 1);
  }

  public submit() {
    this.estateForm['controls']['price'].setValue(this.pay);

    const formData = new FormData();

    formData.append('id', this.estateForm.value.code);
    formData.append('name', this.estateForm.value.name);
    formData.append('price', this.estateForm.value.price);
    formData.append('squareMeter', this.estateForm.value.squareMeter);
    formData.append('address', this.estateForm.value.address);
    formData.append('amount', this.estateForm.value.amount);
    formData.append('description', this.estateForm.value.description);

    for (var i = 0; i < this.nameImages.length; i++) {
      formData.append("oldImages", this.nameImages[i]);
    }
    for (var i = 0; i < this.images.length; i++) {
      formData.append("images", this.images[i]);
    }

    this.estateService.update(formData)
      .pipe(first())
      .subscribe(
        result => {
          if (result["error"])
            this.toastr.error("Cập nhật động sản không thành công");
          else {
            this.toastr.success("Cập nhật động sản thành công");
            this.router.navigate(['estate'])
          }
        },
        err => {
          this.toastr.error("Cập nhật bất động sản không thành công")
        }
      );
  }

  get f() { return this.estateForm.controls; }

  onKey(value: number) {
    this.sum = value;
    this.pay = Math.ceil(value / 100000);
    if (this.pay < 1)
      this.pay = 1;
  }

  onAmount(value: number) {
    // this.pay = (this.estateForm.value.sumPrice / 10000) / value;
    // if (this.pay < 1)
    //   this.pay = 1;
  }

  setValueForm(estate: Estate, estateForm: FormGroup) {
    estateForm['controls']['name'].setValue(estate.name);
    estateForm['controls']['code'].setValue(estate.id);
    estateForm['controls']['sumPrice'].setValue(estate.price * 100000);
    estateForm['controls']['amount'].setValue(estate.amount);
    estateForm['controls']['address'].setValue(estate.address);
    estateForm['controls']['squareMeter'].setValue(estate.squareMeter);
    estateForm['controls']['description'].setValue(estate.description);
    this.pay = estate.price;
  }
}
