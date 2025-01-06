import React from "react";
// import DashboardHeader from "@/app/components/DashboardHeader";
import DashboardMenu from "@/app/components/DashboardMenu";
import Dashboard from "@/app/components/Dashboard";
export default function Page({
  params,
}: {
  params: { organizationID: string };
}) {
  return (
    <>
      {/* <DashboardHeader /> */}
      <div className="flex">
        <DashboardMenu organizationID={params.organizationID} />
      </div>
      <Dashboard
        organizationId={params.organizationID}
        offset={0}
        limit={100}
      />
    </>
  );
}
