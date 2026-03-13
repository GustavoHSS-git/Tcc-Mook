import { Injectable } from '@nestjs/common';
import cloudinary from './cloudinary.config';

interface CloudinaryResult {
  secure_url: string;
  [key: string]: any; // outros campos que o Cloudinary retorna
}

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<{ url: string }> {
    return new Promise<{ url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: 'image' },
          (error: unknown, result?: CloudinaryResult) => {
            // Garantir que o erro seja do tipo Error
            if (error) {
              if (error instanceof Error) {
                return reject(error);
              }

              console.error(
                'Erro desconhecido ao enviar imagem para o Cloudinary:',
                error,
              );
              return reject(new Error('Erro ao enviar imagem'));
            }

            // Garantir que result e result.secure_url existam
            if (!result || !result.secure_url) {
              return reject(new Error('Resultado inválido do Cloudinary'));
            }

            resolve({ url: result.secure_url });
          },
        )
        .end(file.buffer);
    });
  }
}
