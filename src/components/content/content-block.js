import React, { Suspense } from "react";
import { useFetchContent } from "../../hooks";
import { LoadingSpinner } from "../loading";
import ReactMarkdown from "react-markdown";

export const ContentBlock = ({ path }) => {
  const { data, loading, error, isMarkdown } = useFetchContent(path);

  if (loading) return <LoadingSpinner height="400px" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Suspense fallback={<div>Fetching content...</div>}>
      {isMarkdown ? (
        <ReactMarkdown>{data}</ReactMarkdown>
      ) : (
        <div style={{ whiteSpace: "pre-wrap" }}>{data}</div>
      )}
    </Suspense>
  );
};
