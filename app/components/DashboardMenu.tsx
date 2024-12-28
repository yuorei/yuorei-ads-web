import Link from "next/link";

export default function DashboardMenu({
  organizationID,
}: {
  organizationID: string;
}) {
  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="flex flex-col items-center space-y-4">
        <img
          className="w-16 h-16 rounded-full"
          src=""
          alt="User"
        />
        <h1 className="text-xl font-semibold text-gray-900">John Doe</h1>
        <p className="text-sm text-gray-500">a</p>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Link href={`/register/campaign/${organizationID}`}>
          <button className="p-2 bg-gray-200 rounded-md">
            キャンペーン作成
          </button>
        </Link>
        <Link href={`/register/ad/${organizationID}`}>
          <button className="p-2 bg-gray-200 rounded-md">広告作成</button>
        </Link>
        <button className="p-2 bg-gray-200 rounded-md">ログアウト</button>
      </div>
    </div>
  );
}
