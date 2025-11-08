import { IdentifierType, RoleName } from "@prisma/client";

export interface RegisterUserDTO {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;

    role: RoleName;
}