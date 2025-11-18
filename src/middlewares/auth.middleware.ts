import type { NextFunction, Request, Response } from "express";      
import jwt from "jsonwebtoken"; 
import type { JwtPayload } from "jsonwebtoken";

const { JWT_KEY } = process.env;