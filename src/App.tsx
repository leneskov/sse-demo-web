import React from 'react';
import './App.css';

interface Stock {
  name: string;
  price: number;
}

interface StockTransaction {
  user: string;
  stock: Stock;
  when: Date;
}

const useEventSource = (url: string) => {
  const [data, updateData] = React.useState<StockTransaction>();
  React.useEffect(() => {
    const source = new EventSource(url);
    source.onmessage = function logEvents(event) {
      updateData(JSON.parse(event.data));
    }
  }, [url]);

  return data;
}

function App() {

  const data = useEventSource("http://localhost:8080/stock/transaction");
  if(!data) {
    return (
      <div className="App">
      <p>SSE-demo</p>
    </div>
    );
  }

  return (
    <div className="App">
      <p>SSE-demo</p>
    <p>Latest stock update for user {data.user} as of {data.when}</p>
    <p>Name of stock: {data.stock.name}, price: {data.stock.price}</p>
    </div>
  );
}

export default App;
