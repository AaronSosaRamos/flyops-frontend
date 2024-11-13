import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCalendarAlt, FaChartLine, FaDatabase } from 'react-icons/fa';

interface ResearchFormData {
  date_range_start: string;
  date_range_end: string;
  focus_area: string;
  data_sources: string;
}

const schema = yup.object({
  date_range_start: yup
    .string()
    .required('Start date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format'),
  date_range_end: yup
    .string()
    .required('End date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format'),
  focus_area: yup.string().required('Focus area is required'),
  data_sources: yup.string().required('Data sources are required'),
}).required();

const FlyOpsResearcherForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ResearchFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ResearchFormData) => {
    toast.success('Research analysis data submitted successfully!');
    console.log('Form Data:', {
      ...data,
      data_sources: data.data_sources.split(',').map(source => source.trim()),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-800 p-6 mt-12">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
      
      <div className="w-full max-w-xl bg-gray-50 dark:bg-gray-900 shadow-xl rounded-2xl p-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">FlyOps Researcher</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
          Submit your analysis parameters to conduct focused research on specific areas of flight operations.
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Start Date</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm p-3">
              <FaCalendarAlt className="text-blue-500 dark:text-blue-300 mr-3" />
              <input
                type="date"
                {...register('date_range_start')}
                className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
              />
            </div>
            {errors.date_range_start && <p className="text-red-600 text-sm">{errors.date_range_start.message}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">End Date</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm p-3">
              <FaCalendarAlt className="text-blue-500 dark:text-blue-300 mr-3" />
              <input
                type="date"
                {...register('date_range_end')}
                className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
              />
            </div>
            {errors.date_range_end && <p className="text-red-600 text-sm">{errors.date_range_end.message}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Focus Area</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm p-3">
              <FaChartLine className="text-green-500 dark:text-green-300 mr-3" />
              <input
                type="text"
                placeholder="e.g., delays, fuel efficiency"
                {...register('focus_area')}
                className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
              />
            </div>
            {errors.focus_area && <p className="text-red-600 text-sm">{errors.focus_area.message}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Data Sources</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm p-3">
              <FaDatabase className="text-purple-500 dark:text-purple-300 mr-3" />
              <input
                type="text"
                placeholder="Enter sources separated by commas"
                {...register('data_sources')}
                className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
              />
            </div>
            {errors.data_sources && <p className="text-red-600 text-sm">{errors.data_sources.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 shadow-lg"
          >
            Submit Research Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlyOpsResearcherForm;
