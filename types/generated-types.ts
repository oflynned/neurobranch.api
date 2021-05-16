
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

export class CreateInvestigatorInput {
    name: string;
    dateOfBirth: string;
}

export class ParticipantInput {
    name: string;
    dateOfBirth: string;
    email: string;
    username: string;
}

export class CreateTrialInput {
    startTime: Timestamp;
    duration: number;
    title: string;
    synopsis: string;
    description: string;
    tags: string[];
    frequency: Frequency;
}

export class PaginationArgs {
    first?: number;
    after?: Cursor;
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
    abstract getInvestigator(): Investigator | Promise<Investigator>;

    abstract createParticipantAccount(input?: ParticipantInput): Participant | Promise<Participant>;

    abstract getEligibleTrials(): TrialConnection | Promise<TrialConnection>;

    abstract getTrial(trialId: string): Trial | Promise<Trial>;
}

export abstract class IMutation {
    abstract createInvestigator(input?: CreateInvestigatorInput): Investigator | Promise<Investigator>;

    abstract createTrial(input?: CreateTrialInput): Trial | Promise<Trial>;
}

export class Investigator {
    id: string;
    auditLog?: AuditConnection;
    createdAt: Timestamp;
    deletedAt?: Timestamp;
    verifiedAt?: Timestamp;
    name: string;
    email: string;
    trials?: TrialConnection;
}

export class InvestigatorEdge {
    node?: Trial;
    cursor: Cursor;
}

export class InvestigatorConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: InvestigatorEdge[];
}

export class Participant {
    id: string;
    createdAt: Timestamp;
    deletedAt?: Timestamp;
    verifiedAt?: Timestamp;
    auditLog?: AuditConnection;
    name: string;
    username: string;
    email: string;
}

export class ParticipantEdge {
    node?: Participant;
    cursor: Cursor;
}

export class ParticipantConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: ParticipantEdge[];
}

export class Question {
    id: string;
    title: string;
    type: QuestionType;
    optional: boolean;
    choices?: Choice[];
    trial?: Trial;
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
    respondent?: Participant;
    choices?: Choice[];
    response?: Choice;
}

export class CheckboxResponse {
    id: string;
    type: QuestionType;
    respondent?: Participant;
    choices?: Choice[];
    responses?: Choice[];
}

export class TextResponse {
    id: string;
    type: QuestionType;
    respondent?: Participant;
    response: string;
}

export class ScaleResponse {
    id: string;
    type: QuestionType;
    respondent?: Participant;
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
    lead?: Investigator;
    investigators?: InvestigatorConnection;
    participants?: ParticipantConnection;
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
export type Actor = Participant | Investigator;
export type Response = RadioResponse | CheckboxResponse | ScaleResponse | TextResponse;
