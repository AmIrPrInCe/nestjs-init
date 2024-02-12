import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { json, urlencoded } from "express";
import { IoAdapter } from "@nestjs/platform-socket.io";

const logger: Logger = new Logger("Main");
async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	logger.log(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.use(json({ limit: "50mb" }));
	app.use(urlencoded({ extended: true, limit: "50mb" }));
	app.useWebSocketAdapter(new IoAdapter(app));

	await app.listen("3000");
	logger.log("Application listening on port 3000");
}
bootstrap();
