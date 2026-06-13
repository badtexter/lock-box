import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen relative overflow-hidden bg-white dark:bg-[#00033D]">

            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="absolute rounded-full border"
                        style={{
                            width: `${350 + i * 140}px`,
                            height: `${350 + i * 140}px`,
                            right: '-350px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            borderColor: 'rgba(151,125,255,0.12)',
                        }}
                    />
                ))}

                <div
                    className="
                        absolute
                        right-[-300px]
                        top-1/2
                        -translate-y-1/2
                        w-[900px]
                        h-[900px]
                        rounded-full
                    "
                    style={{
                        background: `
                            radial-gradient(
                                circle,
                                rgba(151,125,255,.55),
                                rgba(0,51,255,.25),
                                transparent 70%
                            )
                        `,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6">

                <div
                    className="
                        w-full
                        max-w-md
                        rounded-3xl
                        p-8
                        backdrop-blur-xl
                    "
                    style={{
                        background: 'rgba(255,255,255,.06)',
                        border: '1px solid rgba(255,255,255,.08)',
                    }}
                >
                    <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                        {title}
                    </h1>
                    <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                        {description}
                    </p>

                    {children}
                    
                </div>

            </div>
        </div>
    );
}
