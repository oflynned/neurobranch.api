import { Optional } from '../../common/src';
import { UnauthorizedException } from '@nestjs/common';
import { Codec } from '../../common/src/codec';

const codec = new Codec();

export const parseAuthorisationHeader = (
  authHeader: Optional<string>,
): string => {
  if (!authHeader) {
    throw new UnauthorizedException('Authorization is a required header');
  }

  const [realm, encodedToken] = authHeader.split(' ');

  if (realm !== 'Bearer') {
    throw new UnauthorizedException('Authorization realm must be bearer');
  }

  if (!encodedToken) {
    throw new UnauthorizedException(
      'Authorization token must contain a base64 encoded value',
    );
  }

  return codec.decode(encodedToken);
};
