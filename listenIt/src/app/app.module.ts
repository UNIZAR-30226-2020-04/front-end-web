import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SongService } from './services/song.service';

import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ReestablecerComponent } from './components/reestablecer/reestablecer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarModule } from 'ng-sidebar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReproductorComponent } from './components/reproductor/reproductor.component';
import { CrearPlaylistComponent } from './components/crear-playlist/crear-playlist.component';
import { SubirAlbum1Component } from './components/subir-album1/subir-album1.component';
import { SubirPodcastComponent } from './components/subir-podcast/subir-podcast.component';
import { VerAlbumComponent } from './components/ver-album/ver-album.component';
import { VerPlaylistComponent } from './components/ver-playlist/ver-playlist.component';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { DelAlbumComponent } from './components/del-album/del-album.component';
import { DelPlaylistComponent } from './components/del-playlist/del-playlist.component';
import { DelPodcastComponent } from './components/del-podcast/del-podcast.component';
import { UploadComponent } from './components/upload/upload.component';
import { VerPodcastComponent } from './components/ver-podcast/ver-podcast.component';
import { BuscarAlbumComponent } from './components/buscar-album/buscar-album.component';
import { BuscarPlaylistComponent } from './components/buscar-playlist/buscar-playlist.component';
import { BuscarUsuarioComponent } from './components/buscar-usuario/buscar-usuario.component';
import { BuscarPodcastComponent } from './components/buscar-podcast/buscar-podcast.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    ReestablecerComponent,
    SidebarComponent,
    NavbarComponent,
    ReproductorComponent,
    UsuarioComponent,
    BibliotecaComponent,
    SubirAlbum1Component,
    CrearPlaylistComponent,
    PrincipalComponent,
    VerAlbumComponent,
    VerPlaylistComponent,
    VerUsuarioComponent,
    AddSongComponent,
    DelAlbumComponent,
    DelPlaylistComponent,
    DelPodcastComponent,
    UploadComponent,
    VerPodcastComponent,
    BuscarAlbumComponent,
    BuscarPlaylistComponent,
    BuscarUsuarioComponent,
    BuscarPodcastComponent,
    SubirPodcastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxAudioPlayerModule,
    AppRoutingModule, 
    SidebarModule.forRoot(),
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SongService],
  bootstrap: [AppComponent]
})
export class AppModule { }



