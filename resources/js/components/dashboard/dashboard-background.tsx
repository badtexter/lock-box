export default function DashboardBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Full-bleed wash so the gradient always spans the whole screen, not just the corners */}
            <div
                className="absolute inset-0 opacity-80 dark:opacity-50"
                style={{
                    background: `
                        linear-gradient(
                            135deg,
                            rgba(0,51,255,.12) 0%,
                            rgba(151,125,255,.10) 35%,
                            rgba(151,125,255,.04) 60%,
                            transparent 85%
                        )
                    `,
                }}
            />

            <div
                className="absolute inset-0 opacity-40 dark:opacity-20"
                style={{
                    backgroundImage: `
                        radial-gradient(
                            rgba(151,125,255,0.35) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: '32px 32px',
                }}
            />

            <div
                className="absolute top-[-20vw] right-[-20vw] h-[60vw] w-[60vw] rounded-full"
                style={{
                    background: `
                        radial-gradient(
                            circle,
                            rgba(151,125,255,.18),
                            rgba(0,51,255,.08),
                            transparent 70%
                        )
                    `,
                }}
            />

            <div
                className="absolute bottom-[-25vw] left-[-25vw] h-[70vw] w-[70vw] rounded-full"
                style={{
                    background: `
                        radial-gradient(
                            circle,
                            rgba(0,51,255,.12),
                            transparent 70%
                        )
                    `,
                }}
            />
        </div>
    );
}
