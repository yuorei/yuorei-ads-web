"use client";

import CreateCampaign from "@/app/components/CreateCampaign";

export default function Page({
  params,
}: {
  params: { organizationID: string };
}) {
  return (
    <div>
      <p>Create a new campaign {params.organizationID}</p>
      <CreateCampaign />
    </div>
  );
}
