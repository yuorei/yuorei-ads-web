export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="flex items-center space-x-2">
        <button className="p-2 bg-gray-200 rounded-md">広告作成</button>
        <button className="p-2 bg-gray-200 rounded-md">ログアウト</button>
      </div>
    </div>
  );
}
