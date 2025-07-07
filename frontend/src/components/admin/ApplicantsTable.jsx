import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="w-full">
      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="p-3 text-left border">Full Name</th>
              <th className="p-3 text-left border">Email</th>
              <th className="p-3 text-left border">Contact</th>
              <th className="p-3 text-left border">Resume</th>
              <th className="p-3 text-left border">Date</th>
              <th className="p-3 text-right border">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants?.applications?.map((item) => (
              <tr key={item._id} className="border">
                <td className="p-3 border">{item?.applicant?.fullname}</td>
                <td className="p-3 border">{item?.applicant?.email}</td>
                <td className="p-3 border">{item?.applicant?.phoneNumber}</td>
                <td className="p-3 border">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 underline"
                      href={item.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    'NA'
                  )}
                </td>
                <td className="p-3 border">{item?.applicant?.createdAt.split('T')[0]}</td>
                <td className="p-3 text-right border">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent  side="bottom" align="end" className="w-32">
                      {shortlistingStatus.map((status, i) => (
                        <div
                          key={i}
                          onClick={() => statusHandler(status, item._id)}
                          className="cursor-pointer my-2 hover:font-semibold"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="block md:hidden space-y-4">
        {applicants?.applications?.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg shadow-sm px-4 py-3 bg-white relative"
          >
            {/* Popover Top Right */}
            <div className="absolute top-2 right-2">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="end"
                  className="w-32"
                >
                  {shortlistingStatus.map((status, i) => (
                    <div
                      key={i}
                      onClick={() => statusHandler(status, item._id)}
                      className="cursor-pointer my-2 hover:font-semibold"
                    >
                      {status}
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-6">
              <div className="font-semibold text-gray-800">Full Name</div>
              <div>{item?.applicant?.fullname}</div>

              <div className="font-semibold text-gray-800">Email</div>
              <div>{item?.applicant?.email}</div>

              <div className="font-semibold text-gray-800">Contact</div>
              <div>{item?.applicant?.phoneNumber}</div>

              <div className="font-semibold text-gray-800">Resume</div>
              <div>
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 underline"
                    href={item.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  'NA'
                )}
              </div>

              <div className="font-semibold text-gray-800">Date</div>
              <div>{item?.applicant?.createdAt.split('T')[0]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsTable;
