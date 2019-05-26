

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['Description', 'Price','actions'];
  dataSource;

  products: Product[]= null;

  getDataSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService, private router: Router){
  }

  ngOnInit() {
    this.getProducts();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProducts(){
    this.getDataSubscription = this.productService.getCollection$
    ().subscribe(res => {
      this.products = res;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.getDataSubscription.unsubscribe;
    });
  }

  view(id){
    this.router.navigate(['/products/view',id]);
  }

  edit(id){
    this.router.navigate(['/products/edit',id]);
  }

  delete(id){
    this.productService.remove(id).then(res => {
      console.log('Product Deleted');
    });
  }
}