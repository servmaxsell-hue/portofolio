import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    // Augmenter la limite pour les images en Base64
    const express = require('express');
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));

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
  console.log(`[REQUÊTE] ${req.method} ${req.url} depuis ${req.headers.origin || 'origine inconnue'}`);

  // Réponse immédiate aux requêtes de test CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', '*');
    return res.status(200).end();
  }

  try {
    const instance = await bootstrap();

    // Ajout dynamique de CORS pour chaque requête
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');

    const server = instance.getHttpAdapter().getInstance();
    return server(req, res);
  } catch (error) {
    console.error('CRITICAL ERROR:', error);
    return res.status(500).json({
      error: 'Backend error',
      details: error.message,
      origin: req.headers.origin
    });
  }
};

if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
