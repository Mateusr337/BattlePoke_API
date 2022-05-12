import { NextFunction, Request, Response } from "express";

function errorHandlingMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
  if (error.type === "error_not_found") return res.status(404).send(error.message);
  if (error.type === "bad_request") return res.status(422).send(error.message);
  if (error.type === "unauthorized") return res.status(401).send(error.message);
  if (error.type === "error_conflict") return res.status(409).send(error.message);

  console.log(error);
  return res.sendStatus(500);
}

function notFoundError(entity: string) {
  return {
    type: "error_not_found",
    message: `Could not find specified "${entity}"!`,
  };
}

function conflictRequestError(entity: string) {
  return {
    type: "error_conflict",
    message: `Conflict on entry "${entity}"!`,
  };
}

function badRequestError(entity: string) {
  return {
    type: "bad_request",
    message: `Request data error: "${entity}"!`,
  };
}

function unauthorizedError(entity: string) {
  return {
    type: "unauthorized",
    message: `Unauthorized "${entity}"!`,
  };
}

export default {
  errorHandlingMiddleware,
  unauthorizedError,
  badRequestError,
  conflictRequestError,
  notFoundError,
};
