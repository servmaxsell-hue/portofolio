import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: false,
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    if (process.env.NODE_ENV !== 'production') {
      await app.listen(process.env.PORT ?? 4000);
    } else {
      await app.init();
    }
  }
  return app;
}

export default async (req: any, res: any) => {
  try {
    const instance = await bootstrap();
    const server = instance.getHttpAdapter().getInstance();
    return server(req, res);
  } catch (error) {
    console.error('SERVERLESS HANDLER ERROR:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
