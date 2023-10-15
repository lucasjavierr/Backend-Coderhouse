import path from 'path';
import { fileURLToPath } from 'url';

// creo y exporto la constante __dirname que hace referencia a la carpeta src
export const __dirname = path.dirname(fileURLToPath(import.meta.url));
