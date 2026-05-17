import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4ade80", "#facc15", "#f87171"];

const Analytics = () => {
  const [data, setData] = useState<any>(null);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/analytics");
      setData(res.data);
      console.log("Analytics data:", data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!data) {
    return <div className="p-8">Loading analytics...</div>;
  }

  const statusData = [
    { name: "New", value: data.status.new },
    { name: "Qualified", value: data.status.qualified },
    { name: "Closed", value: data.status.closed },
  ];

  const sourceData = [
    { name: "Website", value: data.source.website },
    { name: "Instagram", value: data.source.instagram },
    { name: "LinkedIn", value: data.source.linkedin },
  ];

return (
  <div className="analytics-page">

    {/* HEADER */}
    <div className="analytics-header">

      <div>
        <h1 className="analytics-title">
          Dashboard Analytics
        </h1>

        <p className="analytics-subtitle">
          Visual insights of leads and performance
        </p>
      </div>

    </div>

    {/* STATS CARDS */}
    <div className="analytics-cards">

      <div className="analytics-card">
        <h3>Total Leads</h3>
        <h2>{data.totalLeads}</h2>
      </div>

      <div className="analytics-card">
        <h3>New Leads</h3>
        <h2>{data.status.new}</h2>
      </div>

      <div className="analytics-card">
        <h3>Qualified</h3>
        <h2>{data.status.qualified}</h2>
      </div>

      <div className="analytics-card">
        <h3>Closed</h3>
        <h2>{data.status.closed}</h2>
      </div>

    </div>

    {/* CHARTS */}
    <div className="charts-grid">

      {/* PIE CHART */}
      <div className="chart-card">

        <div className="chart-header">
          <h2>Lead Status</h2>
        </div>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <PieChart>

            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >

              {statusData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* BAR CHART */}
      <div className="chart-card">

        <div className="chart-header">
          <h2>Lead Sources</h2>
        </div>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={sourceData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#06b6d4"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>

  </div>
);
};

export default Analytics;