import * as moduleAlias from 'module-alias';
import * as path from 'path';

moduleAlias.addAliases({
  '@': path.join(__dirname, '.'),
  '@/utils': path.join(__dirname, 'utils'),
  '@/services': path.join(__dirname, 'services'),
});
