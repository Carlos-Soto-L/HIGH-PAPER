import { Request, Response } from 'express';

class viewsController {
    /**
     * Realiza un saludo.
     * @returns {string} un saludo.
     */
    public static getSaludo(req: Request, res: Response) {
        res.send('Hola !!');
    }

    public static getInicio(req: Request, res: Response) {
        res.render('inicio');
    }

    public static getRegistro(req: Request, res: Response) {
        res.render('registro', {activar:false, mensaje:null});
    }


}


export default viewsController;