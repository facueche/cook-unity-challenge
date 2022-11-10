import { Application, Router } from "express";
import ChefLoginController from "../controllers/ChefLogin.controller";
import ChefRegisterController from "../controllers/ChefRegister.controller";
import CustomerLoginController from "../controllers/CustomerLogin.controller";
import CustomerRegisterController from "../controllers/CustomerRegister.controller";

export const loadApiEndpoints = (app: Application): void => {
    app.use("/chef", chefRouter);
    app.use("/customer", customerRouter);
};

const chefRouter: Router = Router();
chefRouter.post("/register", ChefRegisterController);
chefRouter.post("/login", ChefLoginController);

const customerRouter: Router = Router();
customerRouter.post("/register", CustomerRegisterController);
customerRouter.post("/login", CustomerLoginController);