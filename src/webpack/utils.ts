import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Get all files in dir matching patterns
 */
export function readDir(dir: string, patterns: string[]): string[] {
  return patterns.reduce((results, pattern) => {
    return glob.sync(path.join(dir, pattern))
      .filter(path => fs.statSync(path).isFile())
      .concat(results);
  }, []);
}
