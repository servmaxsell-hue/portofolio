import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as express from 'express';

let app: INestApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.setGlobalPrefix('api/v1');
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: '*',
    });
    await app.init();
  }
  return app;
}

export default async (req: any, res: any) => {
  // On force les headers CORS pour voir l'erreur même si ça plante
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const instance = await bootstrap();
    const server = instance.getHttpAdapter().getInstance();
    return server(req, res);
  } catch (error) {
    // ICI ON AFFICHE LE VRAI PROBLÈME
    return res.status(500).json({
      message: "ERREUR DU SERVEUR",
      error: error.message,
      stack: error.stack // On affiche tout pour comprendre !
    });
  }
};

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(appInstance => appInstance.listen(4000));
}
