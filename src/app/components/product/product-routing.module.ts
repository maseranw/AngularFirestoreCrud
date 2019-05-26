import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [{
  path: '',
  component: ProductListComponent},
  {
    path: 'list',
    component: ProductListComponent,
  },
  {
    path: 'add',
    component: ProductAddComponent,
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent,
  },
  {
    path: 'view/:id',
    component: ProductViewComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }

export const routedComponents = [
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductViewComponent
];
