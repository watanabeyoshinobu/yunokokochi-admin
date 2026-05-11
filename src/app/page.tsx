"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const [data, setData] = useState({
    today_favorites_count: 0,
    total_blogs_count: 0,
    total_users_count: 0,
    latest_blogs: [] as any[],    // 復活
    latest_comments: [] as any[],
    latest_tweets: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  // 口コミ用のページネーションState（復活）
  const [blogPage, setBlogPage] = useState(1);
  const [totalBlogPages, setTotalBlogPages] = useState(1);

  // コメント用のページネーションState
  const [commentPage, setCommentPage] = useState(1);
  const [totalCommentPages, setTotalCommentPages] = useState(1);

  // つぶやき用のページネーションState
  const [tweetPage, setTweetPage] = useState(1);
  const [totalTweetPages, setTotalTweetPages] = useState(1);

  // 3つのページ番号をURLにくっつけて送信する
  const fetchDashboardData = (bPage: number, cPage: number, tPage: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard?blog_page=${bPage}&comment_page=${cPage}&tweet_page=${tPage}`)
      .then((response) => response.json())
      .then((dashboardData) => {
        setData({
          today_favorites_count: dashboardData.today_favorites_count || 0,
          total_blogs_count: dashboardData.total_blogs_count || 0,
          total_users_count: dashboardData.total_users_count || 0,
          latest_blogs: dashboardData.latest_blogs || [],       // 復活
          latest_comments: dashboardData.latest_comments || [],
          latest_tweets: dashboardData.latest_tweets || []
        });
        
        if (dashboardData.blog_meta) setTotalBlogPages(dashboardData.blog_meta.total_pages); // 復活
        if (dashboardData.comment_meta) setTotalCommentPages(dashboardData.comment_meta.total_pages);
        if (dashboardData.tweet_meta) setTotalTweetPages(dashboardData.tweet_meta.total_pages);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("ダッシュボード情報の取得に失敗しました:", error);
        setLoading(false);
      });
  };

  // いずれかのページ番号が変わるたびにデータを再取得
  useEffect(() => {
    fetchDashboardData(blogPage, commentPage, tweetPage);
  }, [blogPage, commentPage, tweetPage]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 ダッシュボード</h2>

        {loading ? (
          <p className="text-gray-500">データを読み込み中...</p>
        ) : (
          <>
            {/* ====== 1段目：3つの統計カード ====== */}
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

            {/* ====== 2段目：最新の口コミ（横幅いっぱい） ====== */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8 flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>💬</span> 最新の口コミ
              </h3>
              <div className="space-y-6 flex-grow">
                {data.latest_blogs.length > 0 ? (
                  data.latest_blogs.map((blog: any, index: number) => (
                    <div key={blog.id} className={`${index !== data.latest_blogs.length - 1 ? "border-b border-gray-200 pb-6" : ""}`}>
                      <p className="font-bold text-gray-800 mb-1">{blog.name || "ゲスト"}</p>
                      <p className="text-xs text-gray-400 mb-2">{new Date(blog.created_at).toLocaleDateString('ja-JP')} 投稿</p>
                      <p className="text-gray-600 text-sm line-clamp-2">{blog.body}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">まだクチコミが投稿されていません。</p>
                )}
              </div>
              {/* 口コミ用ページネーション */}
              {totalBlogPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-gray-100">
                  <button onClick={() => setBlogPage(blogPage - 1)} disabled={blogPage === 1} className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">前へ</button>
                  <span className="text-gray-600 text-sm font-medium">{blogPage} / {totalBlogPages}</span>
                  <button onClick={() => setBlogPage(blogPage + 1)} disabled={blogPage === totalBlogPages} className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">次へ</button>
                </div>
              )}
            </div>

            {/* ====== 3段目：コメントとつぶやきを並べて表示 ====== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 左側：最新のコメント（ブログに対するコメント） */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span>📝</span> 最新のコメント
                </h3>
                <div className="space-y-6 flex-grow">
                  {data.latest_comments.length > 0 ? (
                    data.latest_comments.map((comment: any, index: number) => (
                      <div key={comment.id} className={`${index !== data.latest_comments.length - 1 ? "border-b border-gray-200 pb-6" : ""}`}>
                        <p className="font-bold text-gray-800 mb-1">{comment.name || "退会済みユーザー"}</p>
                        <p className="text-xs text-gray-400 mb-2">{new Date(comment.created_at).toLocaleDateString('ja-JP')} 投稿</p>
                        <p className="text-gray-600 text-sm line-clamp-2">{comment.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">まだコメントが投稿されていません。</p>
                  )}
                </div>
                {/* コメント用ページネーション */}
                {totalCommentPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-gray-100">
                    <button onClick={() => setCommentPage(commentPage - 1)} disabled={commentPage === 1} className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">前へ</button>
                    <span className="text-gray-600 text-sm font-medium">{commentPage} / {totalCommentPages}</span>
                    <button onClick={() => setCommentPage(commentPage + 1)} disabled={commentPage === totalCommentPages} className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">次へ</button>
                  </div>
                )}
              </div>

              {/* 右側：最新のつぶやき（公式へのコメント） */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span>🐦</span> 最新のつぶやき
                </h3>
                <div className="space-y-6 flex-grow">
                  {data.latest_tweets.length > 0 ? (
                    data.latest_tweets.map((tweet: any, index: number) => (
                      <div key={tweet.id} className={`${index !== data.latest_tweets.length - 1 ? "border-b border-gray-200 pb-6" : ""}`}>
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-bold text-gray-800">{tweet.name || "退会済みユーザー"}</p>
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">{tweet.action_name || "不明"}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{new Date(tweet.created_at).toLocaleDateString('ja-JP')} 投稿</p>
                        <p className="text-gray-600 text-sm line-clamp-2">{tweet.tweet}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">まだつぶやきが投稿されていません。</p>
                  )}
                </div>
                {/* つぶやき用ページネーション */}
                {totalTweetPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-gray-100">
                    <button onClick={() => setTweetPage(tweetPage - 1)} disabled={tweetPage === 1} className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">前へ</button>
                    <span className="text-gray-600 text-sm font-medium">{tweetPage} / {totalTweetPages}</span>
                    <button onClick={() => setTweetPage(tweetPage + 1)} disabled={tweetPage === totalTweetPages} className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">次へ</button>
                  </div>
                )}
              </div>

            </div>
          </>
        )}
      </main>
    </div>
  );
}