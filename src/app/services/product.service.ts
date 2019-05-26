import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryFn, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {

  readonly path = 'Product';
  private collection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<Product>(this.path);
   }

  add(data: Product) {
    return this.afs.doc<Product>(`${this.path}/${data.id}`).set(data).then((error=>{
      console.log(error);
    }));
  }

  remove(id: string): Promise<void> {
    return this.afs.doc<Product>(`${this.path}/${id}`).delete();
  }

  update(data: Product) {
    return this.afs.doc<Product>(`${this.path}/${data.id}`).set(data).then((error=>{
      console.log(error);
    }));;
  }

  getCollection$(ref?: QueryFn): Observable<Product[]> {
    return this.afs.collection<Product>(this.path, ref)
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = data.id;
          return { id, ...data };
        });
      })
      );
  }

}
