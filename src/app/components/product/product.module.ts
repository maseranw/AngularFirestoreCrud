import { NgModule } from '@angular/core';
import { routedComponents, ProductRoutingModule } from './product-routing.module';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatLabel, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatProgressBarModule, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { ProductService } from 'src/app/services/product.service';
import { ProductViewComponent } from './product-view/product-view.component';

@NgModule({
  imports: [
    ProductRoutingModule,
    MatTableModule,
    LayoutModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
    
  ],
  declarations: [
    ...routedComponents,
    ProductViewComponent,
  ],
  providers: [ProductService]
})
export class ProductModule { }
