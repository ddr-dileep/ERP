import mongoose from "mongoose";

export const apiSuccessResponse = (data: any, msg = "Success") => {
  const response = {
    data,
    success: true,
    message: msg,
    statusCode: 200,
  };
  return response;
};

export const apiErrorResponse = (error: any, msg = "Error") => {
  const response = {
    error,
    success: false,
    message: msg,
    statusCode: 400,
  };
  return response;
};

export const apiOtherError = (error: any) => {
  if (error.code === 11000) {
    const duplicateKey = Object.keys(error.keyValue)[0];
    const duplicateValue = error.keyValue[duplicateKey];
    const errorMessage = `Duplicate value for key: ${duplicateKey} (${duplicateValue})`;

    return apiErrorResponse("duplicate_error", errorMessage);
  }

  if (error instanceof mongoose.Error.CastError && error.kind === "ObjectId") {
    return apiErrorResponse("invalid_id_error", "Invalid ID format provided.");
  }

  return apiErrorResponse(
    "something_went_wrong",
    error.message || "An unknown error occurred."
  );
};
