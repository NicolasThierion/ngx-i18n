import { CompilerFactory as NgxCompilerFactory, CompilerInterface } from './biesbjerg-ngx-translate-extract';
import { PoCompiler } from './PoCompiler';

/**
 * Overrides default CompilerFactory to take 'po' format for gettext instead of 'pot'
 */
export class CompilerFactory extends NgxCompilerFactory {
  static create(format: string, options?: {}): CompilerInterface {
    // NgxCompilerFactory accepts 'pot' format rather than 'po'
    if (format === 'po' || format === 'pot') {
      return new PoCompiler(options);
    }

    return super.create(format, options)
  }
}
