export default function NorthIndianChart({ planets, ascendant }) {
  return (
    <div className="border-2 border-gray-800 rounded-2xl shadow-lg p-6 text-center bg-white">
      <h2 className="text-xl font-bold mb-4">North Indian Lagna Chart</h2>
      <p className="text-sm text-gray-700">Ascendant: {ascendant?.sign || 'Loading...'}</p>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {planets && planets.length > 0 ? (
          planets.map((planet, i) => (
            <div key={i} className="border p-2 rounded-md bg-gray-100">
              <p className="text-xs font-medium">{planet.name}</p>
              <p className="text-xs">{planet.sign}</p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-sm text-gray-400">No planet data yet</p>
        )}
      </div>
    </div>
  );
}
