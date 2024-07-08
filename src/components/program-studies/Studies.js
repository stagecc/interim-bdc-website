import React from "react";
import { Table } from "./table";
import { Link } from "../link/link";
import { LoadingPanel } from "./loading-panel";
import { DescriptorPanel } from "./descriptor-panel";
import { useQuery } from "../../hooks/use-query";

export const Studies = ({ programKey }) => {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getStudiesList(programKey),
    queryKey: `study-${programKey}`,
  });

  if (programKey === null)
    return (
      <DescriptorPanel>
        Please select a program to view available studies.
      </DescriptorPanel>
    );

  if (isLoading || !data) return <LoadingPanel />;
  if (error)
    return (
      <DescriptorPanel>
        Something went wrong! Please reload the page.
      </DescriptorPanel>
    );

  return (
    <Table
      rows={data}
      columns={[
        {
          key: "name",
          headerCell: "Name",
        },
        {
          key: "id",
          headerCell: "DbGaP ID",
          width: "25%",
          render: ({ id, url }) => <Link to={url}>{id}</Link>,
        },
      ]}
    />
  );
};

// API
const getStudiesList = async (programName) => {
  const url = new URL("/search-api/search_program", process.env.GATSBY_DUG_SEARCH_API);
  url.searchParams.append("program_name", programName);

  const res = await fetch(url.href, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`);

  const data = await res.json();
  return data.result.map((original) => ({
    name: original.collection_name,
    id: original.collection_id,
    url: original.collection_action,
  }));
};
