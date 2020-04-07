import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';


const routes: Routes = [
  { path: 'Inicio', component: LoginComponent },
  { path: 'Biblioteca', component: BibliotecaComponent },
  { path: 'Buscar', component: NavbarComponent },
  { path: 'Seguidos', component: UsuarioComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Registro', component: RegistroComponent },
  //{ path: 'SubirAlbum', component: SubirAlbumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
