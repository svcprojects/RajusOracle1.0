export default function NorthIndianChart({ ascSign, planets }) {
  return (
    <div className="border-2 border-lagna-blue relative aspect-square mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-lagna-blue font-semibold">
          Ascendant: {ascSign}
        </p>
      </div>
      <div className="absolute top-2 left-2 text-xs text-gray-600">
        {planets.map((p) => (
          <div key={p.name}>{p.name}: {p.sign}</div>
        ))}
      </div>
    </div>
  );
}
