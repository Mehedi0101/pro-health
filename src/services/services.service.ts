// src/services/service.services.ts
import { Service } from "../schemas";
import { HydratedDocument } from "mongoose";
import { IService } from "../types";

// Fetch all services from the database
export const getAllServices = async (): Promise<
  HydratedDocument<IService>[]
> => {
  const services = await Service.find({});
  return services;
};
