export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
      {/* O Hero ASCII vai entrar aqui na Task 2.3 */}
      <div className="min-h-[400px] flex items-center justify-center border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl w-full max-w-4xl p-8 text-center bg-neutral-50 dark:bg-neutral-900/50">
        <h1 className="text-4xl font-bold tracking-tight">ABRAÃO ALVES</h1>
      </div>
      
      <p className="text-lg text-neutral-500 dark:text-neutral-400 text-center max-w-2xl mt-8">
        Building software that lasts. High-impact engineering, mentorship, and architecture since 2008.
      </p>
    </main>
  );
}
