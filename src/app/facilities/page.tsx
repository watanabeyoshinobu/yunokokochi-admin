"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Facilities() {
  const [facilities, setFacilities] = useState([
    { id: 1, name: "大露天風呂", status: "営業中",description: "源泉掛け流しの絶景露天風呂" },
    { id: 2, name: "高温サウナ", status: "営業中",description: "90度設定の本格フィンランド式サウナ" },
    { id: 3, name: "岩盤浴「天」", status: "メンテナンス中",description: "現在、一部設備の点検を行っております。" }
  ]);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("営業中");

  const handleAddFacility = () => {
    if (newName === "") return;

    const newFacility = {
      id: facilities.length + 1,
      name: newName,
      status: newStatus,
      description: newDescription,
    };

    setFacilities([...facilities, newFacility]);

    setNewName("");
    setNewDescription("");
    setNewStatus("営業中");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">♨️ 施設情報管理</h2>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-bold mb-4">✨ 新しい施設を追加</h3>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">施設名</label>
              <input
                type="text"
                placeholder="例：水風呂"
                className="border p-2 rounded w-full"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">説明</label>
              <input
                type="text"
                placeholder="例：サウナ後にどうぞ"
                className="border p-2 rounded w-full"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">状態</label>
              <select
                className="border p-2 rounded bg-white"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="営業中">営業中</option>
                <option value="メンテナンス中">メンテナンス中</option>
              </select>
            </div>

            <button
              onClick={handleAddFacility}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-bold h-[42px]"
            >
              追加
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {facilities.map((facility) => (
            <div key={facility.id} className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{facility.name}</h3>
                <p className="text-gray-600 mt-2">{facility.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                facility.status === "営業中" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {facility.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}