import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  collection = "produtos"
  constructor(
    private firedb:AngularFirestore
  ) { }

  add(produto:Produto){
    return this.firedb.collection<Produto>(this.collection).add(
      {
        nome: produto.nome,
        descricao: produto.descricao,
        quantidade: produto.quantidade,
        valor: produto.valor,
        fotos:produto.fotos,
        ativo: produto.ativo        
      }
    )
  }

  getAll(){
    //return this.firedb.collection<produto>(this.collection).valueChanges()
    return this.firedb.collection<Produto>(this.collection).snapshotChanges()
    .pipe(
      map(dados =>
        dados.map(
          d => ({
            key: d.payload.doc.id, ...d.payload.doc.data()
          })
        )
      )
    )
  }

  getAllforUser(userkey: string){
    return this.firedb.collection<Produto>(this.collection, ref => ref.where('userkey', '==',userkey)).snapshotChanges()
    .pipe(
      map(dados =>
        dados.map(
          d => ({
            key: d.payload.doc.id, ...d.payload.doc.data()
          })
        )
      )
    )
  }


  get(key){
    return this.firedb.collection<Produto>(this.collection).doc(key).valueChanges();
  }

  update(produto:Produto, key:string){
    return this.firedb.collection<Produto>(this.collection).doc(key).update(produto);
  }

  delete(key){
    return this.firedb.collection(this.collection).doc(key).delete();
  }
}
