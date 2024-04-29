import { splitAtom } from "jotai/utils";
import { metricsAtom } from "../../atoms";
import MetricsItem from "./MetricsItem";
import { useAtom } from "jotai";
import { useMemo } from "react";

export default function MetricsEditor() {
  const metricsListAtomsAtom = useMemo(
    () => splitAtom(metricsAtom),
    [metricsAtom]
  );
  const [metricsListAtoms] = useAtom(metricsListAtomsAtom);

  return (
    <div className="flex flex-col gap-2">
      {metricsListAtoms.map((item, index) => (
        <MetricsItem metricsAtom={item} key={index} />
      ))}
    </div>
  );
}
