import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Endereco } from "../models/endereco";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  
  collection = "enderecos";
  constructor(
    private http: HttpClient,
    private firedb:AngularFirestore
  ) { }

  pegaCEP(cep: string) {
    var local: string = "https://viacep.com.br/ws/" + cep + "/json";
    return this.http.get<Endereco>(local);
  }

  add(endereco:Endereco){
    return this.firedb.collection<Endereco>(this.collection).add(
      {
        key: null,
        userkey: endereco.userkey,
        cep: endereco.cep,
        logradouro : endereco.logradouro,
        bairro : endereco.bairro,
        localidade: endereco.localidade,
        uf: endereco.uf,
        complemento:endereco.complemento,
        numero: endereco.numero,
        erro: endereco.erro,
        principal: endereco.principal,
        ativo: endereco.ativo,
      }
    )
  }

  getAll(){
    //return this.firedb.collection<Endereco>(this.collection).valueChanges()
    return this.firedb.collection<Endereco>(this.collection).snapshotChanges()
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
    return this.firedb.collection<Endereco>(this.collection, ref => ref.where('userkey', '==',userkey)).snapshotChanges()
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
    return this.firedb.collection<Endereco>(this.collection).doc(key).valueChanges();
  }

  update(endereco:Endereco, key:string){
    return this.firedb.collection<Endereco>(this.collection).doc(key).update(endereco);
  }

  delete(key){
    return this.firedb.collection(this.collection).doc(key).delete();
  }
}
