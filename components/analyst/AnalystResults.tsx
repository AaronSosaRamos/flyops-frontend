import React from 'react';
import { FaClock, FaLink, FaSuitcase, FaList, FaInfoCircle, FaStopwatch, FaPlane } from 'react-icons/fa';

interface DataProps {
  data: any;
}

const FlightCard: React.FC<{ flight: any }> = ({ flight }) => {
  if (!flight) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
          {flight.airline || 'Unknown Airline'} - {flight.flight_number || 'N/A'}
        </h2>
        <span className="text-green-600 dark:text-green-400 font-bold">
          ${flight.price || 'N/A'}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        <FaClock className="inline-block mr-2" /> 
        {flight.departure_time || 'N/A'} - {flight.arrival_time || 'N/A'} ({flight.duration || 'N/A'})
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        <FaSuitcase className="inline-block mr-2" /> {flight.aircraft_type || 'N/A'} ({flight.seat_class || 'N/A'})
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        <FaStopwatch className="inline-block mr-2" /> Stops: {flight.stops || 0}
      </p>
      {flight.layover_cities && flight.layover_cities.length > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Layovers: {flight.layover_cities.join(', ')}
        </p>
      )}
      {flight.amenities && flight.amenities.length > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <FaList className="inline-block mr-2" /> Amenities: {flight.amenities.join(', ')}
        </p>
      )}
      {flight.booking_link && (
        <a
          href={flight.booking_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 dark:text-blue-300 hover:underline text-sm flex items-center mt-2"
        >
          <FaLink className="mr-2" /> Book Now
        </a>
      )}
    </div>
  );
};

const CostBreakdown: React.FC<{ breakdown: any }> = ({ breakdown }) => {
  if (!breakdown || Object.keys(breakdown).length === 0) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Cost Breakdown
      </h3>
      <ul className="text-sm text-gray-600 dark:text-gray-400">
        {Object.entries(breakdown).map(([key, value]) => (
          <li key={key} className="flex justify-between">
            <span>{key}:</span>
            <span>${String(value) || 'N/A'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Recommendations: React.FC<{ recommendations: any[] }> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Recommendations
      </h3>
      <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

const FlyOpsAnalystDataDisplay: React.FC<DataProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8">Travel Insights</h1>
      
      {data.recommended_flights && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Recommended Flights
          </h2>
          {data.recommended_flights.map((flight: any, index: number) => (
            <FlightCard key={index} flight={flight} />
          ))}
        </section>
      )}

      {data.cost_breakdown && <CostBreakdown breakdown={data.cost_breakdown} />}

      {data.alternative_routes && data.alternative_routes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Alternative Routes
          </h2>
          {data.alternative_routes.map((flight: any, index: number) => (
            <FlightCard key={index} flight={flight} />
          ))}
        </section>
      )}

      {data.recommendations && <Recommendations recommendations={data.recommendations} />}

      {data.analysis_details && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Analysis Details
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <FaInfoCircle className="inline-block mr-2" /> {data.analysis_details.criteria || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Methods: {data.analysis_details.methods || 'N/A'}
          </p>
        </section>
      )}

      {data.potential_challenges && data.potential_challenges.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Potential Challenges
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
            {data.potential_challenges.map((challenge: string, index: number) => (
              <li key={index}>{challenge}</li>
            ))}
          </ul>
        </section>
      )}

      {data.additional_notes && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Additional Notes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.additional_notes}</p>
        </section>
      )}

      {data.resources && data.resources.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Resources
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
            {data.resources.map((resource: string, index: number) => (
              <li key={index}>
                <a href={resource} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300 hover:underline">
                  {resource}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.contact_information && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Contact Information
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.contact_information}</p>
        </section>
      )}

      {data.legal_disclaimer && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Legal Disclaimer
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.legal_disclaimer}</p>
        </section>
      )}
    </div>
  );
};

export default FlyOpsAnalystDataDisplay;
