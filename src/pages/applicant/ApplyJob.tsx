import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyJob } from "../../features/apply/thunks";
import type { AppDispatch, RootState } from "../../app/store";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ApplyJobPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { jobId } = useParams();

  const { loading, error } = useSelector((state: RootState) => state.apply);

  const [form, setForm] = useState({
    full_name: "",
    dob: "",
    gender: "",
    domicile: "",
    phone: "",
    linkedin: "",
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(applyJob({ jobId: jobId!, form, photoFile }));
    navigate(`/jobs/${jobId}/success`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Apply Front End at Rakamin</h1>
        <span className="ml-auto text-xs text-gray-500">
          🔵 This field required to fill
        </span>
      </div>

      <form onSubmit={submit} className="space-y-6">

        {/* PHOTO */}
        <div>
          <label className="block text-sm font-semibold mb-2">Photo Profile</label>

          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden border">
              {photoFile ? (
                <img
                  src={URL.createObjectURL(photoFile)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            <label
              className="px-4 py-2 bg-white border rounded-lg text-sm cursor-pointer"
            >
              📸 Take a Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>
        </div>

        {/* FULL NAME */}
        <div>
          <label className="form-label">Full name *</label>
          <input
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            placeholder="Enter your full name"
            className="form-input"
            required
          />
        </div>

        {/* DATE OF BIRTH */}
        <div>
          <label className="form-label">Date of birth *</label>
          <input
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            className="form-input"
            required
          />
        </div>

        {/* GENDER */}
        <div>
          <label className="form-label">Pronoun (gender) *</label>

          <div className="flex items-center gap-6 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              />
              She/her (Female)
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              />
              He/him (Male)
            </label>
          </div>
        </div>

        {/* DOMICILE */}
        <div>
          <label className="form-label">Domicile *</label>
          <select
            value={form.domicile}
            onChange={(e) => setForm({ ...form, domicile: e.target.value })}
            className="form-input"
            required
          >
            <option value="">Choose your domicile</option>
            <option>Jakarta</option>
            <option>Bandung</option>
            <option>Surabaya</option>
          </select>
        </div>

        {/* PHONE */}
        <div>
          <label className="form-label">Phone number *</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Enter phone number"
            className="form-input"
            required
          />
        </div>

        {/* LINKEDIN */}
        <div>
          <label className="form-label">LinkedIn profile *</label>
          <input
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
            className="form-input"
            required
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Mengirim..." : "Kirim Lamaran"}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}
