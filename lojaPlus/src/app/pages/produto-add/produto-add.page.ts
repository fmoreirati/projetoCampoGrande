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
  }
   
  salvar() {
    try {
      this.msg.presentLoading();  
      this.produtoService.add(this.produto).then(
        res => {
          console.log('Dados Salvos firebase...', res);
          this.msg.dismissLoading();
          this.msg.presentAlert('Alerta', 'Cadastrado.');
          this.produto = new Produto();
          this.router.navigate(['/tabs/user-perfil', this.produtoKey]);
        },
        error => {
          console.error("Erro ao salvar.", error);
          this.msg.dismissLoading();
          this.msg.presentAlert("Error", "Não foi possivel salvar.");
        }
      )
    } catch (error) {
      console.error("Erro ao salvar.", error);
      this.msg.dismissLoading();
      this.msg.presentAlert("Error", "Não foi possivel conectar.");
    }
  }
}
