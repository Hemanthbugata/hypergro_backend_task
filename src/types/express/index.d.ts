import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        // add other JWT fields if needed
      } | JwtPayload;
      userId?: string;
    }
  }
}