import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { MsgService } from 'src/app/services/msg.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-add',
  templateUrl: './produto-add.page.html',
  styleUrls: ['./produto-add.page.scss'],
})
export class ProdutoAddPage implements OnInit {

  produto: Produto = new Produto;
  produtoKey = null;

  constructor(
    private produtoService: ProdutoService,
    protected msg: MsgService,
    private router: Router,
    private activadeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.produtoKey = this.activadeRouter.snapshot.paramMap.get('key');
    this.getProduto(this.produtoKey)
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

  salvar() {
    try {
      this.msg.presentLoading();
      if (this.produtoKey) {
        this.produtoService.update(this.produto, this.produtoKey).then(
          res => {
            console.log('Dados Salvos firebase...', res);
            this.msg.dismissLoading();
            this.msg.presentAlert('Alerta', 'Usuário atualizado.');
            this.produto = new Produto();
            this.router.navigate(['']);
          },
          error => {
            console.error("Erro ao salvar.", error);
            this.msg.dismissLoading();
            this.msg.presentAlert("Error", "Não foi possivel atualizar.");
          }
        )
      } else {
        this.produtoService.add(this.produto).then(
          res => {
            console.log('Dados Salvos firebase...', res);
            this.msg.dismissLoading();
            this.msg.presentAlert('Alerta', 'Usuário cadastrado.');
            this.produto = new Produto();
            this.router.navigate(['']);
          },
          error => {
            console.error("Erro ao salvar.", error);
            this.msg.dismissLoading();
            this.msg.presentAlert("Error", "Não foi possivel salvar.");
          }
        )
      }
    } catch (error) {
      console.error("Erro ao salvar.", error);
      this.msg.dismissLoading();
      this.msg.presentAlert("Error", "Não foi possivel conectar.");
    }

  }
}
