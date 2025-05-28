import mongoose from "mongoose";
import csv from "csvtojson";
import Property from "../models/property";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

// Replace with your actual User _id from MongoDB
const DEFAULT_USER_ID = "6656e8f6c2e4e2a1b0c12345";

function parseBoolean(val: string) {
  return val === "True" || val === "true";
}

async function importCSV() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const filePath = path.join(__dirname, "../../properties.csv");
    const data = await csv().fromFile(filePath);

    // Transform data types and add createdBy
    const transformed = data.map((item: any) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      price: Number(item.price),
      state: item.state,
      city: item.city,
      areaSqFt: Number(item.areaSqFt),
      bedrooms: Number(item.bedrooms),
      bathrooms: Number(item.bathrooms),
      amenities: item.amenities ? item.amenities.split("|") : [],
      furnished: item.furnished,
      availableFrom: new Date(item.availableFrom),
      listedBy: item.listedBy,
      tags: item.tags ? item.tags.split("|") : [],
      colorTheme: item.colorTheme,
      rating: Number(item.rating),
      isVerified: parseBoolean(item.isVerified),
      listingType: item.listingType,
      createdBy: DEFAULT_USER_ID,
    }));

    await Property.insertMany(transformed);

    console.log("Import completed");
  } catch (err) {
    console.error("Error importing CSV:", err);
  } finally {
    await mongoose.disconnect();
  }
}

importCSV();