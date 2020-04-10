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
import { VerAlbumComponent } from './components/ver-album/ver-album.component';
import { VerPlaylistComponent } from './components/ver-playlist/ver-playlist.component';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';
import { SubirAlbum1Component } from './components/subir-album1/subir-album1.component';
import { AddSongComponent } from './components/add-song/add-song.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Inicio', component: InicioComponent },
  { path: 'Principal', component: PrincipalComponent },
  { path: 'Biblioteca', component: BibliotecaComponent },
  { path: 'Buscar', component: NavbarComponent },
  { path: 'Seguidos', component: UsuarioComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: 'modificar', component: UsuarioComponent },
  { path: 'crearPlay', component: CrearPlaylistComponent },
  { path: 'subirAlb', component: SubirAlbum1Component },
  { path: 'verAlbum', component: VerAlbumComponent },
  { path: 'verPlaylist', component: VerPlaylistComponent },
  { path: 'verUser', component: VerUsuarioComponent },
  { path: 'subirCanc', component: AddSongComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
