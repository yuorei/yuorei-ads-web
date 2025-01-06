import { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { clientAds } from "@/app/client";
import { GetAdRequest, GetAdResponse } from "@/app/gen/rpc/ads/v1/ads_pb";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdDetailProps {
  adId: string;
}

const AdDetail: React.FC<AdDetailProps> = ({ adId }) => {
  const [ad, setAd] = useState<GetAdResponse | null>(null);
  const pathname = usePathname();
  let organizationId = pathname.split("/")[2];

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await clientAds.getAd(
          { adId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAd(res);
      } catch (error) {
        console.error(`Failed to fetch ads for ad ${adId}:`, error);
        alert(error);
      }
    };

    fetchAd();
  }, [adId]);

  if (ad?.ad === undefined || ad === null) {
    return <Typography variant="body2">Loading...</Typography>;
  }

  return (
    <div>
      <List>
        <ListItem>
          <ListItemText primary={`Ad ID: ${ad.ad.adId}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Campaign ID: ${ad.ad.campaignId}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Ad Type: ${ad.ad.adType}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Ad updatedAt: ${ad.ad.updatedAt}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Ad OPEN: ${ad.ad.isOpen}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Ad Approva: ${ad.ad.isApproval}`} />
        </ListItem>
      </List>
      <Link
        href={`/dashboard/${organizationId}/${ad.ad.campaignId}/${ad.ad.adId}`}
      >
        <Button variant="contained">詳細を見る</Button>
      </Link>
    </div>
  );
};

export default AdDetail;
