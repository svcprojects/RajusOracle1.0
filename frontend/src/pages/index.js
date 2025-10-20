import { useState } from "react";
import axios from "axios";
import NorthIndianChart from "../components/NorthIndianChart";

export default function Home() {
  const [form, setForm] = useState({ birthDate: "", birthTime: "", place: "" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/compute-chart`,
      form
    );
    setData(res.data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-white to-yellow-50 py-12 px-4">
      <h1 className="text-4xl font-bold text-lagna-blue mb-8">
        🔮 Raju’s Oracle 1.0
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <input type="date" name="birthDate" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="time" name="birthTime" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="place" onChange={handleChange} placeholder="e.g. Delhi, India" className="w-full border p-2 rounded" required />

        <button type="submit" className="w-full bg-lagna-blue text-white py-2 rounded">
          {loading ? "Loading..." : "Get Reading"}
        </button>
      </form>

      {data && (
        <div className="mt-10 w-full max-w-2xl bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Ascendant: {data.ascendant.sign}
          </h2>
          <NorthIndianChart ascSign={data.ascendant.sign} planets={data.planets} />
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Your AI Reading</h3>
            <p className="text-gray-700 whitespace-pre-line">{data.reading}</p>
          </div>
        </div>
      )}
    </div>
  );
}
