import "./App.css";
import { useQuery } from "react-query";
import axios from "axios";

function App() {
  const fetchPci = () => {
    return axios.get("https://api.bithumb.com/public/ticker/PCI_KRW");
  };

  const { isLoading, isError, data, error } = useQuery("pci", fetchPci, {
    retry: 0, // 실패시 재호출 횟수
    onSuccess: (res) => {
      // 성공시 호출
      console.log(res.data.data);
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="App">
      <h1>Paycoin</h1>
      <h2>현재가 : {data.data.data["closing_price"]}</h2>
      <h3>
        거래금액 :{" "}
        {parseInt(data.data.data["acc_trade_value_24H"]).toLocaleString()}원
      </h3>
      <h3>
        거래량: {parseInt(data.data.data["units_traded_24H"]).toLocaleString()}
        PCI
      </h3>
      <p>
        {new Date((data.data.data["date"] * 10) / 10 + 3240 * 10000)
          .toISOString()
          .replace("T", " ")
          .replace(/\..*/, "")}
      </p>
    </div>
  );
}

export default App;
