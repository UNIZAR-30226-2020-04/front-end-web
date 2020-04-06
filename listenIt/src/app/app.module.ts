import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ReestablecerComponent } from './components/reestablecer/reestablecer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarModule } from 'ng-sidebar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReproductorComponent } from './components/reproductor/reproductor.component';
import { SubirAlbumComponent } from './components/subir-album/subir-album.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { SubirAlbum1Component } from './components/subir-album1/subir-album1.component';
import { SubirAlbum2Component } from './components/subir-album2/subir-album2.component';
import { InicioComponent } from './components/inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ReestablecerComponent,
    SidebarComponent,
    NavbarComponent,
    ReproductorComponent,
    UsuarioComponent,
    SubirAlbumComponent,
    BibliotecaComponent,
    SubirAlbum1Component,
    SubirAlbum2Component,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    SidebarModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



