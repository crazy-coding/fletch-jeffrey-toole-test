import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

function TrafficTable(props: { data: any }) {
  const initial = localStorage.getItem("detail");
  const [detail, setDetail] = useState<any>(
    initial === "null" ? null : initial
  );

  useEffect(() => localStorage.setItem("detail", detail), [detail]);

  function goDetail(ip: string) {
    setDetail(ip);
  }

  const pData = props.data
    .split("\n")
    .map((str: string) => {
      try {
        return JSON.parse(str);
      } catch {
        return undefined;
      }
    })
    .filter((d: any) => d);

  const dData = pData.filter(
    (row: any) =>
      row.result["All_Traffic.dest"] === detail ||
      row.result["All_Traffic.src"] === detail
  );

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          {detail && (
            <div className="flex justify-between text-lg mb-2 px-4">
              <button
                className="text-sm hover:font-bold"
                onClick={() => setDetail(null)}
              >
                {"<"} Back
              </button>
              <div className="text-black dark:text-white">{detail}</div>
              <span />
            </div>
          )}
          <div className="overflow-hidden">
            <table className="min-w-full text-gray-900 dark:text-gray-300">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-bold px-6 py-2 text-left"
                  >
                    Destination
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-bold px-6 py-2 text-left"
                  >
                    Source
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-bold px-6 py-2 text-left"
                  >
                    Sum Bytes
                  </th>
                </tr>
              </thead>
              <tbody>
                {(detail ? dData : pData).map((row: any) => (
                  <tr className="border-b">
                    <td
                      className={`text-sm px-6 py-2 whitespace-nowrap cursor-pointer hover:font-bold ${
                        detail === row.result["All_Traffic.dest"]
                          ? "font-bold"
                          : ""
                      }`}
                      onClick={() => goDetail(row.result["All_Traffic.dest"])}
                    >
                      {row.result["All_Traffic.dest"]}
                    </td>
                    <td
                      className={`text-sm px-6 py-2 whitespace-nowrap cursor-pointer hover:font-bold ${
                        detail === row.result["All_Traffic.src"]
                          ? "font-bold"
                          : ""
                      }`}
                      onClick={() => goDetail(row.result["All_Traffic.src"])}
                    >
                      {row.result["All_Traffic.src"]}
                    </td>
                    <td className="text-sm px-6 py-2 whitespace-nowrap">
                      {row.result["sum_bytes"]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  // ssr

  const { data, error } = useSWR("/api/traffic", fetcher);

  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading...</div>;

  if (data) return <TrafficTable data={data} />;
}
