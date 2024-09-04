import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Chart = () => {
  const tasks = useSelector((state) => state.todo?.globalTasks || []); // Ensure tasks is an array
  const [completedTasks, setCompletedTasks] = useState([]);
  const [importantTasks, setImportantTasks] = useState([]);

  useEffect(() => {
    // Filter tasks based on completion and importance
    const completed = tasks.filter((task) => task.isCompleted === true);
    const important = tasks.filter((task) => task.isImportant === true);
    setCompletedTasks(completed);
    setImportantTasks(important);
  }, [tasks]);

  // Inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const labelsStyle = {
    marginTop: "10px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: importantTasks.length, label: "Important" },
              { id: 1, value: completedTasks.length, label: "Completed" },
            ],
          },
        ]}
        width={300}
        height={150}
      />
      <div style={labelsStyle}>
        <p>
          <strong>Important Tasks:</strong> {importantTasks.length}
        </p>
        <p>
          <strong>Completed Tasks:</strong> {completedTasks.length}
        </p>
      </div>
    </div>
  );
};

export default Chart;
