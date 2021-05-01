import { Codec } from './codec';

const codec = new Codec();

describe('Encoder', () => {
  describe('encode', () => {
    it('should encode ascii to base64', () => {
      expect(codec.encode('Hello world!')).toEqual('SGVsbG8gd29ybGQh');
    });
  });

  describe('decode', () => {
    it('should decode base64 to ascii', () => {
      expect(codec.decode('SGVsbG8gd29ybGQh')).toEqual('Hello world!');
    });
  });
});
