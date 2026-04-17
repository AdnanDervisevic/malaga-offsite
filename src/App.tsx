import { useState } from 'react';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <main
      style={{
        fontFamily: 'system-ui, sans-serif',
        maxWidth: 640,
        margin: '10vh auto',
        padding: '0 1.5rem',
        lineHeight: 1.5,
      }}
    >
      <h1>Pet Concierge</h1>
      <p>
        Welcome. This is an empty starter. Read <code>SPEC.md</code> to see what to build, then{' '}
        <code>GETTING-STARTED.md</code> for loose entry points.
      </p>
      <p>
        Edit <code>src/App.tsx</code> and save to hot-reload.
      </p>
      <section style={{ marginTop: '2rem' }}>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Pet the dog
        </button>
        <p aria-live="polite" style={{ marginTop: '0.75rem' }}>
          Dog petted <strong data-testid="pet-count">{count}</strong> times.
        </p>
      </section>
    </main>
  );
}
