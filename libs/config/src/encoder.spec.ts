import { Encoder } from './encoder';

const encoder = new Encoder();

describe('Encoder', () => {
  describe('encode', () => {
    it('should encode ascii to base64', () => {
      expect(encoder.encode('Hello world!')).toEqual('SGVsbG8gd29ybGQh');
    });
  });

  describe('decode', () => {
    it('should decode base64 to ascii', () => {
      expect(encoder.decode('SGVsbG8gd29ybGQh')).toEqual('Hello world!');
    });
  });
});
