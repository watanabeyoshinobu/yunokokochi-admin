"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = (page: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users || []);
        if (data.meta) {
          setTotalPages(data.meta.total_pages);
        }
      })
      .catch((error) => {
        console.error("ユーザー情報の取得に失敗しました:", error);
      });
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("本当にこのユーザーを退会させますか？\n※この操作は取り消せません。");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("ユーザーを削除しました。");
        fetchUsers(currentPage);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 ユーザー管理</h2>

        {/* mb-8 を追加して、ページネーションボタンとの間に余白を作ります */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">          
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center">
        
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-50 mb-6 shadow-sm flex-shrink-0 border border-gray-100">
                {user.profile_image && user.profile_image.url ? (
                  <img
                    src={
                      user.profile_image.url.startsWith("http")
                        ? user.profile_image.url
                        : `${process.env.NEXT_PUBLIC_API_URL}${user.profile_image.url}`
                    }
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    NO IMG
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                アカウント名：{user.name || "ゲスト"}
              </h3>
              
              <p className="text-sm text-gray-500 w-full pb-6 mb-6 border-b border-gray-100">
                アドレス：{user.email}
              </p>

              <div className="mt-auto">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-8 py-2 rounded border border-red-500 text-red-500 hover:bg-red-50 text-sm font-bold transition-colors"
                >
                  退会
                </button>
              </div>

            </div>
          ))}

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

        {users.length === 0 && (
          <p className="text-gray-500 text-center py-8">ユーザー情報を読み込み中...</p>
        )}

      </main>
    </div>
  );
}