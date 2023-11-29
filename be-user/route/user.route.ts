import { Router, Request, Response } from "express";
import validator from "../middleware/schema.middleware";
const router = Router();
import createUserSchema from "../middleware/schema";
import middleware from "../middleware/schema.middleware";
import { createUser, listUser } from "../controller/user.controller";





router.get("/list-users", listUser);
// Payload validation being done with schemaValidator if correct data coming from FE?
router.post("/create-user",middleware(createUserSchema), createUser);


export default router;