"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

type Review = {
  id: number;
  author: string;
  content: string;
  rating: number;
};

export default function Home() {

  const [likes, setLikes] = useState(200);
  const stats = {
    newReviews: 10,
    totalUsers: 345
  };


  const recentReviews: Review[] = [
    { id: 3, author: "山田太郎", content: "ここのスーパー銭湯の温泉はとっても良かったです", rating: 5 },
    { id: 2, author: "酒井純一", content: "ここのスーパー銭湯は少し小さめだけど満足いく温泉でした。", rating: 4 },
    { id: 1, author: "鈴木千尋", content: "ここの温泉が良かったので、忘れられない旅になりました。", rating: 5 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">ダッシュボード</h2>
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-500">本日のいいね獲得数</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{likes} <span className="test-sm font-normal">件</span></p>
              <button
                onClick={() => setLikes(likes + 1)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded"
              >
                いいね追加
              </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-500">新規口コミ</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.newReviews} <span className="test-sm font-normal">件</span></p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-500">総ユーザー数</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers.toLocaleString()} <span className="test-sm font-normal">人</span></p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">最新の口コミ</h3>
          <div className="space-y-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-gray-700">{review.author}</span>
                  <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                </div>
                <p className="text-gray-600">{review.content}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
