import type { NextFunction, Request, Response } from "express";      
import jwt, { verify } from "jsonwebtoken"; 
import type { JwtPayload } from "jsonwebtoken";

const { JWT_KEY } = process.env;

export const validateAccess = (req: Request, res: Response, next: NextFunction): any => {
    try {
        if (!JWT_KEY) {
            return res.status(501).json({ message : "JWT_KEY no está definido en las variables de entorno"});
        }
        const { token } = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : { token: null };

        if (!token){
            return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
        }

        const decoded = jwt.verify(token, JWT_KEY as string) as JwtPayload;
        if (!decoded) {
            return res.status(401).json({ message: "Acceso denegado. Token inválido." });
        }
        const  { exp } = decoded as JwtPayload;

        if (!exp) {
            return res.status(401).json({ message: "Acceso denegado. Token inválido." });
        }

        if (Date.now() >= exp * 1000) {
            return res.status(401).json({ message: "Acceso denegado. Token expirado." });
        }

        jwt.verify(token, JWT_KEY, (err : any, decoded : any) => {
            if (err) {
                return res.status(401).json({ message: "Acceso denegado. Token inválido." });
            };

            if (decoded && typeof decoded === 'object') {
                const user = {
                    ...decoded,
                    idUser: (decoded as any).idUser || (decoded as any).id,
                    email: (decoded as any).email,
                    firstName: (decoded as any).firstName,
                    lastName: (decoded as any).lastName,
                    roleId: (decoded as any).roleId,
                }

            };       
        
            next();
        });



    } catch (error) {
        return res.status(401).json({ message: "Acceso denegado. Token inválido." });
    }
};