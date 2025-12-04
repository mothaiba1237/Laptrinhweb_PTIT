import { useEffect, useState } from "react";
import axios from "axios";

export default function EventFilter({ onFilter }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Lỗi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-white shadow-md p-4 rounded-xl mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      
      <input
        type="text"
        placeholder="Tìm kiếm sự kiện..."
        className="border p-2 rounded-lg"
        onChange={(e) => onFilter({ search: e.target.value })}
      />

      <select
        className="border p-2 rounded-lg"
        onChange={(e) => onFilter({ category: e.target.value })}
      >
        <option value="">Tất cả loại</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <input
        type="date"
        className="border p-2 rounded-lg"
        onChange={(e) => onFilter({ date: e.target.value })}
      />
    </div>
  );
}
