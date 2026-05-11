import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h1 className="text-xl font-bold mb-8">湯のここち<br />管理者用</h1>
      <nav>
        <ul className="space-y-4">

          <li>
            <Link href="/" className="hover:text-gray-300 cursor-pointer block mt-5">
              📊 ダッシュボード
            </Link>
          </li>

          <li>
            <Link href="/users" className="hover:text-gray-300 cursor-pointer block mt-5">
              👥 ユーザー管理
            </Link>
          </li>
          
          <li>
            <Link href="/blogs" className="hover:text-gray-300 cursor-pointer block mt-5">
              💬 クチコミ管理
            </Link>
          </li>

          <li>
            <Link href="/comments" className="hover:text-gray-300 cursor-pointer block mt-5">
              📝 コメント管理
            </Link>
          </li>

          <li>
            <Link href="/tweets" className="hover:text-gray-300 cursor-pointer block mt-5">
              🐦 つぶやき管理
            </Link>
          </li>

        </ul>
      </nav>
    </aside> 
  );
}


