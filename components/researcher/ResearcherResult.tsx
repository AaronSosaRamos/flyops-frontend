import React from 'react';
import { FaLightbulb, FaRocket, FaClipboardList, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';

interface DataProps {
  data: any;
}

const TrendCard: React.FC<{ trend: any }> = ({ trend }) => {
  if (!trend) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center mb-2">
        <FaLightbulb className="mr-2" /> {trend.trend_name || 'Unknown Trend'}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {trend.description || 'No description available.'}
      </p>
      {trend.data_points && trend.data_points.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center">
            <FaClipboardList className="mr-2" /> Data Points
          </h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
            {trend.data_points.map((point: any, index: number) => (
              <li key={index}>
                {Object.entries(point)
                  .map(([key, value]) => `${key}: ${value || 'N/A'}`)
                  .join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        <strong>Analysis Method:</strong> {trend.analysis_method || 'N/A'}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        <strong>Implications:</strong> {trend.implications || 'N/A'}
      </p>
      {trend.recommendations && trend.recommendations.length > 0 && (
        <div>
          <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center">
            <FaArrowRight className="mr-2" /> Recommendations
          </h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
            {trend.recommendations.map((rec: string, index: number) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const InnovationCard: React.FC<{ innovation: any }> = ({ innovation }) => {
  if (!innovation) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center mb-2">
        <FaRocket className="mr-2" /> {innovation.innovation_name || 'Unknown Innovation'}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {innovation.description || 'No description available.'}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        <strong>Impact:</strong> {innovation.impact || 'N/A'}
      </p>
      {innovation.supporting_data && innovation.supporting_data.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center">
            <FaClipboardList className="mr-2" /> Supporting Data
          </h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
            {innovation.supporting_data.map((data: any, index: number) => (
              <li key={index}>
                {Object.entries(data)
                  .map(([key, value]) => `${key}: ${value || 'N/A'}`)
                  .join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
      {innovation.references && innovation.references.length > 0 && (
        <div>
          <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center">
            <FaClipboardList className="mr-2" /> References
          </h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
            {innovation.references.map((ref: string, index: number) => (
              <li key={index}>{ref}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const FlyOpsResearcherResult: React.FC<DataProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8 flex items-center">
        <FaLightbulb className="mr-2" /> Aviation Insights
      </h1>

      {data.insights && data.insights.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaClipboardList className="mr-2" /> Insights
          </h2>
          {data.insights.map((trend: any, index: number) => (
            <TrendCard key={index} trend={trend} />
          ))}
        </section>
      )}

      {data.innovations && data.innovations.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaRocket className="mr-2" /> Innovations
          </h2>
          {data.innovations.map((innovation: any, index: number) => (
            <InnovationCard key={index} innovation={innovation} />
          ))}
        </section>
      )}

      {data.overall_analysis && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaExclamationTriangle className="mr-2" /> Overall Analysis
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.overall_analysis}</p>
        </section>
      )}

      {data.future_trends && data.future_trends.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaArrowRight className="mr-2" /> Future Trends
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
            {data.future_trends.map((trend: string, index: number) => (
              <li key={index}>{trend}</li>
            ))}
          </ul>
        </section>
      )}

      {data.recommendations && data.recommendations.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaArrowRight className="mr-2" /> Recommendations
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
            {data.recommendations.map((rec: string, index: number) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </section>
      )}

      {data.additional_notes && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaClipboardList className="mr-2" /> Additional Notes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.additional_notes}</p>
        </section>
      )}

      {data.contact_information && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaClipboardList className="mr-2" /> Contact Information
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.contact_information}</p>
        </section>
      )}

      {data.legal_disclaimer && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaExclamationTriangle className="mr-2" /> Legal Disclaimer
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.legal_disclaimer}</p>
        </section>
      )}
    </div>
  );
};

export default FlyOpsResearcherResult;
