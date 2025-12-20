import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as express from 'express';
import { AllExceptionsFilter } from './all-exceptions.filter';

let app: INestApplication;

async function bootstrap() {
  if (!app) {
    // FORCE DATABASE URL pour Vercel (si elle est mal lue)
    if (process.env.VERCEL === '1' && (!process.env.DATABASE_URL || !process.env.DATABASE_URL.startsWith('mysql://'))) {
      process.env.DATABASE_URL = "mysql://u262725529_portfolio:Paul%400815@srv2024.hstgr.io:3306/u262725529_portfolio";
      console.log('--- DATABASE_URL FORCÉE ---');
    }

    app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new AllExceptionsFilter());

    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.setGlobalPrefix('api/v1');
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: '*',
      credentials: false
    });

    await app.init();
  }
  return app;
}

export default async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const instance = await bootstrap();
    const server = instance.getHttpAdapter().getInstance();
    return server(req, res);
  } catch (error) {
    console.error('CRITICAL ERROR:', error);
    return res.status(500).json({
      message: "CRITICAL BOOTSTRAP ERROR",
      error: error.message,
      stack: error.stack
    });
  }
};

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(appInstance => appInstance.listen(4000));
}
