import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

export const handleInputError = async (req: Request, res: Response, next: NextFunction) => {
  await body("name")
    .notEmpty().withMessage("Name field can't be empty")
    .run(req);

  await body("price")
    .isNumeric().withMessage("Invalid value")
    .notEmpty().withMessage("Price field can't be empty")
    .custom(value => value > 0).withMessage("Invalid price")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const handleInvalidParam = async (req: Request, res: Response, next: NextFunction) => {
  await param("id")
    .isInt().withMessage("Invalid ID")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  next();
};
