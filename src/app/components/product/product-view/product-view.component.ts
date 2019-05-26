import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product: Product = {
    id: '',
    Description: '',
    Price: 0,
    Updated: null,
    Created: null
  };

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    this.getProduct(id);
  }

  async getProduct(id){
    this.loading = true;
    this.productService.getCollection$(ref => ref.where('id', '==' , id)).subscribe(products => {
      this.loading = false;
      this.product = products[0];
  }, err => {
    this.loading = false;
    console.log(err);
  });
}

}
