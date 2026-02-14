// src/services/service.services.ts
import { Service } from "../schemas";
import { HydratedDocument } from "mongoose";
import { IService } from "../types";

// Fetch all services from the database
export const getAllServices = async (
  search?: string,
): Promise<HydratedDocument<IService>[]> => {
  let query = {};

  if (search) {
    query = { service_name: { $regex: search, $options: "i" } }; // case-insensitive search
  }

  const services = await Service.find(query);
  return services;
};
