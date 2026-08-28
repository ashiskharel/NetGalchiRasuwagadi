import type { Status } from "./status";

export type Tech =
  | "fiber"
  | "microwave"
  | "cross-border"
  | "south-gateway"
  | "mobile"
  | "repeater"
  | "satellite";

export interface SnapshotLink {
  id: string;
  status: Status;
  title_en: string;
  title_ne: string;
  note_en: string;
  note_ne: string;
  as_of: string;
  source: string;
}

export interface DistrictRollup {
  id: string;
  name_en: string;
  name_ne: string;
  affected: number;
  remaining: number;
  as_of: string;
  source: string;
}

export interface Place {
  id: string;
  name_en: string;
  name_ne: string;
  lat?: number;
  lng?: number;
}

export interface Segment {
  id: string;
  from: string;
  to: string;
  tech: Tech;
  status: Status;
  title_en: string;
  title_ne: string;
  note_en: string;
  note_ne: string;
  as_of: string;
  source: string;
  via?: string[];
  pointOnly?: boolean;
}

export interface Site {
  id: string;
  name_en: string;
  name_ne: string;
  district: string;
  operator: string;
  tech: Tech;
  status: Status;
  note_en?: string;
  note_ne?: string;
  as_of: string;
  source: string;
  lat?: number;
  lng?: number;
}

export interface AsnRecord {
  asn: number;
  name_en: string;
  name_ne: string;
  aka: string;
  role_en: string;
  role_ne: string;
  he: string;
  peeringdb?: string;
  lg?: string;
  rs?: string;
  radar?: string;
  group: "origin" | "north" | "south" | "domestic";
}

export interface SourceRecord {
  id: string;
  name: string;
  title_en: string;
  title_ne: string;
  url: string;
  date: string;
}
