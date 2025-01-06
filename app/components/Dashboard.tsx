"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import { ListCampaignByOrganizationIDResponse } from "@/app/gen/rpc/ads/v1/ads_pb";
import { clientAds } from "@/app/client";
import ListCampaigns from "./ListCampaigns";
import CampaignsDetail from "./CampaignDetail";
import AdDetail from "./AdDetail";
import { useSearchParams } from "next/navigation";

interface DashboardProps {
  organizationId: string;
  offset: number;
  limit: number;
}
const Dashboard: React.FC<DashboardProps> = ({
  organizationId,
  offset,
  limit,
}) => {
  const [campaigns, setCampaigns] =
    useState<ListCampaignByOrganizationIDResponse | null>(null);
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const adId = searchParams.get("adId");

  const handleFetchCampaigns = async () => {
    try {
      const res = await clientAds.listCampaignByOrganizationID(
        {
          organizationId: organizationId,
          offset: offset,
          limit: limit,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCampaigns(res);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
      alert(error);
    }
  };

  return (
    <div>
      <Button onClick={handleFetchCampaigns} variant="contained">
        キャンペーン一覧
      </Button>
      <ListCampaigns campaigns={campaigns?.campaigns || []} />
      {adId && (
        <div>
          <p>Ad ID: {adId}</p>
          <AdDetail adId={adId} />
        </div>
      )}
      {campaignId && <CampaignsDetail campaignId={campaignId} />}
    </div>
  );
};

export default Dashboard;
