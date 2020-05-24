import { idAlbum } from '../models/album';
export class lista {
    constructor(
        public idRep: idAlbum,
        public foto: string,
        public nombre: string,
        public fecha: string,
        public autor: string
    ){}
}