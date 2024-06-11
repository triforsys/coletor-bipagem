import { useNavigate } from 'react-router-dom';
export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col min-h-[100vh] font-poppins">
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Página não encontrada
            </h1>
            <p className="mx-auto max-w-[400px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Desculpe, não foi possível encontrar a página que você está
              procurando.
            </p>
          </div>
          <button
            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            onClick={handleGoBack}
          >
            Retornar à página anterior
          </button>
        </div>
      </main>
    </div>
  );
}
