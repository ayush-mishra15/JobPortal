import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, Menu, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 sm:px-6 h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-gray-900  w-full md:w-fit"
        >
          Job<span className="text-[#2563EB]">Portal</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-5 text-sm font-medium text-gray-700">
            {user?.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="h-8 px-3 text-sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] h-8 px-4 text-sm">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-9 w-9">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm">{user?.fullname}</h4>
                    <p className="text-xs text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-1 text-sm text-gray-700">
                  {user?.role === 'student' && (
                    <Link to="/profile" className="flex items-center gap-2">
                      <User2 className="h-4 w-4" />
                      <span className='text-gray-800 font-semibold'>View Profile</span>
                    </Link>
                  )}
                  <Button onClick={logoutHandler} variant="link" className="flex justify-start gap-2 text-gray-800 p-0">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden absolute right-4">
          <Menu className="h-6 w-6 cursor-pointer text-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 text-center">
          <ul className="flex flex-col gap-2 pt-3 text-sm font-medium text-gray-700">
            {user?.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          <div className="mt-4 flex flex-col gap-1 text-sm text-gray-700">
            {user?.role === 'student' && (
                <Link to="/profile">
                <Button
                    variant="outline"
                    className="w-full h-8 px-3 py-1 text-sm flex justify-center gap-2"
                >
                    <User2 className="h-4 w-4" />
                    View Profile
                </Button>
                </Link>
            )}
            <Button
                onClick={logoutHandler}
                className="w-full h-8 px-3 py-1 text-sm bg-black hover:bg-gray-800 flex items-center justify-center gap-2"
            >
                <LogOut className="h-4 w-4" />
                Logout
            </Button>
            </div>

        </div>
      )}
    </div>
  );
};

export default Navbar;
