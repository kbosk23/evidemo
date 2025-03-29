import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BarChart, Users, BookOpen } from "lucide-react";

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
          <p className="text-gray-600">
            Please make sure your Hume API credentials are properly configured in the .env.local file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dashboard Navigation */}
      <div className="bg-white shadow-sm mt-4">
        <div className="container mx-auto px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/dashboard/learner" 
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <BookOpen className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <h2 className="font-semibold text-blue-900">Learner Dashboard</h2>
                <p className="text-sm text-blue-600">Track your learning progress</p>
              </div>
            </Link>

            <Link 
              href="/dashboard/instructor" 
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Users className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h2 className="font-semibold text-green-900">Instructor Dashboard</h2>
                <p className="text-sm text-green-600">Monitor learner performance</p>
              </div>
            </Link>

            <Link 
              href="/dashboard/analytics" 
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <BarChart className="h-6 w-6 text-purple-500 mr-3" />
              <div>
                <h2 className="font-semibold text-purple-900">Analytics Dashboard</h2>
                <p className="text-sm text-purple-600">View detailed insights</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="grow flex flex-col">
        <Chat accessToken={accessToken} />
      </div>
    </div>
  );
}
