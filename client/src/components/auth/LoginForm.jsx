import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

import InputField from "../common/InputField";
import Button from "../common/Button";

function LoginForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    try {

      setLoading(true);

      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );
      
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <form onSubmit={handleSubmit}>

      <InputField
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <br />

      <InputField
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <br />

      <Button
        type="submit"
        text={loading ? "Logging In..." : "Login"}
        disabled={loading}
      />

    </form>

  );
}

export default LoginForm;