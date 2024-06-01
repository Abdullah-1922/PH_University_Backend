import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";

const handleCastError=(err:mongoose.Error.CastError):TGenericErrorResponse =>{




    const statusCode = 400;

    return {
      statusCode,
      message: " Validation Error",
      errorSources,
    };

}