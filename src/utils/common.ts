import { Request } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const validate = async (req: Request, validations: ValidationChain[]) => {
  await Promise.all(validations.map(validation => validation.run(req)));
  const errors = validationResult(req);
  return errors;
};