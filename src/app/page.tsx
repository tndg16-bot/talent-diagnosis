import DiagnosisForm from '@/components/DiagnosisForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] relative overflow-hidden text-gray-800 font-sans">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 flex flex-col items-center">
        <header className="text-center mb-16 space-y-4">
          <div className="inline-block px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full border border-gray-200 mb-4">
            <span className="text-xs font-medium text-gray-500 tracking-wider">PREMIUM TALENT DIAGNOSIS</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 pb-2">
            才能診断
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            古代の叡智と最新のアルゴリズムが、<br className="hidden md:block" />
            まだ見ぬあなたの可能性を解き明かします。
          </p>
        </header>

        <DiagnosisForm />

        <footer className="mt-20 text-center text-sm text-gray-400">
          <p>© 2026 Talent Diagnosis. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
