"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { themes } from "../config/themeConfig";
import InnerBanner from "../components/InnerBanner";
import { apiInfo } from "../service/api";
import { FaMapMarkerAlt } from "react-icons/fa";

const distributorBanner = "/images/serviceBanner.jpg";

export default function Distributors() {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        setLoading(true);
        const response = await apiInfo.get("/distributor-information/?status=Approved");
        const data = response.data.data || [];
        setDistributors(data);
      } catch (err) {
        console.error("Error fetching distributors:", err);
        setError("Failed to load distributors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  // Grouping logic to get unique cities per state
  const getStatesWithCityCount = (list) => {
    const stateMap = list.reduce((acc, d) => {
      let stateName = d.state || d.sales_region || "Other";

      stateName = stateName.trim().toLowerCase();
      stateName = stateName.charAt(0).toUpperCase() + stateName.slice(1);

      if (stateName === "Gujrat") stateName = "Gujarat";

      if (!acc[stateName]) {
        acc[stateName] = new Set();
      }

      if (d.city) {
        let cityName = d.city.trim().toLowerCase();
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        acc[stateName].add(cityName);
      }
      return acc;
    }, {});

    return Object.keys(stateMap)
      .map(stateName => ({
        name: stateName,
        cityCount: stateMap[stateName].size
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const statesData = getStatesWithCityCount(distributors);

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: themes.backgroundBlack }}>
      <InnerBanner
        title="Our Distributors"
        current="Distributors"
        bg={distributorBanner}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-lg font-medium">Fetching our network...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-xl">{error}</p>
          </div>
        ) : statesData.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white text-xl font-medium">No active network regions found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {statesData.map((stateItem, index) => (
              <Link
                key={stateItem.name}
                href="/contact"
                className="group relative flex flex-col justify-between overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-[var(--primary)] hover:shadow-[0_10px_30px_rgba(210,0,0,0.15)] hover:-translate-y-2 animate-fadeIn cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Decorative hover background glow */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex items-start justify-between gap-4 mb-6">
                  {/* Icon & State Name */}
                  <div className="flex flex-col gap-2">
                    <span className="p-3 w-fit rounded-xl bg-white/[0.05] border border-white/10 text-[var(--primary)] group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] transition-colors duration-300">
                      <FaMapMarkerAlt className="text-xl sm:text-2xl" />
                    </span>
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-white tracking-wide mt-2 group-hover:text-[var(--primary)] transition-colors duration-300"
                      style={{ fontFamily: themes.fontPrimary }}
                    >
                      {stateItem.name}
                    </h3>
                  </div>
                </div>

                {/* City Count Display */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-gray-400 text-sm font-medium">Active Cities</span>
                  <span className="px-3.5 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-bold font-mono group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300">
                    {stateItem.cityCount} {stateItem.cityCount === 1 ? 'City' : 'Cities'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
