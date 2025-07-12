import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { X, SlidersHorizontal, SearchX } from 'lucide-react';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-8xl mx-auto mt-5 px-4 sm:px-5">
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden mb-4 flex justify-start">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-700 border-gray-300 bg-white shadow-sm"
            onClick={() => setShowFilter(true)}
          >
            <SlidersHorizontal size={16} className="text-gray-600" />
            Filter
          </Button>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Filter Sidebar for md+ */}
          <div className="hidden md:block w-1/4">
            <FilterCard />
          </div>

          {/* Job Listings */}
          <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
            {filterJobs.length <= 0 ? (
              <div className="text-center text-gray-600 text-sm flex flex-col items-center mt-10">
                <SearchX className="w-6 h-6 mb-2" />
                Job not found
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto md:hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} />
              <h2 className="text-lg font-bold">Filter Jobs</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowFilter(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <FilterCard />
        </div>
      )}
    </div>
  );
};

export default Jobs;
