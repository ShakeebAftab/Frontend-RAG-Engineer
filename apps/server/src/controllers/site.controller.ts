import { Response } from "express";
import { CustomRequest } from "../utils/customRequest.js";
import { respHandler, serverError } from "../utils/respHandler.js";
import { CreateSiteRequestType } from "./types/site.types.js";
import { getMessage } from "../utils/gemini.js";

export const createSite = async (
  req: CustomRequest<CreateSiteRequestType>,
  res: Response
) => {
  try {
    console.log(req.body);

    // const data = await model.generateContent([req.body.description]);
    // const jsonData = JSON.parse(
    //   data.response.text().replace("```json", "").replaceAll("```", "")
    // );
    // console.log(JSON.stringify(jsonData, null, 2));
    const data = await getMessage(req.body.description);
    if (!data) return respHandler({ res, status: 500, data: serverError });
    const jsonData = JSON.parse(
      data.replace("```json", "").replaceAll("```", "")
    );
    return respHandler({ res, status: 200, data: { jsonData } });
  } catch (error) {
    console.log(error);
    return respHandler({ res, status: 500, data: serverError });
  }
};
