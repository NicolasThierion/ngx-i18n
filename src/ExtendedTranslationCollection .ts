import { TranslationCollection } from './biesbjerg-ngx-translate-extract';
import { TranslationMeta } from './TranslationMeta';
import { TranslationType } from '@biesbjerg/ngx-translate-extract';

type MetaMapType = {[key: string]: TranslationMeta};
export class ExtendedTranslationCollection extends TranslationCollection {

  public meta: MetaMapType;

  public constructor(values: TranslationType = {}, meta = {}) {
    super(values);
    this.meta = meta;
  }

  static of(collection: TranslationCollection): ExtendedTranslationCollection {
    if (TranslationCollection instanceof ExtendedTranslationCollection) {
      return collection as ExtendedTranslationCollection;
    }
    return new ExtendedTranslationCollection(collection.values, {});
  }

  public add(key: string, val: string = '', meta: TranslationMeta = {}): ExtendedTranslationCollection {
    return new ExtendedTranslationCollection(
      Object.assign({}, this.values, { [key]: val }),
      Object.assign({}, this.meta, { [key]: meta })
    );
  }

  public addKeys(keys: string[]): ExtendedTranslationCollection {
    const values = keys.reduce((results, key) => {
      results[key] = '';
      return results;
    }, {});

    const meta = keys.reduce((results, key) => {
      results[key] = '';
      return results;
    }, {});


    return new ExtendedTranslationCollection(values, meta);
  }

  public remove(key: string): ExtendedTranslationCollection {
    return this.filter(k => key !== k);
  }

  public forEach(callback: (key: string, val?: string, meta?: TranslationMeta) => void): ExtendedTranslationCollection {
    Object.keys(this.values)
      .forEach(key => callback.call(this, key, this.values[key], this.meta[key]));
    return this;
  }

  public filter(callback: (key: string, val?: string, meta?: TranslationMeta) => boolean): ExtendedTranslationCollection {
    let values: TranslationType = {};
    let metas: MetaMapType = {};
    this.forEach((key: string, val: string, meta: TranslationMeta) => {
      if (callback.call(this, key, val, meta)) {
        values[key] = val;
        metas[key] = meta;
      }
    });
    return new ExtendedTranslationCollection(values, metas);
  }

  public union(collection: TranslationCollection): ExtendedTranslationCollection {
    return new ExtendedTranslationCollection(
      Object.assign({}, this.values, collection.values),
      Object.assign({}, this.meta, (collection as any).meta || {}));
  }

  public intersect(collection: ExtendedTranslationCollection): ExtendedTranslationCollection {
    let values: TranslationType = {};
    let metas: MetaMapType = {};
    this.filter(key => collection.has(key))
      .forEach((key: string, val: string, meta: TranslationMeta) => {
        values[key] = val;
        metas[key] = meta;
      });

    return new ExtendedTranslationCollection(values, metas);
  }

  public has(key: string): boolean {
    return this.values.hasOwnProperty(key);
  }

  public get(key: string): string {
    return this.values[key];
  }

  public keys(): string[] {
    return Object.keys(this.values);
  }

  public count(): number {
    return Object.keys(this.values).length;
  }

  public isEmpty(): boolean {
    return Object.keys(this.values).length === 0;
  }

  public sort(compareFn?: (a: string, b: string) => number): ExtendedTranslationCollection {
    let values: TranslationType = {};
    let meta: MetaMapType = {};
    this.keys().sort(compareFn).forEach((key) => {
      values[key] = this.get(key);
      meta[key] = this.meta[key];
    });

    return new ExtendedTranslationCollection(values, meta);
  }
}
