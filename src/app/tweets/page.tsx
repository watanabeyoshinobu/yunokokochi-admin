"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function Tweets() {
  const [tweets, setTweets] = useState<any[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTweets = (page: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tweets?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setTweets(data.tweets || []);
        if (data.meta) {
          setTotalPages(data.meta.total_pages);
        }
      })
      .catch((error) => {
        console.error("つぶやきの取得に失敗しました:", error);
      });
  };

  useEffect(() => {
    fetchTweets(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("本当にこのつぶやきを削除しますか？");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tweets/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("つぶやきを削除しました。");
        fetchTweets(currentPage);
      } else {
        alert("削除に失敗しました。");
      }
    } catch (error) {
      console.error("エラー:", error);
      alert("通信エラーが発生しました。");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🐦 つぶやき管理 (公式温泉ページ)</h2>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-bold text-gray-600">投稿日</th>
                <th className="p-4 font-bold text-gray-600">投稿場所</th>
                <th className="p-4 font-bold text-gray-600">投稿者</th>
                <th className="p-4 font-bold text-gray-600">つぶやき内容</th>
                <th className="p-4 font-bold text-gray-600 text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {tweets.map((tweet) => (
                <tr key={tweet.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(tweet.created_at).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="p-4 text-sm font-semibold text-blue-600">
                    {tweet.action_name || "不明"}
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {tweet.user?.name || "退会済みユーザー"}
                  </td>
                  <td className="p-4 text-gray-600 text-sm">
                    {tweet.tweet}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(tweet.id)}
                      className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tweets.length === 0 && (
            <p className="text-gray-500 text-center py-8">つぶやきはありません。</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              前へ
            </button>
            
            <span className="text-gray-600 font-medium">
              {currentPage} / {totalPages} ページ
            </span>
            
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              次へ
            </button>
          </div>
        )}
      </main>
    </div>
  );
}