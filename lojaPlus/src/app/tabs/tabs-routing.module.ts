import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'userAdd',
        loadChildren: () => import('../pages/user-add/user-add.module').then( m => m.UserAddPageModule)
      },
      {
        path: 'userAdd/:key',
        loadChildren: () => import('../pages/user-add/user-add.module').then( m => m.UserAddPageModule)
      },
      {
        path: 'user-perfil/:key',
        loadChildren: () => import('../pages/user-perfil/user-perfil.module').then( m => m.UserPerfilPageModule)
      },
      {
        path: 'endereco-add/:key',
        loadChildren: () => import('../pages/endereco-add/endereco-add.module').then( m => m.EnderecoAddPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../pages/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'produto-add',
        loadChildren: () => import('../pages/produto-add/produto-add.module').then( m => m.ProdutoAddPageModule)
      },
      {
        path: 'produto-list',
        loadChildren: () => import('../pages/produto-list/produto-list.module').then( m => m.ProdutoListPageModule)
      },
      {
        path: 'produto-perfil',
        loadChildren: () => import('../pages/produto-perfil/produto-perfil.module').then( m => m.ProdutoPerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
