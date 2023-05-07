import { createLogger, format, transports } from "winston";
import config from "config";
import DailyRotateFile from "winston-daily-rotate-file";

// Configuration du format du message
const { combine, printf, simple } = format;

const logFormat = combine(
  format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  simple(),
  printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Configuration des transports (sorties de log)
const loggerTransports = [
  new DailyRotateFile({
    filename: "logs/HS-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: false,
    maxSize: "20m",
    maxFiles: "30d", // Supprimer après 30jours
  }),
];

if (config.env !== "production") {
  loggerTransports.push(new transports.Console());
}

const logger = createLogger({
  level: config.env === "production" ? "info" : "debug",
  format: logFormat,
  transports: loggerTransports,
});

export default logger;
