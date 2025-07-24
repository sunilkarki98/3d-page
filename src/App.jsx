import { useState } from "react";
import Loader from "./components/ui/Loader";
import HeroWrapper from "./components/layout/HeroWrapper";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!loading && (
        <main className="pt-0 overflow-y-hidden">
         <HeroWrapper />
        </main>
      )}
    </>
  );
}

export default App;
