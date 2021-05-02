
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum QuestionType {
    RADIO = "RADIO",
    CHECKBOX = "CHECKBOX",
    SCALE = "SCALE",
    TEXT = "TEXT"
}

export enum Frequency {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    FORTNIGHTLY = "FORTNIGHTLY",
    MONTHLY = "MONTHLY"
}

export class CandidateInput {
    name: string;
    dateOfBirth: string;
    email: string;
    username: string;
}

export class ResearcherInput {
    name: string;
    dateOfBirth: string;
    username: string;
}

export class Audit {
    id: string;
    action: string;
    performedAt: Timestamp;
    performedBy?: Actor;
}

export class AuditEdge {
    node?: Audit;
    cursor: Cursor;
}

export class AuditConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: AuditEdge[];
}

export abstract class IQuery {
    abstract createCandidateAccount(input?: CandidateInput): Candidate | Promise<Candidate>;

    abstract getResearcher(): Researcher | Promise<Researcher>;

    abstract getTrial(trialId: string): Trial | Promise<Trial>;

    abstract getTrials(first?: number, after?: Cursor): TrialConnection | Promise<TrialConnection>;
}

export class Candidate {
    id: string;
    createdAt: Timestamp;
    deletedAt?: Timestamp;
    verifiedAt?: Timestamp;
    auditLog?: AuditConnection;
    name: string;
    username: string;
    email: string;
}

export class CandidateEdge {
    node?: Candidate;
    cursor: Cursor;
}

export class CandidateConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: CandidateEdge[];
}

export class Question {
    id: string;
    title: string;
    type: QuestionType;
    optional: boolean;
    choices?: Choice[];
    trial?: Trial;
}

export abstract class IMutation {
    abstract createResearcher(input?: ResearcherInput): Researcher | Promise<Researcher>;
}

export class Researcher {
    id: string;
    auditLog?: AuditConnection;
    createdAt: Timestamp;
    deletedAt?: Timestamp;
    verifiedAt?: Timestamp;
    name: string;
    username: string;
    email: string;
    providerId: string;
    provider: string;
    trials?: TrialConnection;
}

export class ResearcherEdge {
    node?: Trial;
    cursor: Cursor;
}

export class ResearcherConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: ResearcherEdge[];
}

export class Choice {
    id: string;
    index: number;
}

export class ResponseEdge {
    node?: Response;
    cursor: Cursor;
}

export class ResponseConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: ResponseEdge[];
}

export class RadioResponse {
    id: string;
    type: QuestionType;
    respondent?: Candidate;
    choices?: Choice[];
    response?: Choice;
}

export class CheckboxResponse {
    id: string;
    type: QuestionType;
    respondent?: Candidate;
    choices?: Choice[];
    responses?: Choice[];
}

export class TextResponse {
    id: string;
    type: QuestionType;
    respondent?: Candidate;
    response: string;
}

export class ScaleResponse {
    id: string;
    type: QuestionType;
    respondent?: Candidate;
    response: number;
}

export class Trial {
    id: string;
    createdAt: Timestamp;
    deletedAt?: Timestamp;
    title: string;
    synopsis: string;
    description: string;
    tags: string[];
    startTime: Timestamp;
    endTime: Timestamp;
    frequency: Frequency;
    auditLog?: AuditConnection;
    lead?: Researcher;
    researchers?: ResearcherConnection;
    participants?: CandidateConnection;
    questions?: Question[];
}

export class TrialEdge {
    node?: Trial;
    cursor: Cursor;
}

export class TrialConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: TrialEdge[];
}

export class PageInfo {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor?: Cursor;
    endCursor?: Cursor;
}

export type Timestamp = any;
export type Cursor = any;
export type Actor = Candidate | Researcher;
export type Response = RadioResponse | CheckboxResponse | ScaleResponse | TextResponse;
