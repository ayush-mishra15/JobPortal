import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="max-w-7xl mx-auto px-4 my-20">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        <span className="text-[#2563EB]">Latest & Top </span> Job Openings
      </h1>

      {allJobs.length <= 0 ? (
        <div className="mt-6 text-gray-500 text-lg">No Jobs Available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
