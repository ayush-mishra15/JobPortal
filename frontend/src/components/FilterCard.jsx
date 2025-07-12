import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { MapPin, Briefcase, IndianRupee } from 'lucide-react';

const filterData = [
  {
    filterType: 'Location',
    icon: <MapPin size={18} className="text-blue-600" />,
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    icon: <Briefcase size={18} className="text-blue-600" />,
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Salary',
    icon: <IndianRupee size={18} className="text-blue-600" />,
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-4 mt-4 md:mt-0 lg:mt-0 rounded-lg shadow-sm mb-6 border">
      <h1 className="font-semibold text-lg text-gray-800 mb-3 hidden md:block">
        Filter Jobs
      </h1>

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
              {data.icon}
              <span>{data.filterType}</span>
            </div>

            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              const isSelected = selectedValue === item;

              return (
                <Label
                  key={itemId}
                  htmlFor={itemId}
                  className={`flex items-center gap-2 py-1 px-2 rounded-md transition-colors duration-200 cursor-pointer
                    hover:bg-gray-100 ${
                      isSelected ? 'bg-gray-100 text-black font-medium' : 'text-gray-700'
                    }`}
                >
                  <RadioGroupItem value={item} id={itemId} />
                  <span className="text-sm">{item}</span>
                </Label>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
