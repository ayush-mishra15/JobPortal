import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const isInitiallyApplied =
    singleJob?.applications?.some(app => app.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user?._id }],
        };

        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Application failed');
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(app => app.applicant === user?._id)
          );
        }
      } catch (error) {
        console.error('Failed to fetch job details', error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl text-gray-800">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="ghost" className="text-blue-700 font-semibold">
              {singleJob?.postion} Positions
            </Badge>
            <Badge variant="ghost" className="text-[#F83002] font-semibold">
              {singleJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-[#2563EB] font-semibold">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={!isApplied ? applyJobHandler : undefined}
          disabled={isApplied}
          className={`rounded-lg px-6 ${
            isApplied
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-[#2563EB] hover:bg-[#1D4ED8]'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h2 className="border-b mt-8 pb-2 text-lg font-medium text-gray-700">Job Description</h2>

      <div className="mt-6 space-y-4 text-sm md:text-base text-gray-800">
        <p>
          <strong className="text-gray-900">Role:</strong>{' '}
          <span className="pl-2">{singleJob?.title}</span>
        </p>
        <p>
          <strong className="text-gray-900">Location:</strong>{' '}
          <span className="pl-2">{singleJob?.location}</span>
        </p>
        <p>
          <strong className="text-gray-900">Description:</strong>{' '}
          <span className="pl-2">{singleJob?.description}</span>
        </p>
        <p>
          <strong className="text-gray-900">Experience:</strong>{' '}
          <span className="pl-2">{singleJob?.experience} yrs</span>
        </p>
        <p>
          <strong className="text-gray-900">Salary:</strong>{' '}
          <span className="pl-2">{singleJob?.salary} LPA</span>
        </p>
        <p>
          <strong className="text-gray-900">Total Applicants:</strong>{' '}
          <span className="pl-2">{singleJob?.applications?.length}</span>
        </p>
        <p>
          <strong className="text-gray-900">Posted Date:</strong>{' '}
          <span className="pl-2">
            {singleJob?.createdAt ? singleJob?.createdAt.split('T')[0] : 'N/A'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
