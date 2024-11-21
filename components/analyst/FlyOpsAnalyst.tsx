import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMapMarkerAlt, FaMapSigns, FaCalendarAlt, FaDollarSign, FaPlaneDeparture } from 'react-icons/fa';
import FlyOpsAnalystDataDisplay from './AnalystResults';
import axiosInstance from '@/utils/axiosInstance';

interface FormData {
  origin: string;
  destination: string;
  date: string;
  available_budget: number;
}

const schema = yup.object({
  origin: yup.string().required('Origin airport is required'),
  destination: yup.string().required('Destination airport is required'),
  date: yup
    .string()
    .required('Date of travel is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD'),
  available_budget: yup
    .number()
    .required('Budget is required')
    .positive('Budget must be positive')
    .typeError('Invalid budget format'),
}).required();

const FlyOpsAnalystForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [analysisData, setAnalysisData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    toast.info('Submitting your request...');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/flyops-analyst', data);
      setAnalysisData(response.data);
      toast.success('Analysis completed successfully!');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'An error occurred while processing your request.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-[68px] bg-gray-100 dark:bg-gray-900 p-4">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
      
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-10 dark:bg-gray-800 transition-transform transform hover:scale-105">
        <h2 className="flex items-center justify-center text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          <FaPlaneDeparture className="text-blue-500 dark:text-blue-400 mr-3" /> FlyOps Analyst
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Please provide the necessary details for your flight analysis. Our team will help you manage flights within your budget.
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400 mr-3 text-xl" />
            <input
              type="text"
              placeholder="Origin Airport"
              {...register('origin')}
              className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-500"
            />
          </div>
          {errors.origin && <p className="text-red-600 text-sm">{errors.origin.message}</p>}

          <div className="relative flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <FaMapSigns className="text-blue-500 dark:text-blue-400 mr-3 text-xl" />
            <input
              type="text"
              placeholder="Destination Airport"
              {...register('destination')}
              className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-500"
            />
          </div>
          {errors.destination && <p className="text-red-600 text-sm">{errors.destination.message}</p>}

          <div className="relative flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <FaCalendarAlt className="text-blue-500 dark:text-blue-400 mr-3 text-xl" />
            <input
              type="date"
              {...register('date')}
              className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-500"
            />
          </div>
          {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}

          <div className="relative flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <FaDollarSign className="text-blue-500 dark:text-blue-400 mr-3 text-xl" />
            <input
              type="number"
              step="0.01"
              placeholder="Available Budget (USD)"
              {...register('available_budget')}
              className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-500"
            />
          </div>
          {errors.available_budget && <p className="text-red-600 text-sm">{errors.available_budget.message}</p>}

          <button
            type="submit"
            disabled={loading} 
            className={`w-full text-white py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>

      {analysisData && (
        <div className="w-full max-w-5xl mt-10">
          <FlyOpsAnalystDataDisplay data={analysisData} />
        </div>
      )}
    </div>
  );
};

export default FlyOpsAnalystForm;
