import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { SubirAlbumComponent } from './components/subir-album/subir-album.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';

const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'Inicio', component: InicioComponent },
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
