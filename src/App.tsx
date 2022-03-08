import { createContext, useState } from "react";
import { Form } from "./Form";

type FetchContext = { client: WindowOrWorkerGlobalScope["fetch"] };
export const ClientContext = createContext<FetchContext>({} as FetchContext);

function App() {
  const [redditData, setRedditData] = useState<any>(null);

  return (
    <ClientContext.Provider value={{ client: window.fetch }}>
      <header className="App-header">
        <h1>Test React App</h1>
      </header>
      <main>
        <Form setRedditData={setRedditData} />
        <textarea value={redditData} readOnly rows={20}></textarea>
      </main>
    </ClientContext.Provider>
  );
}

export default App;
