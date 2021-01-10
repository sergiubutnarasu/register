import { Font, Style } from "exceljs";

export type CellOptions = {
  style?: Partial<Style>;
  font?: Partial<Font>;
};

export type Horizontal =
  | "left"
  | "center"
  | "right"
  | "fill"
  | "justify"
  | "centerContinuous"
  | "distributed";

export type CompanyDetails = {
  name: string;
  initialValue: number;
  initialIndex: number;
};

export type Company = CompanyDetails & {
  registers?: Register[];
};

export type Register = {
  date: Date;
  entries?: RegisterEntry[];
};

export type RegisterEntry = {
  id?: string;
  docNumber?: string;
  annexNumber?: string;
  description: string;
  value: number;
};
