import { usuario } from './usuario';

export class album {
    constructor(
        public _id: string,
        public foto: string,
        public nombre: string,
        public fecha: string,
        public autor: string
    ){}
}