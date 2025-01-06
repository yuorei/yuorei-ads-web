import { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { clientAds } from "@/app/client";
import {
  GetCampaignRequest,
  GetCampaignResponse,
} from "@/app/gen/rpc/ads/v1/ads_pb";

interface CampaignDetailProps {
  campaignId: string;
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaignId }) => {
  const [campaign, setCampaign] = useState<GetCampaignResponse | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await clientAds.getCampaign(
          { campaignId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCampaign(res);
      } catch (error) {
        console.error(`Failed to fetch ads for campaign ${campaignId}:`, error);
        alert(error);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  if (campaign?.campaign === undefined || campaign === null) {
    return <Typography variant="body2">Loading...</Typography>;
  }

  return (
    <List>
      <ListItem>
        <ListItemText primary={`キャンペーン名: ${campaign.campaign.name}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`User ID: ${campaign.campaign.userId}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Budget: ¥${campaign.campaign.budget}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Start Date: ${campaign.campaign.startDate}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`End Date: ${campaign.campaign.endDate}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Status: ${campaign.campaign.isApproval}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Created At: ${campaign.campaign.createdAt}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Updated At: ${campaign.campaign.updatedAt}`} />
      </ListItem>
    </List>
  );
};

export default CampaignDetail;
