export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Mi App</h1>
      <div className="space-x-4">
        <a
          href="/auth/login"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Iniciar sesión
        </a>
        <a
          href="/auth/register"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Registrarse
        </a>
      </div>
    </div>
  );
}
