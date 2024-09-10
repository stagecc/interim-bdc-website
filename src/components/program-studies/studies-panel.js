import React from "react";
import { Table } from "./base-table";
import { Link } from "../link/link";
import { LoadingPanel } from "./loading-panel";
import { DescriptorPanel } from "./descriptor-panel";
import { useQuery } from "../../hooks";

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

  if (isLoading) return <LoadingPanel />;
  if (error) {
    console.error(`Error fetching studies for program ${programKey}. Original error message: ${error}`)
    return (
      <DescriptorPanel>
        Something went wrong! Please reload the page.
      </DescriptorPanel>
    );
  }

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
          headerCell: "dbGaP Accession",
          width: "25%",
          render: ({ id, url }) => url !== '' ? <Link to={url}>{id}</Link> : id,
        },
      ]}
    />
  );
};

// API
const getStudiesList = async (programName) => {
  const url = new URL(
    "/search-api/search_program",
    process.env.GATSBY_DUG_SEARCH_API ?? "https://search-dev.biodatacatalyst.renci.org"
  );
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
