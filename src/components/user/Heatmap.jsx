import HeatMap from "@uiw/react-heat-map";
import { useEffect, useMemo, useState } from "react";

const generateActivityData = (startDate, endDate) => {
  const data = [];

  let current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const count = Math.floor(Math.random() * 50);
    data.push({ date: current.toISOString().split("T")[0], count: count });
    current.setDate(current.getDate() + 1);
  }

  return data;
};

const generatePanelColor = (maxCount) => {
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenShade = Math.floor((i / maxCount) * 255);
    colors[i] = `rgb(0, ${greenShade}, 0)`;
  }
  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});
  const [range, setRange] = useState("year");

  const { startDate, endDate } = useMemo(() => {
    const end = new Date("2025-12-31");
    const start =
      range === "year"
        ? new Date("2025-01-01")
        : new Date(end.getFullYear(), end.getMonth() - 5, 1);

    return { startDate: start, endDate: end };
  }, [range]);

  useEffect(() => {
    try {
      const fetchActivityData = async () => {
        const startDate = "2025-1-1";
        const endDate = "2025-12-30";
        const data = generateActivityData(startDate, endDate);
        const maxCount = Math.max(...data.map((d) => d.count));

        setActivityData(data);
        setPanelColors(generatePanelColor(maxCount));
      };
      fetchActivityData();
    } catch (error) {
      console.error(error);
    }
  }, [startDate, endDate]);

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <h4>Recent Contributions</h4>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setRange("6months")}>Last 6 Months</button>
        <button onClick={() => setRange("year")} style={{ marginLeft: "10px" }}>
          Full Year
        </button>
      </div>
      <HeatMap
        value={activityData}
        panelColors={panelColors}
        style={{ minWidth: "960px", height: "200px", color: "white" }}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        rectSize={14}
        space={3}
        rectProps={{ rx: 2 }}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default HeatMapProfile;
