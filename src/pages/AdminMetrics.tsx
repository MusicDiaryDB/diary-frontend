import { useEffect, useState } from "react";
import * as db from "../assets/services/diary/admin";
import "../assets/css/pages/AdminMetrics.css";

interface MetricResult {
  cache_hit_ratio?: string;
  total_connections?: number;
  count?: number;
  state?: string | null;
  database_size?: string;
  schema?: string;
  table?: string;
  row_count?: number;
  total_size?: string;
  query?: string;
  duration?: string;
}

interface Metric {
  name: string;
  result: {
    result: MetricResult[];
  };
}

const renderTable = function (
  data: MetricResult[],
  columns: (keyof MetricResult)[],
) {
  return (
    <table border={1} cellPadding="8" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col}>{row[col] ?? "N/A"}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const formatFunctionName = function (name: string): string {
  return name
    .replace(/^get/, "")
    .replace(/([A-Z])/g, " $1")
    .replace("D B", "DB")
    .trim();
};

const returnOrder = [
  "getDBSize",
  "getTableSizes",
  "getInfoRows",
  "getConns",
  "getConnsActivity",
  "getCacheHitRatio",
  "getLongRunningQueries",
];

function AdminMetrics() {
  const [results, setResults] = useState<Metric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setResults([]);
    const fetchInfo = async () => {
      try {
        const newResults: Metric[] = [];
        for (const [name, func] of Object.entries(db)) {
          if (typeof func !== "function") {
            continue;
          }
          const resp: any = await func();
          console.log("called: ", name, func, resp);
          newResults.push({ name, result: resp });
        }
        setResults(newResults);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();

    // refresh info every 30 seconds
    const intervalId = setInterval(() => {
      fetchInfo();
      console.log("Refreshed info at: ", Date.now());
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading)
    return (
      <div className="loading">
        <h2>Loading...</h2>
        <div className="loading-text">This can take some time.</div>
      </div>
    );
  if (error) return <div>An error occured: {error}</div>;

  return (
    <div className="resultsContainer">
      <h1 id="metricsHeader">Database Info and Performance Metrics</h1>
      {results
        .slice()
        .sort((a, b) => {
          const indexA = returnOrder.indexOf(a.name);
          const indexB = returnOrder.indexOf(b.name);

          return (
            (indexA === -1 ? Infinity : indexA) -
            (indexB === -1 ? Infinity : indexB)
          );
        })
        .map((metric) => (
          <div key={metric.name} className="metricSection">
            <h2 className="metricTitle">{formatFunctionName(metric.name)}</h2>
            <div className="metricContent">
              {metric.name === "getDBSize" && (
                <p>Database Size: {metric.result.result[0]?.database_size}</p>
              )}
              {metric.name === "getTableSizes" &&
                renderTable(metric.result.result, [
                  "schema",
                  "table",
                  "total_size",
                ])}
              {metric.name === "getInfoRows" &&
                renderTable(metric.result.result, [
                  "schema",
                  "table",
                  "row_count",
                ])}
              {metric.name === "getConns" && (
                <p>
                  Total Connections:{" "}
                  {metric.result.result[0]?.total_connections}
                </p>
              )}
              {metric.name === "getConnsActivity" &&
                renderTable(metric.result.result, ["state", "count"])}
              {metric.name === "getCacheHitRatio" && (
                <p>
                  Cache Hit Ratio: {metric.result.result[0]?.cache_hit_ratio}
                </p>
              )}
              {metric.name === "getLongRunningQueries" &&
                (metric.result.result.length === 0 ? (
                  <p className="noDataText">No long-running queries</p>
                ) : (
                  renderTable(metric.result.result, ["query", "duration"])
                ))}
              {metric.result.result.length === 0 &&
                metric.name !== "getLongRunningQueries" && (
                  <p className="noDataText">No data available.</p>
                )}
            </div>
          </div>
        ))}
    </div>
  );
}
export default AdminMetrics;
