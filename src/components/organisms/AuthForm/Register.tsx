import { useState } from "react";
import InputGroup from "../../molecules/InputGroup";
import Button from "../../atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/auth/thunks";
import type { AppDispatch, RootState } from "../../../app/store";

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("applicant");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Password dan konfirmasi tidak sama!");
      return;
    }

    dispatch(registerUser({ email, password, role  }));
  };

  return (
    <form onSubmit={submit}>
      <InputGroup
        label="Email"
        value={email}
        placeholder="email@example.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputGroup
        label="Password"
        type="password"
        value={password}
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
      />

      <InputGroup
        label="Konfirmasi Password"
        type="password"
        value={confirm}
        placeholder="ulangi password..."
        onChange={(e) => setConfirm(e.target.value)}
      />

      <div className="mt-3">
        <label className="block mb-1">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="applicant">Applicant</option>
          <option value="admin">Admin</option>
        </select>
      </div>


      <Button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </Button>

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </form>
  );
}
