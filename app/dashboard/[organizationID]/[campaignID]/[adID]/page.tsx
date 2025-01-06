import AdsGraph from "@/app/components/ChartAds";
import Link from "next/link";

export default function Page({
  params,
}: {
  params: { organizationID: string; campaignID: string; adID: string };
}) {
  // TODO: 操作できるようにする。クエリパラメータとか？
  let start = new Date(2000, 1, 1);
  let end = new Date(2099, 1, 1);
  return (
    <div>
      <AdsGraph adID={params.adID} start={start} end={end} />
      <Link href={`/dashboard/${params.organizationID}?adID=${params.adID}`}>
        戻る
      </Link>
    </div>
  );
}
