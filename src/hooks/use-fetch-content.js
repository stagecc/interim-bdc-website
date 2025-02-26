import { useState, useEffect } from "react";
import yaml from "js-yaml";

export const useFetchContent = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMarkdown = (file) => /\.(md|mdx)$/.test(file);
  const isYaml = (file) => /\.(yaml|yml)$/.test(file);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`http://raw.githubusercontent.com/stagecc/bdc-website-content/main/${path}`);
        if (!response.ok) throw new Error("Failed to fetch content.");

        const text = await response.text();

        if (isYaml(path)) {
          setData(yaml.load(text));
        } else {
          setData(text);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [path]);

  return { data, loading, error, isMarkdown: isMarkdown(path), isYaml: isYaml(path) };
};
