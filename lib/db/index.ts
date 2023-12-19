import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Define the cache variable for mongoose
let cached = (global as any).mongoose || { conn: null, promise: null };

/**
 * Function to establish a connection to the MongoDB database.
 * If a connection is already established, it returns the established connection.
 * If no connection is established, it establishes a new connection using the provided MongoDB URI.
 */
export const connectToDatabase = async () => {
  // If a connection is already established, return the established connection.
  if (cached.conn) return cached.conn;

  // Throw an error if the MongoDB URI is missing.
  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  // If no connection is established, establish a new connection using the provided MongoDB URI.
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  // Wait for the connection to be established.
  cached.conn = await cached.promise;

  // Return the established connection.
  return cached.conn;
};
