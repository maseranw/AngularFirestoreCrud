import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Route, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFG: FormGroup;
  product: Product = {
    id: '',
    Description: '',
    Price: 0,
    Updated: null,
    Created: null
  };

  loading: boolean = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private db: AngularFirestore,
    private productService: ProductService) {
    this.productFG = this.formBuilder.group({
      id: [''],
      Description: ['', Validators.required],
      Price: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  save() {
    if (this.productFG.valid) {
      this.loading = true;
      this.product = this.productFG.value;
      this.product.id = this.db.createId();
      this.product.Created = new Date();
      this.product.Updated = new Date();
      this.productService.add(this.product).then(res => {
        this.router.navigateByUrl('/products');
        this.loading = false;
      }).then((res => {
        console.log(res)
      }));
    } else {
      this.markFormGroupTouched(this.productFG);
    }

  }

  descriptionValidate() {
    const control = this.productFG.get('Description');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  priceValidate() {
    const control = this.productFG.get('Price');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      if (control.controls) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
