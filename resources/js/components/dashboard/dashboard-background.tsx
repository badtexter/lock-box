export default function DashboardBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
                className="absolute top-[-150px] right-[-250px] h-[800px] w-[800px] rounded-full"
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
                className="absolute bottom-[-300px] left-[-350px] h-[900px] w-[900px] rounded-full"
                style={{
                    background: `
                        radial-gradient(
                            circle,
                            rgba(0,51,255,.10),
                            transparent 70%
                        )
                    `,
                }}
            />
        </div>
    );
}
