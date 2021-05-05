import { Pagination } from './pagination';
import { Codec } from '../../../common/src/codec';
import { BadRequestException } from '@nestjs/common';

const codec = new Codec();

describe('Pagination', () => {
  describe('getStartCursor', () => {
    it('should return encoded offset', () => {
      const pagination = new Pagination([], 0, 0);

      expect(pagination.getStartCursor()).toEqual('MA==');
    });
  });

  describe('getEndCursor', () => {
    it('should return encoded offset with pagination', () => {
      const pagination = new Pagination([1, 2, 3], 3, 0);

      expect(pagination.getEndCursor()).toEqual('Mg==');
    });

    it('should return encoded offset when pagination is empty', () => {
      const pagination = new Pagination([], 0, 0);

      expect(pagination.getEndCursor()).toEqual('MA==');
    });
  });

  describe('getCursor', () => {
    it('should return encoded index when offset is 0', () => {
      const pagination = new Pagination([], 0, 0);

      expect(pagination.getCursor(0)).toEqual('TmFO');
    });

    it('should return encoded summation of index and offset', () => {
      const pagination = new Pagination([], 0, 0);

      expect(pagination.getCursor(0, 1)).toEqual('MQ==');
    });
  });

  describe('hasNextPage', () => {
    describe('when pagination is empty', () => {
      it('should return false when pagination is empty', () => {
        const pagination = new Pagination([], 0, 0);

        expect(pagination.hasNextPage()).toBeFalsy();
      });
    });

    describe('when pagination is not empty', () => {
      it('should return false when multiple paginations exist', () => {
        const pagination = new Pagination([1, 2, 3], 10, 0);

        expect(pagination.hasNextPage()).toBeTruthy();
      });

      it('should return false when a partial pagination exists', () => {
        const pagination = new Pagination([1, 2, 3], 4, 0);

        expect(pagination.hasNextPage()).toBeTruthy();
      });

      it('should return false when no more paginations exist', () => {
        const pagination = new Pagination([1, 2, 3], 3, 0);

        expect(pagination.hasNextPage()).toBeFalsy();
      });
    });
  });

  describe('hasPreviousPage', () => {
    it('should return true when offset is non-zero and a partial pagination exists', () => {
      const pagination = new Pagination([1, 2, 3], 4, 1);

      expect(pagination.hasPreviousPage()).toBeTruthy();
    });

    it('should return false when offset is 0 and a partial pagination exists', () => {
      const pagination = new Pagination([1, 2, 3], 4, 0);

      expect(pagination.hasPreviousPage()).toBeFalsy();
    });

    it('should return false when the total count is 0', () => {
      const pagination = new Pagination([], 0, 4);

      expect(pagination.hasPreviousPage()).toBeFalsy();
    });

    it('should return false when offset is non-zero and the total count is 0', () => {
      const pagination = new Pagination([], 10, 11);

      expect(pagination.hasPreviousPage()).toBeFalsy();
    });
  });

  describe('getEdges', () => {
    it('should parse empty list', () => {
      const pagination = new Pagination([], 0, 0);

      expect(pagination.getEdges()).toEqual([]);
    });

    it('should parse populated list', () => {
      const pagination = new Pagination([1, 2, 3], 3, 0);

      expect(pagination.getEdges()).toEqual([
        {
          node: 1,
          cursor: 'MA==',
        },
        {
          node: 2,
          cursor: 'MQ==',
        },
        {
          node: 3,
          cursor: 'Mg==',
        },
      ]);
    });

    it('should take offset into account on cursor', () => {
      const pagination = new Pagination([1, 2, 3], 4, 1);

      expect(pagination.getEdges()).toEqual([
        {
          node: 1,
          cursor: 'MQ==',
        },
        {
          node: 2,
          cursor: 'Mg==',
        },
        {
          node: 3,
          cursor: 'Mw==',
        },
      ]);
    });
  });

  describe('getConnection', () => {
    it('should return connection on empty pagination', () => {
      const pagination = new Pagination([], 0, 0);

      expect(pagination.getConnection()).toEqual({
        totalCount: 0,
        pageInfo: {
          startCursor: 'MA==',
          endCursor: 'MA==',
          hasNextPage: false,
          hasPreviousPage: false,
        },
        edges: [],
      });
    });

    it('should return connection on non-empty pagination', () => {
      const pagination = new Pagination([0], 1, 0);

      expect(pagination.getConnection()).toEqual({
        totalCount: 1,
        pageInfo: {
          startCursor: 'MA==',
          endCursor: 'MQ==',
          hasNextPage: false,
          hasPreviousPage: false,
        },
        edges: [
          {
            node: 0,
            cursor: 'MA==',
          },
        ],
      });
    });
  });

  describe('validate', () => {
    it('should parse values', () => {
      expect(
        Pagination.validate({
          first: 10,
          after: codec.encode(0),
        }),
      ).toEqual({ limit: 10, offset: 0 });
    });

    it('should throw on limit less than 1', () => {
      expect(() =>
        Pagination.validate({
          first: -1,
          after: codec.encode(0),
        }),
      ).toThrow(BadRequestException);
    });

    it('should throw on limit greater than 100', () => {
      expect(() =>
        Pagination.validate({
          first: 101,
          after: codec.encode(0),
        }),
      ).toThrow(BadRequestException);
    });

    it('should throw on offset less than 0', () => {
      expect(() =>
        Pagination.validate({
          first: 10,
          after: codec.encode(-1),
        }),
      ).toThrow(BadRequestException);
    });

    it('should throw on offset less than 0', () => {
      expect(() =>
        Pagination.validate({
          first: 10,
          after: codec.encode('cool'),
        }),
      ).toThrow(BadRequestException);
    });
  });
});
