export default function Controls({
  positions,
  current,
  onChange,
  playing,
  onTogglePlay,
  speed,
  onSpeedChange,
}) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 20px 24px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        alignItems: 'center',
      }}
    >
      {/* Position buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
        }}
      >
        {positions.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            style={{
              padding: '10px 16px',
              borderRadius: 999,
              background: current === p.id ? '#ff4d8d' : 'rgba(255,255,255,0.1)',
              color: current === p.id ? '#fff' : '#ddd',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s',
              border: current === p.id ? '1px solid #ff7aad' : '1px solid transparent',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Play + Speed */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={onTogglePlay}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: playing ? '#ff4d8d' : 'rgba(255,255,255,0.15)',
            color: '#fff',
            fontSize: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {playing ? '⏸' : '▶'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, opacity: 0.7 }}>Velocidade</span>
          <input
            type="range"
            min={0.3}
            max={2.5}
            step={0.1}
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            style={{ width: 100, accentColor: '#ff4d8d' }}
          />
          <span style={{ fontSize: 13, minWidth: 32 }}>{speed.toFixed(1)}x</span>
        </div>
      </div>

      <p style={{ fontSize: 12, opacity: 0.45, marginTop: 4 }}>
        Modelos placeholder • Substitua por .glb reais depois
      </p>
    </div>
  )
}