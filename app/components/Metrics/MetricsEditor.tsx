import { splitAtom } from "jotai/utils";
import { metricsAtom } from "../../atoms";
import MetricsItem from "./MetricsItem";
import { useAtom } from "jotai";

export default function MetricsEditor() {
  const metricsListAtomsAtom = splitAtom(metricsAtom);
  const [metricsListAtoms] = useAtom(metricsListAtomsAtom);

  return (
    <div>
      Metrics
      {metricsListAtoms.map((item, index) => (
        <MetricsItem metricsAtom={item} key={index} />
      ))}
    </div>
  );
}
