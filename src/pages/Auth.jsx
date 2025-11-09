
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sdk } from "../configs/medusa";
import useUser from "../hooks/useUser.js";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [existingUser, setExistingUser] = useState(false);
  const [stage, setStage] = useState(1); // 1: email input, 2: form input

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");

  const { register, login } = useUser();

  const handleContinue = async () => {
    try {
      // Attempt to register with a placeholder password to check existence.
      // This may return a specific error if the identity exists.
      await sdk.auth.register("customer", "emailpass", { email, password: " " });
      setExistingUser(false);
      setStage(2);
    } catch (fetchError) {
      const msg = fetchError?.response?.data?.message || fetchError?.message || String(fetchError);
      if (msg.includes("Identity with email already exists")) {
        setExistingUser(true);
        setStage(2);
        return;
      }
      alert(`An error occured while creating account: ${msg}`);
      return;
    }
  };

  const handleRegister = async () => {
    try {
      await register({
        email,
        password,
        firstName,
        lastName,
        phone,
      });
      handleRedirect();
    } catch (error) {
      alert(`Registration failed: ${error.message || error}`);
    }
  };

  const handleLogin = async () => {
    try {
      await login({ email, password });
      handleRedirect();
    } catch (error) {
      alert(`Login failed: ${error.message || error}`);
    }
  };

  const handleRedirect = () => {
    if (redirect) {
      navigate(redirect);
    } else {
      navigate("/");
    }
  };

  const handleCancel = () => {
    setStage(1);
    setExistingUser(false);
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-md mx-auto p-6 sm:p-10">
      {stage === 1 && (
        <div className="flex gap-6 flex-col">
          <TextInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setExistingUser(false);
            }}
          />
          <Button onClick={handleContinue} disabled={!email} variant="primary" size="md">
            Continue
          </Button>
          {existingUser && (
            <p className="text-red-600 mt-2">An account with this email already exists.</p>
          )}
        </div>
      )}
      {stage === 2 && (
        <div className="flex gap-6 flex-col">
          <p>Email: {email}</p>
          {existingUser ? (
            <>
              <TextInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleLogin} variant="primary" size="md">
                Login
              </Button>
            </>
          ) : (
            <>
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextInput
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button onClick={handleRegister} variant="primary" size="md">
                Register
              </Button>
            </>
          )}
          <Button onClick={handleCancel} variant="secondary" size="md">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default Auth;
