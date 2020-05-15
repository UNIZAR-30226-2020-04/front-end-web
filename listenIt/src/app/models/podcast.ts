import { idAlbum } from '../models/album';
export class podcast {
    constructor(
        public idAlbum: idAlbum,
        public foto: string,
        public nombre: string,
        public fecha: string,
        public autor: string
    ){}
}