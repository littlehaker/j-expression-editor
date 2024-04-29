import { WritableAtom, useAtom } from "jotai";
import { Metrics } from "../../typing";
import { focusAtom } from "jotai-optics";
import NumbericInput from "../NumericInput";
import { useMemo } from "react";

export default function MetricsItem({
  metricsAtom,
}: {
  metricsAtom: WritableAtom<Metrics, any, any>;
}) {
  const [{ name }] = useAtom(metricsAtom);
  const valueAtom = focusAtom(metricsAtom, (optic) => optic.prop("value"));

  return (
    <div className="flex gap-1 items-center">
      <span className="text-right mr-2">{name}:</span>
      <NumbericInput statementAtom={valueAtom} />
    </div>
  );
}
