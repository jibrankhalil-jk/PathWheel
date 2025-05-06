import { useState } from "react";

class PathWheelData {
    constructor() {
        this.batteryPercentage = 75;
        this.batteryTimeRemaining = '4h';

        this.currentSpeed = 3.2;
        this.maxSpeed = 5.7;
        this.avgSpeed = 2.9;

        this.heartRate = 72;
        this.temperature = 36.5;
        this.bloodOxygen = 98;

        this.todayDistance = 1.8;
        this.totalDistance = 47.5;

        this.systemStatus = [
            { name: 'Motors', status: 'Operational', state: 'green' },
            { name: 'Sensors', status: 'Operational', state: 'green' },
            { name: 'Left Wheel', status: 'Check Pressure', state: 'yellow' },
            { name: 'Navigation', status: 'Connected', state: 'green' },
        ];
    }
}

const PathWheel = () => {
    const [dashboardData] = useState(new PathWheelData());

    // Helper function to get color classes based on state
    const getStateColorClass = (state) => {
        switch (state) {
            case 'green': return 'text-green-600';
            case 'yellow': return 'text-yellow-600';
            case 'red': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getStateBgClass = (state) => {
        switch (state) {
            case 'green': return 'bg-green-500';
            case 'yellow': return 'bg-yellow-500';
            case 'red': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <>
            <div className="container pt-4 px-4">
                <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300">
                    <h1 className="text-3xl font-bold text-gray-800">PathWheel Dashboard</h1>
                    <div className="text-gray-600">{new Date().toLocaleString()}</div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-lg border  border-gray-200">
                        <h2 className="text-xl font-semibold mb-3 text-gray-700">Battery Status</h2>
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                            <div className="bg-green-500 h-4 rounded-full" style={{ width: `${dashboardData.batteryPercentage}%` }}></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>{dashboardData.batteryPercentage}%</span>
                            <span>Est. {dashboardData.batteryTimeRemaining} remaining</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 ">
                        <h2 className="text-xl font-semibold mb-3 text-gray-700">Current Speed</h2>
                        <div className="text-center my-4">
                            <div className="text-4xl font-bold text-blue-600">{dashboardData.currentSpeed}</div>
                            <div className="text-gray-500">km/h</div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <div>Max: {dashboardData.maxSpeed} km/h</div>
                            <div>Avg: {dashboardData.avgSpeed} km/h</div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 ">
                        <h2 className="text-xl font-semibold mb-3 text-gray-700">Health Metrics</h2>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="text-center">
                                <span className="block text-gray-500 text-sm">Heart Rate</span>
                                <span className="block font-bold text-gray-800">{dashboardData.heartRate} BPM</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-gray-500 text-sm">Temperature</span>
                                <span className="block font-bold text-gray-800">{dashboardData.temperature}°C</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-gray-500 text-sm">Blood Oxygen</span>
                                <span className="block font-bold text-gray-800">{dashboardData.bloodOxygen}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 ">
                        <h2 className="text-xl font-semibold mb-3 text-gray-700">Distance</h2>
                        <div className="flex justify-around">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-gray-800">{dashboardData.todayDistance} km</span>
                                <span className="block text-gray-500">Today</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-gray-800">{dashboardData.totalDistance} km</span>
                                <span className="block text-gray-500">Total</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 ">
                        <h2 className="text-xl font-semibold mb-3 text-gray-700">System Status</h2>
                        <ul className="space-y-2">
                            {dashboardData.systemStatus.map((item, index) => (
                                <li key={index} className={`flex items-center ${getStateColorClass(item.state)}`}>
                                    <span className={`w-3 h-3 ${getStateBgClass(item.state)} rounded-full mr-2`}></span>
                                    {item.name}: {item.status}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 ">
                        <h2 className="text-xl font-semibold mb-3 text-gray-700">Assistance</h2>
                        <div className="grid grid-cols-1 gap-2">
                            <button className="bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors">Emergency Call</button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors">Request Help</button>
                            <button className="bg-gray-700 hover:bg-gray-800 text-white py-2 rounded transition-colors">Navigation</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PathWheel;