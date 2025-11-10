import { Roles } from "@prisma/client";

export interface AddRoleDTO {
    roleName: Roles;
    description?: string;
}   