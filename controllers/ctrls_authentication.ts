import { Request, Response } from 'express';

class authController {
    /**
     * Realiza un saludo.
     * @returns {string} un saludo.
     */
    public static getSaludo(req: Request, res: Response) {
        return res.send('Hola !!');
    }
}

export default authController;