export class usuario {
    constructor(
        public correo: string,
        public nombre: string,
        public foto: File,
        public contrasena: string,
        public nick: string,
        public nacimiento: string
        
    ){}
}