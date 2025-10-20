import React from 'react';

export default function NorthIndianChart({ ascendant, planets }) {
  /*
    ascendant: { sign: 'Aries' }
    planets: [{ name: 'Sun', sign: 'Taurus' }, ...]
  */

  // Map 12 houses in North Indian style order
  const houseOrder = [
    'Asc', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11', '12'
  ];

  // Simple mapping of planets to houses (demo)
  const housePlanets = {};
  houseOrder.forEach((house, i) => {
    housePlanets[house] = planets?.filter(p => p.house === i + 1) || [];
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-center mb-4">North Indian Lagna Chart</h2>
      
      <div className="grid grid-cols-3 gap-1 text-xs text-center">
        {/* Top Row */}
        <div className="border p-1">{housePlanets['12'].map(p => p.name).join(', ')}</div>
        <div className="border p-1">{housePlanets['1'].map(p => p.name).join(', ') || ascendant?.sign}</div>
        <div className="border p-1">{housePlanets['2'].map(p => p.name).join(', ')}</div>

        {/* Middle Row */}
        <div className="border p-1">{housePlanets['11'].map(p => p.name).join(', ')}</div>
        <div className="border p-1 h-20 flex items-center justify-center font-bold">
          {ascendant?.sign || 'Asc'}
        </div>
        <div className="border p-1">{housePlanets['3'].map(p => p.name).join(', ')}</div>

        {/* Bottom Row */}
        <div className="border p-1">{housePlanets['10'].map(p => p.name).join(', ')}</div>
        <div className="border p-1">{housePlanets['9'].map(p => p.name).join(', ')}</div>
        <div className="border p-1">{housePlanets['4'].map(p => p.name).join(', ')}</div>
      </div>

      {/* Optional: List all planets */}
      <div className="mt-4 text-left text-xs text-gray-700">
        <h3 className="font-semibold mb-1">Planets</h3>
        {planets?.length > 0 ? (
          planets.map((p, idx) => (
            <p key={idx}>
              {p.name} in {p.sign} {p.house ? `(House ${p.house})` : ''}
            </p>
          ))
        ) : (
          <p>No planets data yet</p>
        )}
      </div>
    </div>
  );
}
