import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import WorkoutLogger from "./pages/WorkoutLogger";
import CombatTimer from "./pages/CombatTimer";
import PRVault from "./pages/PRVault";
import BodyMetrics from "./pages/BodyMetrics";
import Missions from "./pages/Missions";
import useBaseCampData from "./hooks/useBaseCampData";

export default function App() {
  const [data, setData] = useBaseCampData();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard data={data} />} />
        <Route path="log" element={<WorkoutLogger data={data} setData={setData} />} />
        <Route path="timer" element={<CombatTimer data={data} setData={setData} />} />
        <Route path="prs" element={<PRVault data={data} />} />
        <Route path="body" element={<BodyMetrics data={data} setData={setData} />} />
        <Route path="missions" element={<Missions data={data} setData={setData} />} />
      </Route>
    </Routes>
  );
}
