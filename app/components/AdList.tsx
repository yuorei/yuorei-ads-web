import { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { clientAds } from "@/app/client";
import {
  ListAdsByCampaignIDRequest,
  ListAdsByCampaignIDResponse,
} from "@/app/gen/rpc/ads/v1/ads_pb";

interface AdListProps {
  campaignId: string;
}

const AdList: React.FC<AdListProps> = ({ campaignId }) => {
  const [ads, setAds] = useState<ListAdsByCampaignIDResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await clientAds.listAdsByCampaignID(
          { campaignId, offset: 0, limit: 10 },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAds(res);
      } catch (error) {
        console.error(`Failed to fetch ads for campaign ${campaignId}:`, error);
        alert(error);
      }
    };

    fetchAds();
  }, [campaignId]);

  const handleClick = (campaignId: string) => {
    // setOpenCampaign(openCampaign === campaignId ? null : campaignId);
    router.push(`?adId=${campaignId}`);
  };

  return (
    <List>
      {ads?.ads.map((ad) => (
        <ListItem key={ad.adId} button onClick={() => handleClick(ad.adId)}>
          <ListItemText primary={ad.adId} />
        </ListItem>
      ))}
      {!ads && (
        <Typography variant="body2">No ads found for this campaign.</Typography>
      )}
    </List>
  );
};

export default AdList;
