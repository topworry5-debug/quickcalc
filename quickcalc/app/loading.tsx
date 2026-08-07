import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <div className="min-h-screen bg-base text-ink font-sans transition-colors flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pt-12 pb-16 w-full flex-grow animate-pulse">
        {/* Hero Loading Skeleton */}
        <div className="space-y-4 max-w-2xl mx-auto text-center mb-12">
          <div className="w-48 h-6 bg-surface-muted rounded-full mx-auto" />
          <div className="w-3/4 h-10 bg-surface-muted rounded-2xl mx-auto" />
          <div className="w-full h-12 bg-surface-muted rounded-2xl mx-auto" />
        </div>

        {/* Card Grid Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-base-card border border-surface-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-muted" />
                <div className="w-1/2 h-6 bg-surface-muted rounded-lg" />
              </div>
              <div className="w-full h-4 bg-surface-muted rounded-lg" />
              <div className="w-2/3 h-4 bg-surface-muted rounded-lg" />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
