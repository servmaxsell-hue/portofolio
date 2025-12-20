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
      origin: true, // Accepte toutes les origines pour le moment pour faciliter le premier déploiement
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    // Pour Vercel, on n'appelle pas app.listen() si on est en serverless
    if (process.env.NODE_ENV !== 'production') {
      await app.listen(process.env.PORT ?? 4000);
    }
  }
  return app;
}

// Pour Vercel : exportez le moteur express
export const handler = async (req: any, res: any) => {
  try {
    const instance = await bootstrap();
    const server = instance.getHttpAdapter().getInstance();
    return server(req, res);
  } catch (error) {
    console.error('SERVERLESS HANDLER ERROR:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Pour le développement local
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
