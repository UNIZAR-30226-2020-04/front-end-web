import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import { GLOBAL } from './global';

@Injectable({ providedIn: 'root' })
export class FileService {
	public url;

  constructor(private http: HttpClient) {
  	this.url = GLOBAL.url;
  }
 
  uploadFile(correo,idAlbum,titCancion,file: File): Observable<HttpEvent<{}>> {
  		console.log("Subiendo: " + file);
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		formdata.append('idalbum',idAlbum);
		formdata.append('user',correo);
		formdata.append('nombreC',titCancion);
		//let data = {email: correo, tituloAl: idAlbum, tituloCanc: titCancion, mp3: formdata};
		//console.log(data);
		const req = new HttpRequest('POST', GLOBAL.url + 'subirCancion', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
		return this.http.request(req);
   }

   getURL(idAlbum,idCancion,email): Observable<any> {
   	console.log(idAlbum + ", " + idCancion + ", " + email)
   	const formdata: FormData = new FormData();
   	formdata.append('idalbum',idAlbum);
   	formdata.append('idcancion',idCancion);
   	formdata.append('user',email);
   	//let headers = new HttpHeaders().set('Content-Type', 'application/json');
   	//return this.http.post(this.url + 'URLCancion', formdata, {headers: headers});

		const req = new HttpRequest('POST', GLOBAL.url + 'URLCancion', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
		return this.http.request(req);
   }
   
}