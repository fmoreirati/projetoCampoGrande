import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { MsgService } from 'src/app/services/msg.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.page.html',
  styleUrls: ['./produto-list.page.scss'],
})
export class ProdutoListPage implements OnInit {
  produtos: Produto[] = [];
  produtoKey = null;

  constructor(
    private produtoService: ProdutoService,
    protected msg: MsgService,
    private router: Router,
    private activadeRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProdutos();
  }

  async getProdutos() {
    await this.produtoService.getAll().subscribe(
      (res) => {
        this.produtos = res;
        return true;
      },
      (error) => {
        console.log('ERRO:', error);
        return false;
      }
    );
  }

  editar(produto) {
    this.router.navigate(['/tabs/produto-add', produto.key]);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    if (this.getProdutos()) {
      //setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      //}, 2000);
    }
  }
}
