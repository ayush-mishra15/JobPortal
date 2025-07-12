import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { SearchCheck } from 'lucide-react';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <SearchCheck size={20} className="text-blue-600" />
            <h1 className="text-lg sm:text-2xl font-semibold text-gray-800">
              Search Results
              <span className="ml-2 text-gray-500 text-base font-normal">
                ({allJobs.length})
              </span>
            </h1>
          </div>
        </div>

        {/* Job Grid */}
        {allJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {allJobs.map((job) => (
              <div
                key={job._id}
              >
                <Job job={job} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm mt-20">
            No jobs found. Try modifying your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
