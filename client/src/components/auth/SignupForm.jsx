import { useState } from "react";
import { signupUser } from "../../services/authService";

function SignupForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "learner",
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

      const data = await signupUser(formData);

      console.log(data);

      alert("Signup Successful");

    } catch (error) {

      console.log(error);

      alert("Signup Failed");

    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <br />

      <select
        name="role"
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

      <button type="submit">
        Signup
      </button>

    </form>
  );
}

export default SignupForm;