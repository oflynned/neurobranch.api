export class Codec {
  encode(source: string): string {
    return Buffer.from(source).toString('base64');
  }

  decode(source: string): string {
    return Buffer.from(source, 'base64').toString('ascii');
  }
}
