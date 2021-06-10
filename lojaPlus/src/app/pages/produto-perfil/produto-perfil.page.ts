import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { MsgService } from 'src/app/services/msg.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-perfil',
  templateUrl: './produto-perfil.page.html',
  styleUrls: ['./produto-perfil.page.scss'],
})
export class ProdutoPerfilPage implements OnInit {
  key:string = null;
  produto: Produto = new Produto;

  constructor(
    private activatedRouter: ActivatedRoute,
    private produtoService: ProdutoService,
    private msg:MsgService
  ) { }

  ngOnInit() {
    this.key = this.activatedRouter.snapshot.paramMap.get('key');
    this.getProduto(this.key);
  }

  async getProduto(key) {
    if (key) {
      await this.produtoService.get(key).subscribe(
        res => {
          this.produto = res;
          return true;
        },
        error => {
          console.log("ERRO:", error);
          return false;
        }
      )
    }
  }
}
