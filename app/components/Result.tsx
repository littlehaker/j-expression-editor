import { useAtom } from "jotai";
import { resultAtom } from "../atoms";

export default function Result() {
  const [result] = useAtom(resultAtom);

  return (
    <div className="px-5">
      <pre>=> {JSON.stringify(result)}</pre>
    </div>
  );
}
