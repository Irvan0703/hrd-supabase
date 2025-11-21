import AuthTemplate from "../../components/templates/Auth";
import RegisterForm from "../../components/organisms/AuthForm/Register";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <AuthTemplate title="Daftar ke Rakamin">

      <RegisterForm />

      <p className="mt-3 text-center text-sm">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </AuthTemplate>
  );
}
