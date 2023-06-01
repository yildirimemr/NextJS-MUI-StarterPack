import jwt, { JwtPayload } from "jsonwebtoken";
import SignOption from "./interfaces/IJwtSignOptions";

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

const signJwtAccessToken = (
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) => {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey!, options);
  return token;
};

const verifyJwtAccessToken = (token: string) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey!);
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
};

export { signJwtAccessToken, verifyJwtAccessToken };
