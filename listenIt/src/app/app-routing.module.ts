import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CrearPlaylistComponent } from './components/crear-playlist/crear-playlist.component';
import { SubirAlbumComponent } from './components/subir-album/subir-album.component';


const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'Inicio', component: InicioComponent },
  { path: 'Principal', component: PrincipalComponent },
  { path: 'Biblioteca', component: BibliotecaComponent },
  { path: 'Buscar', component: NavbarComponent },
  { path: 'Seguidos', component: UsuarioComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: 'modificar', component: UsuarioComponent },
  { path: 'crearPlay', component: CrearPlaylistComponent },
  { path: 'subirAlb', component: SubirAlbumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
