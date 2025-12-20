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
  // SOLUTION ULTIME CORS : Gestion manuelle des headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Répondre immédiatement aux requêtes OPTIONS (Preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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
