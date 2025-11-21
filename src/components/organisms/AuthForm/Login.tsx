import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/auth/thunks";
import type { AppDispatch } from "../../../app/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../../molecules/InputGroup";
import Button from "../../atoms/Button";
import type { RootState } from "../../../app/store";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // unwrap() untuk dapat hasil atau throw error
      const result = await dispatch(loginUser({ email, password })).unwrap();
      console.log("Login sukses:", result.user);
      navigate("/jobs"); // redirect ke halaman applicant
    } catch (err: any) {
      console.error("Login gagal:", err.message);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <InputGroup
        label="Alamat email"
        value={email}
        placeholder="Masukan email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputGroup
        label="Kata sandi"
        type="password"
        value={password}
        placeholder="Masukan kata sandi"
        onChange={(e) => setPassword(e.target.value)}
        showTogglePassword
      />

      <Button type="submit" color="yellow" className="mt-2" disabled={loading}>
        {loading ? "Loading..." : "Masuk"}
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
