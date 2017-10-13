import { CompilerFactory as NgxCompilerFactory, CompilerInterface } from './ngx-import';

export class CompilerFactory extends NgxCompilerFactory {
  static create(format: string, options?: {}): CompilerInterface {
    // NgxCompilerFactory accepts 'pot' format rather than 'po'
    if (format === 'po') {
      format = 'pot';
    }
    return super.create(format, options)
  }

}
