import { WritableAtom, useAtom } from "jotai";
import { Metrics } from "../../typing";
import { focusAtom } from "jotai-optics";
import NumbericInput from "../NumericInput";

export default function MetricsItem({
  metricsAtom,
}: {
  metricsAtom: WritableAtom<Metrics, any, any>;
}) {
  const nameAtom = focusAtom(metricsAtom, (optic) => optic.prop("name"));
  const [name] = useAtom(nameAtom);
  const valueAtom = focusAtom(metricsAtom, (optic) => optic.prop("value"));

  return (
    <div>
      {/* <Input statementAtom={nameAtom} /> */}
      {name}:
      <NumbericInput statementAtom={valueAtom} />
    </div>
  );
}
