interface TimeMarkersProps {
  markerCount: number;
}

function TimeMarkers({ markerCount }: TimeMarkersProps) {
  return (
    <div className="h-6 border-b border-gray-700">
      {[...Array(markerCount)].map((_, i) => (
        <div
          key={i}
          className="absolute text-xs text-gray-400"
          style={{ left: `${i * 100}px` }}
        >
          {i}:00
        </div>
      ))}
    </div>
  );
}
export { TimeMarkers };
