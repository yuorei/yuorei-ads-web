import React from "react";
import RegisterPage from "@/app/components/RegisterPage";
export default function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  return (
    <>
      <RegisterPage organizationId={params.organizationId} />
    </>
  );
}
