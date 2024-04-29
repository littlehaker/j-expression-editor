import { useAtom } from "jotai";
import { StatementProps } from "../typing";
import JoySelect from "@mui/joy/Select";
import JoyOption from "@mui/joy/Option";

export default function Select({
  statementAtom,
  options,
}: StatementProps & { options: { label: string; value: string }[] }) {
  const [value, setValue] = useAtom(statementAtom);
  function handleChange(_e: any, val: string) {
    setValue(val);
  }
  return (
    <JoySelect variant="outlined" onChange={handleChange} value={value}>
      {options.map(({ label, value }) => (
        <JoyOption value={value} key={value}>
          {label}
        </JoyOption>
      ))}
    </JoySelect>
  );
}
