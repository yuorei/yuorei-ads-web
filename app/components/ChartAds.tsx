"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, Typography } from "@mui/material";
import { clientAds } from "@/app/client";
import { Timestamp } from "@bufbuild/protobuf";
import { AdsViewedPerDaysResponse } from "@/app/gen/rpc/ads/v1/ads_pb";

// Chart.js のレジストリ
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AdsViewedPerDay {
  day: string;
  count: number;
}

interface AdsData {
  ad_id: string;
  ads_viewed_per_day: AdsViewedPerDay[];
}

interface AdsGraphProps {
  adID: string;
  start: Date;
  end: Date;
}

const AdsGraph: React.FC<AdsGraphProps> = ({ adID, start, end }) => {
  const [adsData, setAdsData] = useState<AdsViewedPerDaysResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let startTimestamp = Timestamp.fromDate(start);
        let endTimestamp = Timestamp.fromDate(end);

        const res = await clientAds.getDailyWatchCountAdVideo(
          {
            adId: adID,
            start: startTimestamp,
            end: endTimestamp,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAdsData(res);
      } catch (error) {
        console.error("Failed to fetch ads data:", error);
      }
    };

    fetchData();
  }, []);

  // データがまだ取得されていない場合の処理
  if (!adsData) {
    return <p>Loading...</p>;
  }

  // グラフ用データ設定
  const chartData = {
    labels: adsData.adsViewedPerDay.map((data) => data.day),
    datasets: [
      {
        label: "Ads Viewed",
        data: adsData.adsViewedPerDay.map((data) => data.count),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg">
        <CardContent>
          <Typography variant="h5" component="div" className="mb-4">
            Ads Viewed Per Day (2024-08-20 to 2024-08-24)
          </Typography>
          <div className="chart-container">
            <Line
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdsGraph;
