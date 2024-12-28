import React from "react";
import DashboardHeader from "@/app/components/DashboardHeader";
import DashboardMenu from "@/app/components/DashboardMenu";
export default function Page({
  params,
}: {
  params: { organizationID: string };
}) {
  return (
    <>
      <DashboardHeader />
      <div className="flex">
        <DashboardMenu organizationID={params.organizationID} />
        <div className="p-4 bg-black">Content</div>
      </div>
      <div className="p-4 bg-gray-100">Content2</div>
    </>
  );
}
