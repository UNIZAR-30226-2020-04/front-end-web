//import { idAlbum } from '../models/idAlbum';
export class album {
    constructor(
        public idAlbum: idAlbum,
        public foto: string,
        public nombre: string,
        public fecha: string,
        public autor: string
    ){}
}
export class idAlbum {
    constructor (
        public l_id: string, 
        public u: string
    ){}
}
