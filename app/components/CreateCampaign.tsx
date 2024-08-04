"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import {
  CreateCampaignRequest,
  CreateCampaignResponse,
} from "@/app/gen/rpc/ads/v1/ads_pb";
import { clientAds } from "@/app/client";

function CreateCampaign() {
  const [campaign, setCampaign] = useState<CreateCampaignResponse | null>(null);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState<number | string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreateCampaign = async () => {
    const res = await clientAds.createCampaign(
      new CreateCampaignRequest({
        name,
        budget: typeof budget === "number" ? budget : parseInt(budget),
        startDate,
        endDate,
      })
    );
    setCampaign(res);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center">
          Create Campaign
        </Typography>
      </Box>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Campaign Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Budget"
              variant="outlined"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Start Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="End Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCreateCampaign}
            >
              Create Campaign
            </Button>
          </Grid>
        </Grid>
      </Box>
      {campaign && (
        <Box mt={4}>
          <Typography variant="h6" align="center">
            Campaign ID: {campaign.campaignId}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default CreateCampaign;
