import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from 'src/app/models/endereco';
import { User } from 'src/app/models/user';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MsgService } from 'src/app/services/msg.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.page.html',
  styleUrls: ['./user-perfil.page.scss'],
})
export class UserPerfilPage implements OnInit {
  key: string = null;
  user: User = new User();
  listEnderecos: Endereco[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private userService: UserService,
    private enderecoService: EnderecoService,
    private msg: MsgService,
    private router: Router
  ) {}

  ngOnInit() {
    this.key = this.activatedRouter.snapshot.paramMap.get('key');
    this.getUser(this.key);
    this.getAllEndererecos(this.key);
  }

  async getUser(key) {
    if (key) {
      await this.userService.get(key).subscribe(
        (res) => {
          this.user = res;
          return true;
        },
        (error) => {
          console.log('ERRO:', error);
          return false;
        }
      );
    }
  }

  async getAllEndererecos(key) {
    await this.enderecoService.getAllforUser(key).subscribe(
      (res) => {
        this.listEnderecos = res;
      },
      (error) => {
        this.msg.presentAlert('Error', 'Erro ao listar os enderecos!');
      }
    );
  }

  sair() {
    this.userService.logout().then((res) => {
      this.router.navigate(['']);
    });
  }
}
