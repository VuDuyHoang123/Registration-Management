import { useEffect, useState } from "react";
import API from "../services/api";

function GiangVienPage() {

  const [giangVien, setGiangVien] = useState([]);
  const [coso, setCoso] = useState([]);

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    maGiangVien: "",
    tenGiangVien: "",
    maCoSo: ""
  });

  const loadData = async () => {

    const res = await API.get("/giangvien");
    setGiangVien(res.data);

    const cs = await API.get("/coso");
    setCoso(cs.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {

    if (editing) {

      await API.put(`/giangvien/${form.maGiangVien}`, {
        maGiangVien: form.maGiangVien,
        tenGiangVien: form.tenGiangVien,
        coSo: {
          maCoSo: form.maCoSo
        }
      });

    } else {

      await API.post("/giangvien", {
        maGiangVien: form.maGiangVien,
        tenGiangVien: form.tenGiangVien,
        coSo: {
          maCoSo: form.maCoSo
        }
      });

    }

    setForm({
      maGiangVien: "",
      tenGiangVien: "",
      maCoSo: ""
    });

    setEditing(false);

    loadData();
  };

  const editGV = (gv) => {

    setForm({
      maGiangVien: gv.maGiangVien,
      tenGiangVien: gv.tenGiangVien,
      maCoSo: gv.coSo?.maCoSo
    });

    setEditing(true);
  };

  const deleteGV = async (id) => {

    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;

    await API.delete(`/giangvien/${id}`);

    loadData();
  };

  return (
    <div>

      <h2>Quản lý Giảng Viên</h2>

      <input
        placeholder="Mã giảng viên"
        value={form.maGiangVien}
        onChange={(e) =>
          setForm({ ...form, maGiangVien: e.target.value })
        }
      />

      <input
        placeholder="Tên giảng viên"
        value={form.tenGiangVien}
        onChange={(e) =>
          setForm({ ...form, tenGiangVien: e.target.value })
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

      <table border="1">

        <thead>
          <tr>
            <th>Mã GV</th>
            <th>Tên giảng viên</th>
            <th>Cơ sở</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {giangVien.map((gv) => (
            <tr key={gv.maGiangVien}>

              <td>{gv.maGiangVien}</td>

              <td>{gv.tenGiangVien}</td>

              <td>{gv.coSo?.maCoSo}</td>

              <td>

                <button onClick={() => editGV(gv)}>
                  Sửa
                </button>

                <button onClick={() => deleteGV(gv.maGiangVien)}>
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

export default GiangVienPage;