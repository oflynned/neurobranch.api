
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Frequency {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    FORTNIGHTLY = "FORTNIGHTLY",
    MONTHLY = "MONTHLY"
}

export enum QuestionType {
    RADIO = "RADIO",
    CHECKBOX = "CHECKBOX",
    SCALE = "SCALE",
    TEXT = "TEXT"
}

export interface ResearcherInput {
    name: string;
    dateOfBirth: string;
    email: string;
    username: string;
}

export interface CandidateInput {
    name: string;
    dateOfBirth: string;
    email: string;
    username: string;
}

export interface PageInfo {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor?: Cursor;
    endCursor?: Cursor;
}

export interface Audit {
    id: string;
    action: string;
    performedAt: Timestamp;
    performedBy: Actor;
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

export interface Candidate {
    id: string;
    createdAt: Timestamp;
    deletedAt?: Timestamp;
    verifiedAt?: Timestamp;
    auditLog?: AuditConnection;
    name: string;
    username: string;
    email: string;
}

export interface CandidateEdge {
    node?: Candidate;
    cursor: Cursor;
}

export interface CandidateConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: CandidateEdge[];
}

export interface Researcher {
    id: string;
    auditLog?: AuditConnection;
    createdAt: Timestamp;
    deletedAt?: Timestamp;
    verifiedAt?: Timestamp;
    name: string;
    username: string;
    email: string;
}

export interface ResearcherEdge {
    node?: Trial;
    cursor: Cursor;
}

export interface ResearcherConnection {
    totalCount: number;
    pageInfo: PageInfo;
    edges: ResearcherEdge[];
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
    organisers?: ResearcherConnection;
    participants?: CandidateConnection;
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

export interface Question {
    id: string;
    title: string;
    type: QuestionType;
    answers: Answer[];
    trial: Trial;
}

export interface Answer {
    id: string;
    respondedAt: Timestamp;
    response: Response;
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
    respondent: Candidate;
    answers: Answer[];
    response: Answer;
}

export interface CheckboxResponse {
    id: string;
    type: QuestionType;
    respondent: Candidate;
    answers: Answer[];
    responses: Answer[];
}

export interface TextResponse {
    id: string;
    type: QuestionType;
    respondent: Candidate;
    response: string;
}

export interface ScaleResponse {
    id: string;
    type: QuestionType;
    respondent: Candidate;
    response: number;
}

export interface IQuery {
    getTrialResponses(trialId: string): ResponseConnection | Promise<ResponseConnection>;
}

export interface IMutation {
    createResearcherAccount(input?: ResearcherInput): Researcher | Promise<Researcher>;
    createCandidateAccount(input?: CandidateInput): Candidate | Promise<Candidate>;
}

export type Timestamp = any;
export type Cursor = any;
export type Actor = Candidate | Researcher;
export type Response = RadioResponse | CheckboxResponse | ScaleResponse | TextResponse;
