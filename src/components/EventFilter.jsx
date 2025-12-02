export default function EventFilter({ onFilter }) {
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
        <option value="workshop">Workshop</option>
        <option value="concert">Concert</option>
        <option value="seminar">Seminar</option>
      </select>

      <input
        type="date"
        className="border p-2 rounded-lg"
        onChange={(e) => onFilter({ date: e.target.value })}
      />
    </div>
  );
}
