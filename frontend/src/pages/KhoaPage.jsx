import { useEffect, useState } from "react";
import API from "../services/api";

function KhoaPage() {

  const [khoa, setKhoa] = useState([]);
  const [coso, setCoso] = useState([]);

  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState("");

  const [form, setForm] = useState({
    maKhoa: "",
    tenKhoa: "",
    maCoSo: ""
  });

  const loadData = async () => {

    const res = await API.get("/khoa");
    setKhoa(res.data);

    const cs = await API.get("/coso");
    setCoso(cs.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {

    if (editing) {

      await API.put(`/khoa/${form.maKhoa}`, {
        maKhoa: form.maKhoa,
        tenKhoa: form.tenKhoa,
        coSo: {
          maCoSo: form.maCoSo
        }
      });

    } else {

      await API.post("/khoa", {
        maKhoa: form.maKhoa,
        tenKhoa: form.tenKhoa,
        coSo: {
          maCoSo: form.maCoSo
        }
      });

    }

    setForm({
      maKhoa: "",
      tenKhoa: "",
      maCoSo: ""
    });

    setEditing(false);

    loadData();
  };

  const editKhoa = (k) => {

    setForm({
      maKhoa: k.maKhoa,
      tenKhoa: k.tenKhoa,
      maCoSo: k.coSo?.maCoSo
    });

    setEditing(true);
  };

  const deleteKhoa = async (id) => {

    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;

    await API.delete(`/khoa/${id}`);

    loadData();
  };

  const filteredKhoa = filter
    ? khoa.filter((k) => k.coSo?.maCoSo === filter)
    : khoa;

  return (
    <div>

      <h2>Quản lý Khoa</h2>

      <input
        placeholder="Mã khoa"
        value={form.maKhoa}
        onChange={(e) =>
          setForm({ ...form, maKhoa: e.target.value })
        }
      />

      <input
        placeholder="Tên khoa"
        value={form.tenKhoa}
        onChange={(e) =>
          setForm({ ...form, tenKhoa: e.target.value })
        }
      />

      <select
        value={form.maCoSo}
        onChange={(e) =>
          setForm({ ...form, maCoSo: e.target.value })
        }
      >
        <option value="">Chọn cơ sở</option>

        {coso.map((c) => (
          <option key={c.maCoSo} value={c.maCoSo}>
            {c.tenCoSo}
          </option>
        ))}

      </select>

      <button onClick={handleSubmit}>
        {editing ? "Cập nhật" : "Thêm"}
      </button>

      <hr />

      <h3>Lọc theo cơ sở</h3>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">Tất cả</option>

        {coso.map((c) => (
          <option key={c.maCoSo} value={c.maCoSo}>
            {c.tenCoSo}
          </option>
        ))}

      </select>

      <table border="1">

        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên khoa</th>
            <th>Cơ sở</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredKhoa.map((k) => (
            <tr key={k.maKhoa}>

              <td>{k.maKhoa}</td>

              <td>{k.tenKhoa}</td>

              <td>{k.coSo?.maCoSo}</td>

              <td>

                <button onClick={() => editKhoa(k)}>
                  Sửa
                </button>

                <button onClick={() => deleteKhoa(k.maKhoa)}>
                  Xóa
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default KhoaPage;