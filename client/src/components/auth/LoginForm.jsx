import { useState } from "react";
import { loginUser } from "../../services/authService";

import InputField from "../common/InputField";
import Button from "../common/Button";

function LoginForm() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await loginUser(formData);

      console.log(data);

      localStorage.setItem(
        "token",
        data.token
      );

      alert("Login Successful");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

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
       text="Login"
      />
    </form>
  );
}

export default LoginForm;