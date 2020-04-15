import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import { GLOBAL } from './global';

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: HttpClient) {}

  uploadFile(correo,titAlbum,titCancion,file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		let data = {email: correo, tituloAl: titAlbum, tituloCanc: titCancion, mp3: formdata};
		console.log(data);
		const req = new HttpRequest('POST', GLOBAL.url + 'uploadSong', data, {
			  reportProgress: true,
			  responseType: 'text'
		});
		return this.http.request(req);
   }
   
}