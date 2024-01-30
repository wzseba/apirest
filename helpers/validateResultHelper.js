import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  try {
    //Resultado de todas las validaciones
    validationResult(req).throw();
    return next();
  } catch (e) {
    res.status(400).send({ errors: e.mapped() });
  }
};
