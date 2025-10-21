import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import swe from "swisseph";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Helper Functions ---
function getZodiacSign(longitude) {
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  return signs[Math.floor(longitude / 30)];
}

async function geocode(place) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place)}&key=${process.env.OPENCAGE_KEY}`;
  const { data } = await axios.get(url);
  const result = data.results[0];
  return {
    lat: result.geometry.lat,
    lon: result.geometry.lng,
    formatted: result.formatted
  };
}

async function getTimezone(lat, lon) {
  const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.TIMEZONEDB_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`;
  const { data } = await axios.get(url);
  return data;
}

// --- Main Endpoint ---
app.post("/api/compute-chart", async (req, res) => {
  try {
    const { birthDate, birthTime, place } = req.body;
    const { lat, lon, formatted } = await geocode(place);
    const tz = await getTimezone(lat, lon);

    const localDate = new Date(`${birthDate}T${birthTime}`);
    const utcMillis = localDate.getTime() - tz.gmtOffset * 1000;
    const utcDate = new Date(utcMillis);

    const jd = swe.julday(
      utcDate.getUTCFullYear(),
      utcDate.getUTCMonth() + 1,
      utcDate.getUTCDate(),
      utcDate.getUTCHours() + utcDate.getUTCMinutes() / 60,
      swe.GREG_CAL
    );

    const flags = swe.FLG_SWIEPH;
    const houses = swe.houses(jd, lat, lon, "W");
    const asc = houses.ascendant;
    const ascSign = getZodiacSign(asc);

    const planetIds = [swe.SUN, swe.MOON, swe.MERCURY, swe.VENUS, swe.MARS, swe.JUPITER, swe.SATURN];
    const planetNames = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn"];
    const planets = planetIds.map((id, i) => {
      const result = swe.calc_ut(jd, id, flags);
      const longitude = result.longitude ?? result[0];
      return { name: planetNames[i], sign: getZodiacSign(longitude), degree: longitude.toFixed(2) };
    });

    // 🧠 AI Reading
    const chartSummary = `
      Ascendant: ${ascSign}
      Planets:
      ${planets.map(p => `${p.name} in ${p.sign} (${p.degree}°)`).join("\n")}
    `;

    const prompt = `
      You are a Vedic astrologer.
      Interpret this Lagna chart:
      ${chartSummary}
      Write a warm, insightful reading about personality, strengths, and life tendencies.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert Vedic astrologer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 600
    });

    const reading = completion.choices[0].message.content;

    res.json({
      ascendant: { degree: asc.toFixed(2), sign: ascSign },
      planets,
      location: { formatted, lat, lon },
      reading
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Raju's Oracle backend running on port ${PORT}`));
