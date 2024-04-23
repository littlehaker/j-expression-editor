import { atom } from "jotai";

import JExpression from "j-expression";
import { Metrics } from "./typing";

export const expr = new JExpression();
export const exprAtom = atom([
  "$cond",
  [["$gt", ["$minus", ["$metrics", "Height"], 30], 30], "It's too high"],
  [["$gt", ["$metrics", "Width"], 80], "It's too wide"],
  [true, "It's OK"],
]);
export const metricsAtom = atom<Metrics[]>([
  { name: "Width", value: 100 },
  { name: "Height", value: 50 },
]);
export const metricsByNameAtom = atom((get) => {
  const metricsList = get(metricsAtom);
  const ret: Record<string, number> = {};
  metricsList.forEach((item) => {
    ret[item.name] = item.value;
  });
  return ret;
});

export const resultAtom = atom((get) => {
  const metricsObj = get(metricsByNameAtom);
  expr.define("metrics", (name: string) => {
    return metricsObj[name] ?? 0;
  });
  return expr.eval(get(exprAtom));
});
