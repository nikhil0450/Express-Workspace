import { Router } from "express";
import usersRoute from "./users.mjs";
import productsRoute from "./products.mjs";

const router = Router();

router.use(productsRoute);
router.use(usersRoute);

export default router;