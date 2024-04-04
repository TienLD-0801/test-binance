import { Table, TableProps } from "antd";
import { useState, useEffect } from "react";
import _ from "lodash";
import {
  HASH_MAP_COIN,
  HASH_MAP_COIN_ICON,
  MAX_COIN,
  METHOD,
  SYMBOLS,
} from "@/constants/constant";
import { binanceCryptoIcons } from "binance-icons";

const Index = () => {
  const [result, setResult] = useState<any>([]);

  useEffect(() => {
    const ws = new WebSocket(`${process.env.WS_URL}/${process.env.API_KEY}`);
    const params = {
      method: METHOD,
      params: SYMBOLS.map((symbol) => `${symbol}@ticker`),
    };

    const monitorPrice = () => {
      ws.onopen = () => {
        console.log("socket connect successfully");
        ws.send(JSON.stringify(params));
      };

      ws.onmessage = (event: any) => {
        const dataRealtime = JSON.parse(event.data);

        const dataConvert = {
          key: dataRealtime.s,
          pair: dataRealtime.s,
          price: dataRealtime.c,
          percentChange: dataRealtime.P,
          volumeCoin: dataRealtime.v,
          volumeUSD: dataRealtime.q,
        };

        if (dataRealtime.id === null) return;

        setResult((prev: any) => {
          const foundIndex = prev.findIndex(
            (item: any) => item.pair === dataConvert.pair
          );

          if (foundIndex !== -1) {
            const updatedData = prev.map((item: any, index: any) => {
              if (index === foundIndex) {
                return dataConvert;
              }
              return item;
            });
            return updatedData;
          } else {
            return [...prev, dataConvert];
          }
        });
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
      };
    };

    monitorPrice();

    return () => ws.close();
  }, []);

  const columns: TableProps<any>["columns"] = [
    {
      title: "Pair",
      dataIndex: "pair",
      key: "pair",
      render(value) {
        const mappingValue = HASH_MAP_COIN.get(value);
        const mappingValueIcon = HASH_MAP_COIN_ICON.get(value) || "";
        const icon = binanceCryptoIcons.get(mappingValueIcon);

        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: icon! }} />
            <div style={{ fontSize: 16, lineHeight: 2 }}>{mappingValue}</div>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render(value) {
        value = ((value / 100) * 100).toFixed(2);
        return <div style={{ fontWeight: "500" }}>{value}</div>;
      },
    },
    {
      title: "24h Change",
      dataIndex: "percentChange",
      key: "percentChange",
      render(value) {
        let color = "black";
        value = ((value / 100) * 100).toFixed(2);
        if (value.includes("-")) {
          color = "red";
        } else {
          value = "+" + value;
          color = "green";
        }

        return <div style={{ color, fontWeight: "800" }}>{`${value}%`}</div>;
      },
    },
    {
      title: "24h Volume (coin)",
      dataIndex: "volumeCoin",
      key: "volumeCoin",
      render(value) {
        value = (value / 1000).toFixed(3);
        return <div style={{ fontWeight: "600" }}>{value}</div>;
      },
    },
    {
      title: "24h Volume (USD)",
      dataIndex: "volumeUSD",
      key: "volumeUSD",
      render(value) {
        value = (value / 100000000).toLocaleString("vi-VN", {
          maximumFractionDigits: 3,
        });

        return <div style={{ fontWeight: "600" }}>{"$" + value}</div>;
      },
    },
  ];

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 50px",
      }}
    >
      <Table
        style={{ width: "100%" }}
        columns={columns}
        dataSource={result.length === MAX_COIN ? result : []}
        rowKey={(record) => record.key}
        size="large"
        virtual={true}
        loading={result.length === MAX_COIN ? false : true}
        scroll={{ y: 1000, x: 1000 }}
      />
    </main>
  );
};

export default Index;
