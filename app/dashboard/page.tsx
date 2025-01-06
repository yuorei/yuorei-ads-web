"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clientOrganization } from "@/app/client";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await clientOrganization.getOrganizationByUserID(
          { userId: "" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        router.push(
          `/dashboard/${res.organization?.organizationId.toString()}` || ""
        );
      } catch (error) {
        alert(error);
      }
    };

    fetchCampaign();
  }, [router]);

  return null;
};

export default DashboardPage;
