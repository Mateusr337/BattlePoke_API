function errorHandlingMiddleware(error, req, res, next) {
    if (error.type === "error_not_found")
        return res.status(404).send(error.message);
    if (error.type === "bad_request")
        return res.status(422).send(error.message);
    if (error.type === "unauthorized")
        return res.status(401).send(error.message);
    if (error.type === "error_conflict")
        return res.status(409).send(error.message);
    console.log(error);
    return res.sendStatus(500);
}
function notFoundError(entity) {
    return {
        type: "error_not_found",
        message: "Could not find specified \"".concat(entity, "\"!")
    };
}
function conflictRequestError(entity) {
    return {
        type: "error_conflict",
        message: "Conflict on entry \"".concat(entity, "\"!")
    };
}
function badRequestError(entity) {
    return {
        type: "bad_request",
        message: "Request data error: \"".concat(entity, "\"!")
    };
}
function unauthorizedError(entity) {
    return {
        type: "unauthorized",
        message: "Unauthorized \"".concat(entity, "\"!")
    };
}
export default {
    errorHandlingMiddleware: errorHandlingMiddleware,
    unauthorizedError: unauthorizedError,
    badRequestError: badRequestError,
    conflictRequestError: conflictRequestError,
    notFoundError: notFoundError
};
