import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { EstateService } from '../../_services/estate.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeEstate } from '../../_enum/typeEstate.enum';

@Component({
  selector: 'app-estate-create',
  templateUrl: './estate-create.component.html',
  styleUrls: ['./estate-create.component.scss']
})
export class EstateCreateComponent implements OnInit {

  estateForm: FormGroup;
  submitted = false;

  pay: number;
  sum: number;

  keys = Object.keys;
  typeEstate = TypeEstate;

  constructor(
    private auth: AuthService,
    private estateService: EstateService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.estateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      code: ['', [Validators.required, Validators.maxLength(10)]],
      amount: [1, [Validators.required, Validators.min(1)]],
      sumPrice: ['', [Validators.required, Validators.min(10000)]],
      price: [1, Validators.required],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      squareMeter: ['', [Validators.required, Validators.min(0)]],
      description: ['']
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

  public submit() {
    this.submitted = true;

    if (this.estateForm.invalid) {
      return;
    }

    this.estateForm['controls']['price'].setValue(this.pay);

    const formData = new FormData();

    formData.append('id', this.estateForm.value.code);
    formData.append('name', this.estateForm.value.name);
    formData.append('price', this.estateForm.value.price);
    formData.append('squareMeter', this.estateForm.value.squareMeter);
    formData.append('address', this.estateForm.value.address);
    formData.append('amount', this.estateForm.value.amount);
    formData.append('description', this.estateForm.value.description);

    for (var i = 0; i < this.images.length; i++) {
      formData.append("images", this.images[i]);
    }

    this.estateService.create(formData)
      .pipe(first())
      .subscribe(
        result => {
          if (result["error"])
            this.toastr.error("Tạo bất động sản không thành công:" + result["error"])
          else {
            this.toastr.success("Tạo bất động sản thành công")
            this.router.navigate(['estate'])
          }
        },
        err => {
          this.toastr.error("Tạo bất động sản không thành công")
        }
      );
  }

  get f() { return this.estateForm.controls; }

  onKey(value: number) {
    this.sum = value;
    this.pay = (value / 100000) / this.estateForm.value.amount;
    if (this.pay < 1)
      this.pay = 1;
  }

  onAmount(value: number) {
    // this.pay = (this.estateForm.value.sumPrice / 100000) / value;
    // if (this.pay < 1)
    //   this.pay = 1;
  }
}
