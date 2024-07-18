import { StatementProps } from "@/app/typing";
import Statement from "../Statement";
import IconButton from "@mui/joy/IconButton";
import IconRemove from "@mui/icons-material/Remove";
import IconAdd from "@mui/icons-material/Add";

export default function BooleanItem({
  statementAtom,
  index,
  listLength,
  onAdd,
  onRemove,
}: StatementProps & {
  index: number;
  listLength: number;
  onAdd: (index: number) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="flex items-end">
      <Statement statementAtom={statementAtom} />
      <IconButton
        className="mx-1"
        variant="outlined"
        onClick={() => onAdd(index)}
      >
        <IconAdd />
      </IconButton>
      {listLength > 2 && (
        <IconButton
          className="mr-1"
          variant="outlined"
          onClick={() => onRemove(index)}
        >
          <IconRemove />
        </IconButton>
      )}
    </div>
  );
}
