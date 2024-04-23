import { type WritableAtom } from "jotai";

export interface Metrics {
  value: number;
  name: string;
}

export interface StatementProps {
  statementAtom: WritableAtom<any, any, any>;
}
