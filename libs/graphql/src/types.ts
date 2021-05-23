
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Sex {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

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

export interface CreateInvestigatorInput {
    name: string;
    dateOfBirth: string;
    sex: Sex;
}

export interface ParticipantInput {
    name: string;
    dateOfBirth: string;
    email: string;
    username: string;
}

export interface CreateTrialInput {
    startTime: Timestamp;
    duration: number;
    title: string;
    synopsis: string;
    description: string;
    tags: string[];
    frequency: Frequency;
}

export interface PaginationArgs {
    first?: number;
    after?: Cursor;
}

export interface Audit {
    id: string;
    action: string;
    performedAt: Timestamp;
    performedBy?: Actor;
}

export interface AuditEdge {
    node?: Audit;
    cursor: Cursor;
}

export interface AuditConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: AuditEdge[];
}

export interface IQuery {
    getInvestigator(): Investigator | Promise<Investigator>;
    createParticipantAccount(input?: ParticipantInput): Participant | Promise<Participant>;
    getEligibleTrials(): TrialConnection | Promise<TrialConnection>;
    getTrial(trialId: string): Trial | Promise<Trial>;
}

export interface IMutation {
    createInvestigator(input?: CreateInvestigatorInput): Investigator | Promise<Investigator>;
    createTrial(input?: CreateTrialInput): Trial | Promise<Trial>;
}

export interface Investigator {
    id: string;
    auditLog?: AuditConnection;
    createdAt: Timestamp;
    deletedAt?: Timestamp;
    verifiedAt?: Timestamp;
    name: string;
    dateOfBirth: string;
    sex: Sex;
    email: string;
    trials?: TrialConnection;
}

export interface InvestigatorEdge {
    node?: Trial;
    cursor: Cursor;
}

export interface InvestigatorConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: InvestigatorEdge[];
}

export interface Participant {
    id: string;
    createdAt: Timestamp;
    deletedAt?: Timestamp;
    verifiedAt?: Timestamp;
    auditLog?: AuditConnection;
    name: string;
    username: string;
    email: string;
}

export interface ParticipantEdge {
    node?: Participant;
    cursor: Cursor;
}

export interface ParticipantConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: ParticipantEdge[];
}

export interface Question {
    id: string;
    title: string;
    type: QuestionType;
    optional: boolean;
    choices?: Choice[];
    trial?: Trial;
}

export interface Choice {
    id: string;
    index: number;
}

export interface ResponseEdge {
    node?: Response;
    cursor: Cursor;
}

export interface ResponseConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: ResponseEdge[];
}

export interface RadioResponse {
    id: string;
    type: QuestionType;
    respondent?: Participant;
    choices?: Choice[];
    response?: Choice;
}

export interface CheckboxResponse {
    id: string;
    type: QuestionType;
    respondent?: Participant;
    choices?: Choice[];
    responses?: Choice[];
}

export interface TextResponse {
    id: string;
    type: QuestionType;
    respondent?: Participant;
    response: string;
}

export interface ScaleResponse {
    id: string;
    type: QuestionType;
    respondent?: Participant;
    response: number;
}

export interface Trial {
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

export interface TrialEdge {
    node?: Trial;
    cursor: Cursor;
}

export interface TrialConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: TrialEdge[];
}

export interface PageInfo {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor?: Cursor;
    endCursor?: Cursor;
}

export type Timestamp = any;
export type Cursor = any;
export type Actor = Participant | Investigator;
export type Response = RadioResponse | CheckboxResponse | ScaleResponse | TextResponse;
