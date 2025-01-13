import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [type, setType] = useState("signup");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "+923054170452",
    panCardNumber: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    panCardNumber: "",
    password: "",
  });

  const validatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    if (strength === 4) return "Strong";
    if (strength === 3) return "Medium";
    if (strength === 1 || strength === 2) return "Weak";
    return "";
  };

  const validateForm = () => {
    const errors: any = {};
    const { firstName, lastName, email, phoneNumber, panCardNumber, password } =
      formData;

    
    if (type === "signup" && !firstName)
      errors.firstName = "First name is required.";

    
    if (type === "signup" && !lastName)
      errors.lastName = "Last name is required.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format.";
    }

   
    if (type === "signup" && !/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format.";
    }

    if (type === "signup" && panCardNumber.length !== 10) {
      errors.panCardNumber = "PAN Card number must be 10 characters.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (passwordStrength !== "Strong") {
      errors.password = "Password must be strong.";
    }

    setFormErrors(errors);

    
    if (Object.keys(errors).length === 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      const strength = validatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
    if (!isFormValid) return;

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/user/${
          type === "signup" ? "signup" : "signin"
        }`,
        formData,
        { withCredentials: true }
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(response.data.userdata));
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData, passwordStrength]);

  return (
    <div className={`min-h-screen ${type === "signup" ? "mt-10" : ""} min-w-[23rem] flex items-center justify-center`}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border p-8">
        <div className="mb-2">
          <h1 className="text-2xl font-bold pb-1 text-gray-800 capitalize">
            {type}
          </h1>
          <p className="text-gray-600">
            {type === "signup"
              ? "Create a new account to get started."
              : "Already have an account?"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          {type === "signup" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  required
                  onChange={handleChange}
                  className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                />
                {formErrors.firstName && (
                  <p className="text-sm text-red-600">{formErrors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  required
                  onChange={handleChange}
                  className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                />
                {formErrors.lastName && (
                  <p className="text-sm text-red-600">{formErrors.lastName}</p>
                )}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              onChange={handleChange}
              className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
            {formErrors.email && (
              <p className="text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>
          {type === "signup" && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  onChange={handleChange}
                  defaultValue="+923054170452"
                  className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                />
                {formErrors.phoneNumber && (
                  <p className="text-sm text-red-600">
                    {formErrors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="panCardNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  PAN Card Number
                </label>
                <input
                  id="panCardNumber"
                  name="panCardNumber"
                  required
                  onChange={handleChange}
                  className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                />
                {formErrors.panCardNumber && (
                  <p className="text-sm text-red-600">
                    {formErrors.panCardNumber}
                  </p>
                )}
              </div>
            </>
          )}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={handleChange}
              className="w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
            {formErrors.password && (
              <p className="text-sm text-red-600">{formErrors.password}</p>
            )}
            <p
              className={`text-sm ${
                passwordStrength === "Strong"
                  ? "text-green-600"
                  : passwordStrength === "Medium"
                  ? "text-yellow-600"
                  : "text-red-800"
              }`}
            >
              {passwordStrength && `Password strength: ${passwordStrength}`}
            </p>
          </div>
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isFormValid
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm font-medium text-gray-800">
          {type === "signup" ? (
            <>
              Already have an account?{" "}
              <span
                className="text-black underline font-bold cursor-pointer"
                onClick={() => setType("signin")}
              >
                Sign In
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                className="text-black font-bold underline cursor-pointer"
                onClick={() => setType("signup")}
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
