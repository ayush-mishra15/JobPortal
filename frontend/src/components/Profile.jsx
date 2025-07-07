import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const profile = user?.profile || {};
  const skills = profile.skills || [];
  const resumeLink = profile.resume;
  const resumeName = profile.resumeOriginalName || 'Download Resume';

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-6 space-y-6 p-4 md:p-8">
        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Left: Avatar and Info */}
            <div className="flex gap-4 items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{user?.fullname}</h1>
                <p className="text-sm text-gray-600">{profile?.bio || 'No bio provided.'}</p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="self-start md:self-center">
              <Button onClick={() => setOpen(true)} variant="outline">
                <Pen className="w-4 h-4 mr-2" /> Edit
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 space-y-2 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact className="w-4 h-4" />
              <span>{user?.phoneNumber || 'NA'}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, i) => (
                  <Badge key={i} variant="outline">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">No skills added.</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-6">
            <Label className="text-md font-semibold text-gray-700">Resume</Label>
            {resumeLink ? (
              <div>
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline mt-1 inline-block"
                >
                  {resumeName}
                </a>
              </div>
            ) : (
              <p className="text-gray-500">Resume not uploaded.</p>
            )}
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>

      {/* Profile Update Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
