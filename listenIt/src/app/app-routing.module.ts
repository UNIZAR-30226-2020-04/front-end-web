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
import { SubirPodcastComponent } from './components/subir-podcast/subir-podcast.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { DelPlaylistComponent } from './components/del-playlist/del-playlist.component';
import { DelAlbumComponent } from './components/del-album/del-album.component';
import { DelPodcastComponent } from './components/del-podcast/del-podcast.component';
import { VerPodcastComponent } from './components/ver-podcast/ver-podcast.component';
import { SeguidosComponent } from './components/seguidos/seguidos.component';
import { AddToListaComponent } from './components/add-to-lista/add-to-lista.component';

const routes: Routes = [
  
  { path: 'Principal', component: PrincipalComponent },
  { path: 'Biblioteca', component: BibliotecaComponent },
  { path: 'Buscar', component: BuscarComponent },
  { path: 'Seguidos', component: SeguidosComponent },

  { path: '', component: InicioComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'Registro', component: RegistroComponent },


  { path: 'Perfil', component: UsuarioComponent },

  { path: 'CrearPlay', component: CrearPlaylistComponent },
  { path: 'SubirAlbum', component: SubirAlbum1Component },
  { path: 'SubirPodcast', component: SubirPodcastComponent },

  { path: 'BorrarPlay', component: DelPlaylistComponent },
  { path: 'BorrarAlbum', component: DelAlbumComponent },
  { path: 'BorrarPodcast', component: DelPodcastComponent },

  { path: 'VerAlbum', component: VerAlbumComponent },
  { path: 'VerPlay', component: VerPlaylistComponent },
  { path: 'Verpodcast', component: VerPodcastComponent },
  { path: 'VerUsuario', component: VerUsuarioComponent },

  { path: 'SubirCanc', component: AddSongComponent },
  { path: 'AddToLista', component: AddToListaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
