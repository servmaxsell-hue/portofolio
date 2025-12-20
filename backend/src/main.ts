import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as express from 'express';

let app: INestApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    // Augmenter la limite pour les images en Base64
    // On utilise express pour gérer les limites avant que Nest ne les touche
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    app.setGlobalPrefix('api/v1');

    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: false,
      allowedHeaders: '*',
    });

    await app.init();
  }
  return app;
}

export default async (req: any, res: any) => {
  // Debug log pour voir quel endpoint est appelé
  console.log(`[Vercel Request] ${req.method} ${req.url}`);

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', '*');
    return res.status(200).end();
  }

  try {
    const instance = await bootstrap();
    const server = instance.getHttpAdapter().getInstance();

    // On s'assure que les headers CORS sont présents même en cas d'erreur
    res.setHeader('Access-Control-Allow-Origin', '*');

    return server(req, res);
  } catch (error) {
    console.error('CRITICAL BACKEND ERROR:', error);
    return res.status(500).json({
      error: 'Backend error',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(appInstance => appInstance.listen(4000));
}
