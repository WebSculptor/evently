"use server";

import { CreateCategoryParams } from "@/types";
import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/db";
import Category from "@/lib/db/models/category.model";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();

    const fetchAllCategories = await Category.find();

    return JSON.parse(JSON.stringify(fetchAllCategories));
  } catch (error) {
    handleError(error);
  }
};
