import { Router } from "express";
import RoleController from "../controllers/Role.controller";
import PackageController from "../controllers/Package.controller";

const router: Router = Router();

const { addNewPackage, getAllPackages, updatePackage, deletePackage } = PackageController;
 
router.get("/packages", getAllPackages);
router.post("/package", addNewPackage);
router.put("/package", updatePackage);
router.delete("/package", deletePackage);

export default router;