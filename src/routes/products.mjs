import { Router } from "express";
import { mockProducts } from "../utils/productConstants.mjs";

const router = Router();

router.get("/api/products", (request, response)=> {
    response.send(mockProducts)
})

export default router;