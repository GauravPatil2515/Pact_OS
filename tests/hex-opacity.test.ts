import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { applyHexOpacity } from '../src/lib/ui/hex-opacity';

describe('applyHexOpacity', () => {
  it('converts 3-digit hex with opacity correctly', () => {
    assert.equal(applyHexOpacity('#fff', 0.5), '#ffffff80');
    assert.equal(applyHexOpacity('#000', 1.0), '#000000ff');
    assert.equal(applyHexOpacity('#123', 0), '#11223300');
  });

  it('converts 6-digit hex with opacity correctly', () => {
    assert.equal(applyHexOpacity('#d4af37', 0.1), '#d4af371a');
    assert.equal(applyHexOpacity('#09090b', 0.25), '#09090b40');
    assert.equal(applyHexOpacity('#ffffff', 1), '#ffffffff');
  });

  it('works with hex string without leading hash', () => {
    assert.equal(applyHexOpacity('d4af37', 0.5), '#d4af3780');
    assert.equal(applyHexOpacity('abc', 1), '#aabbccff');
  });

  it('clamps opacity outside 0.0 - 1.0 safely', () => {
    assert.equal(applyHexOpacity('#ffffff', -0.5), '#ffffff00');
    assert.equal(applyHexOpacity('#ffffff', 1.5), '#ffffffff');
  });

  it('handles invalid hex input and non-string types safely', () => {
    assert.equal(applyHexOpacity('', 0.5), '#00000000');
    assert.equal(applyHexOpacity('#12', 0.5), '#00000000');
    assert.equal(applyHexOpacity('#xyz', 0.5), '#00000000');
    // @ts-expect-error test invalid type
    assert.equal(applyHexOpacity(null, 0.5), '#00000000');
    // @ts-expect-error test invalid type
    assert.equal(applyHexOpacity(undefined, 0.5), '#00000000');
  });
});
