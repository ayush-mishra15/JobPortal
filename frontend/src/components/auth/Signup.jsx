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
import { setLoading } from '@/redux/authSlice';
import {
  Loader2, Mail, Lock, User, Phone, UploadCloud, UserPlus,
} from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
  });
  const [file, setFile] = useState(null);

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

      if (!file) {
      toast.error("Profile image is required");
      return;
    }
    
    const formData = new FormData();
    for (const key in input) {
      formData.append(key, input[key]);
    }
    if (file) {
      formData.append('file', file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-50 px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 lg:w-1/2 border border-gray-200 rounded-xl p-8 shadow-md bg-white"
        >
          <h1 className="font-bold text-3xl mb-6 text-center">Create an Account</h1>

          {/* Full Name */}
          <div className="my-3">
            <Label className="flex items-center mb-1 gap-2">
              <User size={16} />
              Full Name
            </Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>

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

          {/* Phone Number */}
          <div className="my-3">
            <Label className="flex items-center mb-1 gap-2">
              <Phone size={16} />
              Phone Number
            </Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
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
              placeholder="Create a strong password"
            />
          </div>

          {/* Role & File Upload */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5">
            <RadioGroup className="flex flex-wrap gap-4">
              {['student', 'recruiter'].map((r) => (
                <div key={r} className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value={r}
                    checked={input.role === r}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label className="cursor-pointer capitalize">{r}</Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label className="flex items-center gap-1">
                <UploadCloud size={16} />
                Profile
              </Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-sm file:font-semibold file:text-blue-600 hover:file:bg-blue-100"
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              <UserPlus size={18} className="mr-2" />
              Signup
            </Button>
          )}

          <p className="text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
