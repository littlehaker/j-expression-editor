"use client";

import { exprAtom } from "./atoms";

import Statement from "./components/Statement";
import MetricsEditor from "./components/Metrics/MetricsEditor";

import Divider from "@mui/joy/Divider";
import Result from "./components/Result";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Expression from "./components/Expression";

export default function Home() {
  return (
    <Stack spacing={2} className="p-5">
      <Typography level="h2">JExpression Editor Demo</Typography>
      <Divider />
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab>Editor</Tab>
          <Tab>Metrics</Tab>
          <Tab>JExpression</Tab>
        </TabList>
        <TabPanel value={0}>
          <Statement statementAtom={exprAtom} />
        </TabPanel>
        <TabPanel value={1}>
          <MetricsEditor />
        </TabPanel>
        <TabPanel value={2}>
          <Expression />
        </TabPanel>
      </Tabs>
      <Divider />
      <Result />
    </Stack>
  );
}
