import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListCampaignByOrganizationIDResponse } from "@/app/gen/rpc/ads/v1/ads_pb";
import AdList from "./AdList";

interface ListCampaignsProps {
  campaigns: ListCampaignByOrganizationIDResponse["campaigns"];
}

const ListCampaigns: React.FC<ListCampaignsProps> = ({ campaigns }) => {
  const [openCampaign, setOpenCampaign] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  // クエリパラメータからキャンペーンIDを取得
  const campaignId = searchParams.get("campaignId");

  useEffect(() => {
    if (campaignId && typeof campaignId === "string") {
      setOpenCampaign(campaignId);
    }
  }, [campaignId]);

  const handleClick = (campaignId: string) => {
    setOpenCampaign(openCampaign === campaignId ? null : campaignId);
    router.push(`?campaignId=${campaignId}`);
  };

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      {campaigns.map((campaign) => (
        <div key={campaign.campaignId}>
          <ListItem button onClick={() => handleClick(campaign.campaignId)}>
            <ListItemText primary={campaign.name} />
            {openCampaign === campaign.campaignId ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItem>

          <Collapse
            in={openCampaign === campaign.campaignId}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {/* <ListItem>
                <ListItemText primary={`キャンペーン名: ${campaign.name}`} />
              </ListItem> */}
              {/* <ListItem>
                <ListItemText primary={`User ID: ${campaign.userId}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Budget: ¥${campaign.budget}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Start Date: ${campaign.startDate}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`End Date: ${campaign.endDate}`} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Approval: ${
                    campaign.isApproval ? "Approved" : "Pending"
                  }`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Created At: ${campaign.createdAt}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Updated At: ${campaign.updatedAt}`} />
              </ListItem>
              {campaign.deletedAt && (
                <ListItem>
                  <ListItemText primary={`Deleted At: ${campaign.deletedAt}`} />
                </ListItem>
              )} */}
              <AdList campaignId={campaign.campaignId} />
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default ListCampaigns;
