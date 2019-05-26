import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productFG: FormGroup;
  product: Product = {
    id: '',
    Description: '',
    Price: 0,
    Updated: null,
    Created: null
  };

  updateProduct;

  loading: boolean = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) {
    this.productFG = this.formBuilder.group({
      id: [''],
      Description: ['', Validators.required],
      Price: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    this.getProduct(id);
  }

  seProductData(value){
    this.updateProduct.Description = value.Description;
    this.updateProduct.Price = value.Price
  }

  getProduct(id){
      this.productService.getCollection$(ref => ref.where('id', '==' , id)).subscribe(products => {
        this.loading = false;
        this.updateProduct = products[0];

        this.productFG.patchValue({
          Description: this.updateProduct.Description,
          Price: this.updateProduct.Price
        });

    }, err => {
      this.loading = false;
      this.errorMessage = err;
    });
  }

  update() {
    if (this.productFG.valid) {
      this.loading = true;
      this.seProductData(this.productFG.value);

      this.productService.update(this.updateProduct).then(res => {
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
