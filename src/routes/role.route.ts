import { Router } from "express";
import RoleController from "../controllers/Role.controller";

const router: Router = Router();

const { addNewRole, deleteRole, getAllRoles, updateRole, getRoleById } =
  RoleController;

router.get("/roles", getAllRoles);
router.post("/role", addNewRole);
router.put("/role", updateRole);
router.delete("/role", deleteRole);
router.get("/role/:id", getRoleById);

export default router;
