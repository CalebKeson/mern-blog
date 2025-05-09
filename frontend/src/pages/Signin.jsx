import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [formdata, setFormData] = React.useState({});
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!formdata.email) {
      setError({ message: "Please provide an email!" });
      return;
    }
    if (!formdata.password) {
      setError({ message: "Please provide a password!" });
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data);
        return;
      }
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error signing up:", error);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-8 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left side */}
        <div className="flex-1">
          <Link
            to="/"
            className="self-center font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Niaje
            </span>
            .com
          </Link>
          <p className="text-sm mt-5">
            Step into a world where ideas come alive and stories leave their
            mark. Here, every word is a spark—igniting curiosity, conversation,
            and change.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1 mt-5 md:mt-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm">
              Enter your credentials to access your account.
            </p>

            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                value={formdata.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                value={formdata.password}
                onChange={handleChange}
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:bg-gradient-to-bl cursor-pointer"
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex flex-col gap-2">
            <p className=" flex gap-2 text-sm mt-5">
              Dont have an account?{" "}
              <Link
                to="/sign-up"
                className="text-blue-500 hover:text-blue-800 dark:text-blue-400"
              >
                Sign Up
              </Link>
            </p>
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:text-blue-800 dark:text-blue-400"
            >
              Forgot password?
            </Link>
          </div>
          {error && (
            <Alert
              color="failure"
              className="mt-5"
              onDismiss={() => setError(null)}
            >
              {error.message}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
