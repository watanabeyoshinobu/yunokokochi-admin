"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const [data, setData] = useState({
    today_favorites_count: 0,
    total_blogs_count: 0,
    total_users_count: 0,
    latest_blogs: []
  });
  const [loading, setLoading] = useState(true);

  // 画面が開いた時にRailsのダッシュボードAPIへデータを取りに行く
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`)
      .then((response) => response.json())
      .then((dashboardData) => {
        setData(dashboardData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("ダッシュボード情報の取得に失敗しました:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 ダッシュボード</h2>

        {loading ? (
          <p className="text-gray-500">データを読み込み中...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-2">本日のいいね獲得数</p>
                <p className="text-3xl font-bold text-blue-600">
                  {data.today_favorites_count} <span className="text-base font-normal text-gray-500">件</span>
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-2">クチコミ総数</p>
                <p className="text-3xl font-bold text-gray-800">
                  {data.total_blogs_count} <span className="text-base font-normal text-gray-500">件</span>
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-2">総ユーザー数</p>
                <p className="text-3xl font-bold text-gray-800">
                  {data.total_users_count} <span className="text-base font-normal text-gray-500">人</span>
                </p>
              </div>
              
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6">最新の口コミ</h3>
              
              <div className="space-y-6">
                {data.latest_blogs.length > 0 ? (
                  data.latest_blogs.map((blog: any, index: number) => (
                    <div 
                      key={blog.id} 

                      className={`${index !== data.latest_blogs.length - 1 ? "border-b border-gray-200 pb-6" : ""}`}
                    >
                      <p className="font-bold text-gray-800 mb-2">{blog.name || "ゲスト"}</p>
                      <p className="text-gray-600 text-sm line-clamp-2">{blog.body}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">まだクチコミが投稿されていません。</p>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}