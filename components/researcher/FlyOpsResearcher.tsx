import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCalendarAlt, FaChartLine, FaDatabase } from 'react-icons/fa';
import axiosInstance from '@/utils/axiosInstance';
import FlyOpsResearcherResult from './ResearcherResult';

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

  const [researchData, setResearchData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ResearchFormData) => {
    setLoading(true);
    toast.info('Submitting research request...');
    const formattedData = {
      ...data,
      data_sources: data.data_sources.split(',').map((source) => source.trim()),
    };

    try {
      const response = await axiosInstance.post('/flyops-researcher', formattedData);
      setResearchData(response.data);
      toast.success('Research completed successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to process the research request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-6 mt-12">
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
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg ${
              loading ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {loading ? 'Processing...' : 'Submit Research Data'}
          </button>
        </form>
      </div>

      {researchData && (
        <div className="w-full max-w-3xl bg-gray-100 dark:bg-gray-700 shadow-md rounded-lg mt-10 p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Research Data</h3>
          <FlyOpsResearcherResult data={researchData} />
        </div>
      )}
    </div>
  );
};

export default FlyOpsResearcherForm;
