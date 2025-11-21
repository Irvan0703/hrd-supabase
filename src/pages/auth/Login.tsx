import AuthTemplate from "../../components/templates/Auth";
import LoginForm from "../../components/organisms/AuthForm/Login";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <AuthTemplate title="Masuk ke Rakamin">
      <LoginForm />

      <p className="mt-4 text-center text-sm text-gray-600">
        Belum punya akun?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Daftar
        </Link>
      </p>
    </AuthTemplate>
  );
}
