import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import {
  Loader2,
  Mail,
  Lock,
  LogIn,
} from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center bg-gray-50 justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border shadow-md bg-white border-gray-200 rounded-md p-6"
        >
          <h1 className="font-bold text-2xl mb-6 text-center">Welcome Back</h1>

          {/* Email */}
          <div className="my-3">
            <Label className="flex items-center mb-1 gap-2">
              <Mail size={16} />
              Email
            </Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email address"
            />
          </div>

          {/* Password */}
          <div className="my-3">
            <Label className="flex items-center mb-1 gap-2">
              <Lock size={16} />
              Password
            </Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
          </div>

          {/* Role */}
          <div className="my-5">
            <Label className="mb-1 block">Select Role</Label>
            <RadioGroup className="flex flex-wrap gap-4">
              {['student', 'recruiter'].map((roleOption) => (
                <label key={roleOption} className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value={roleOption}
                    checked={input.role === roleOption}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <span className="capitalize">{roleOption}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 flex items-center justify-center">
              <LogIn size={18} className="mr-2" />
              Login
            </Button>
          )}

          <p className="text-sm text-center">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
