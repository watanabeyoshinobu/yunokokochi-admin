"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = (page: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        if (data.meta) {
          setTotalPages(data.meta.total_pages);
        }
      })
      .catch((error) => {
        console.error("クチコミ情報の取得に失敗しました:", error);
      });
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("本当にこのクチコミを削除しますか？");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("クチコミを削除しました。");
        fetchBlogs(currentPage);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">💬 クチコミ管理</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">    
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
              {blog.image && blog.image.url ? (
                <div className="w-full h-48">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${blog.image.url}`}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  NO IMAGE
                </div>
              )}

              <div className="p-5 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(blog.created_at).toLocaleDateString('ja-JP').replace(/\//g, '.')}
                </p>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {blog.body}
                </p>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-600 font-medium">
                    👤 {blog.name || "ゲスト"}
                  </span>
                  
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 flex items-center">
                      公開中
                    </span>

                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    >
                      削除
                    </button>
                  </div>
                </div>

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

        {blogs.length === 0 && (
          <p className="text-gray-500 text-center py-8">クチコミ情報を読み込み中、または投稿がありません。</p>
        )}

      </main>
    </div>
  );
}