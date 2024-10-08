import { Codec } from '@common';
import { BadRequestException } from '@nestjs/common';
import { PageInfo, PaginationInput } from '../types';

export type Edge<T> = { node: T; cursor: string };

export type Connection<T> = {
  totalCount: number;
  pageInfo: PageInfo;
  edges: Edge<T>[];
};

export class Pagination<T> {
  constructor(
    private readonly pagination: T[],
    private readonly totalCount: number,
    private readonly offset = 0,
    private readonly codec = new Codec(),
  ) {}

  static validate(pagination?: PaginationInput) {
    const codec: Codec = new Codec();

    const { after, first } = pagination ?? {};
    const limit = first ?? 25;
    const defaultOffset = 0;

    const uncheckedOffset = codec.decode(after ?? codec.encode(defaultOffset));
    const offset = Number.parseInt(uncheckedOffset.trim());

    if (Number.isNaN(+offset)) {
      throw new BadRequestException('After must be a valid integer');
    }

    if (limit < 1) {
      throw new BadRequestException('First cannot be less than 1');
    }

    if (limit > 100) {
      throw new BadRequestException('First cannot be greater than 100');
    }

    if (offset < 0) {
      throw new BadRequestException('First cannot be less than 0');
    }

    return { limit, offset };
  }

  getStartCursor(): string {
    return this.codec.encode(this.offset);
  }

  getEndCursor(): string {
    return this.codec.encode(this.pagination.length + this.offset);
  }

  getCursor(index: number, offset?: number): string {
    return this.codec.encode(index + offset ?? 0);
  }

  hasNextPage(): boolean {
    return this.offset + this.pagination.length < this.totalCount;
  }

  hasPreviousPage(): boolean {
    if (this.totalCount === 0) {
      return false;
    }

    return this.offset > 0 && this.pagination.length > 0;
  }

  getConnection(): Connection<T> {
    return {
      totalCount: this.totalCount,
      pageInfo: {
        startCursor: this.getStartCursor(),
        endCursor: this.getEndCursor(),
        hasNextPage: this.hasNextPage(),
        hasPreviousPage: this.hasPreviousPage(),
      },
      edges: this.getEdges(),
    };
  }

  getEdges(): Edge<T>[] {
    return this.pagination.map((node, index) => ({
      node,
      cursor: this.getCursor(index, this.offset),
    }));
  }
}
