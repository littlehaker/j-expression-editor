import { metricsAtom } from "@/app/atoms";
import { StatementProps } from "@/app/typing";
import { useAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import Select from "../Select";

export default function Metrics({ statementAtom }: StatementProps) {
  const [metricsList] = useAtom(metricsAtom);
  const metricsNameAtom = focusAtom(statementAtom, (optic) => optic.at(1));
  return (
    <Select
      statementAtom={metricsNameAtom}
      options={metricsList.map(({ name, value }) => ({
        label: `${name} ( ${value} )`,
        value: name,
      }))}
    />
  );
}
