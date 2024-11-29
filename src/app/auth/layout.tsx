export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Autenticación</h1>
        </header>
        <main className="w-full max-w-md">{children}</main>
      </div>
    );
  }
  