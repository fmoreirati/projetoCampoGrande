import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/services/msg.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private msg: MsgService
    ) {}

  ngOnInit() {}

  login(){
    this.userService.login(this.email, this.senha).then(
      res=>{
        this.router.navigate(['']);
      },
      error=>{
        this.msg.presentAlert("Erro", "Usuario não encontrado!");
      }
      
    )
  };

  logout(){
    this.userService.logout().then(
      res=>{
        this.router.navigate(['']);
      }
    );
  }

  loginWeb(){
    this.userService.loginGoogleWEB().then(
      res=>{
        this.router.navigate(['']);
      }
    );
  }
}
