import { useEffect, useState } from "react";
import axios from "axios";
import DailyPredictionCard from "./DailyPredictionCard";

export default function TodayPredictionPage() {
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getTodayPrediction = async () => {
            // const token = localStorage.getItem("token");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/get/todayPredict`,
                    {
                        withCredentials: true,
                    }
                    // {
                    //     headers: {
                    //         Authorization: `Bearer ${token}`
                    //     }
                    // }
                );

                console.log("Today's prediction:", response.data);

                setPrediction(response.data.prediction);

            } catch (error) {
                console.error(
                    error.response?.data || error.message
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load today's prediction."
                );
            } finally {
                setLoading(false);
            }
        };

        getTodayPrediction();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0d0d15] px-6 py-10 text-white">
                <div className="mx-auto max-w-3xl">
                    <p className="text-gray-400">
                        Loading today's prediction...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#0d0d15] px-6 py-10 text-white">
                <div className="mx-auto max-w-3xl">
                    <p className="text-rose-400">
                        {error}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0d0d15] px-6 py-10">

            <div className="mx-auto  h-screen flex items-center justify-center">
                <DailyPredictionCard
                    prediction={prediction}
                />
            </div>

        </main>
    );
}