import PaletterESM from '../index.mjs';
import * as PaletterAll from '../index.mjs';
import { default as PaletterDefault } from '../index.mjs';
import PaletterCJS from '../index.cjs';

describe('Import variations', () => {
  it('should import default class via ESM default import', () => {
    expect(typeof PaletterESM).toBe('function');
  });

  it('should import default class via require on CJS entry', () => {
    expect(typeof PaletterCJS).toBe('function');
  });

  it('should import default via namespace import', () => {
    expect(typeof PaletterAll.default).toBe('function');
  });

  it('should import default via named default alias', () => {
    expect(typeof PaletterDefault).toBe('function');
  });
});
