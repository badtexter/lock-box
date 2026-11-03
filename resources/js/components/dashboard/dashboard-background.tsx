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

            {/* Big, soft, slowly drifting glow centered behind the content */}
            <div
                className="absolute top-1/2 left-1/2 -mt-[35vw] -ml-[35vw] h-[70vw] w-[70vw] animate-[lb-float-1_22s_ease-in-out_infinite] rounded-full opacity-70 dark:opacity-40"
                style={{
                    background: `
                        radial-gradient(
                            circle,
                            rgba(151,125,255,.16),
                            rgba(0,51,255,.07) 45%,
                            transparent 72%
                        )
                    `,
                }}
            />

            <div
                className="absolute top-1/2 left-1/2 -mt-[27vw] -ml-[27vw] h-[54vw] w-[54vw] animate-[lb-float-2_26s_ease-in-out_infinite] rounded-full opacity-70 dark:opacity-30"
                style={{
                    background: `
                        radial-gradient(
                            circle,
                            rgba(0,51,255,.1),
                            transparent 70%
                        )
                    `,
                }}
            />
        </div>
    );
}
