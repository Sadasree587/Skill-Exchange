import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signupUser } from "../../services/authService";

import InputField from "../common/InputField";
import Button from "../common/Button";

function SignupForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "learner",
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      alert("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {

      setLoading(true);

      await signupUser(formData);

      alert("Signup Successful");

      navigate("/login");

    } catch (error) {

        console.log(error);

       console.log(error.response);

       console.log(error.response?.data);

       alert(
        error?.response?.data?.message ||
        "Signup Failed"
       );

      }

     finally {

      setLoading(false);

    }
  };

  return (

    <form onSubmit={handleSubmit}>

      <InputField
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <br />

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

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="learner">
          Learner
        </option>

        <option value="mentor">
          Mentor
        </option>

        <option value="both">
          Both
        </option>
      </select>

      <br />

      <Button
        type="submit"
        text={loading ? "Signing Up..." : "Signup"}
        disabled={loading}
      />

    </form>

  );
}

export default SignupForm;