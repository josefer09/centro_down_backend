import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MYSQL_DB_NAME: get('MYSQL_DB_NAME').required().asString(),
  MYSQL_PORT: get('MYSQL_PORT').required().asPortNumber(),
  MYSQL_PASSWORD: get('MYSQL_PASSWORD').required().asString(),
  MYSQL_HOST: get('MYSQL_HOST').required().asString(),
  MYSQL_USERNAME: get('MYSQL_USERNAME').required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
  SEND_EMAIL: get("SEND_EMAIL").default("false").asBool(),
};
