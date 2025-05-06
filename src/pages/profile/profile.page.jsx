import { useState } from "react";

const ProfilePage = () => {
    const [userData, setUserData] = useState({
        uid: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        profile_img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        created_at: '2023-01-15 14:30:45',
        dob: '1990-05-20',
        address: 'San Francisco, CA',
        status: true,
        medical: {
            disabilities: 'None',
            blood_group: 'O+',
            emergency_contact: '+1 (555) 123-4567',
            info: 'No known allergies'
        }
    });

    // Format the created_at date
    const joinedDate = new Date(userData.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-8 sm:px-6">
                        <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
                            <div className="mb-4 sm:mb-0">
                                <img 
                                    src={userData.profile_img} 
                                    alt="Profile" 
                                    className="h-24 w-24 rounded-full ring-4 ring-white"
                                />
                            </div>
                            <div className="text-center sm:text-left"> 
                                <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
                                <p className="text-blue-100">{userData.email}</p>
                                <p className="text-blue-100 mt-1"> 
                                    <span className="mr-2">📍 {userData.address}</span>
                                    <span>🗓 Joined {joinedDate}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Profile Content */}
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium text-gray-900">About</h3>
                        <p className="mt-1 text-gray-600">User #{userData.uid}</p>
                        
                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
                            <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="mt-1 text-gray-900">{userData.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                                    <dd className="mt-1 text-gray-900">{userData.address}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                                    <dd className="mt-1 text-gray-900">{userData.dob}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Member since</dt>
                                    <dd className="mt-1 text-gray-900">{joinedDate}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Account Status</dt>
                                    <dd className="mt-1 text-gray-900">
                                        {userData.status ? 
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span> : 
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Inactive</span>
                                        }
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900">Medical Information</h3>
                            <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Disabilities</dt>
                                    <dd className="mt-1 text-gray-900">{userData.medical.disabilities}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Blood Group</dt>
                                    <dd className="mt-1 text-gray-900">{userData.medical.blood_group}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Emergency Contact</dt>
                                    <dd className="mt-1 text-gray-900">{userData.medical.emergency_contact}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Medical Info</dt>
                                    <dd className="mt-1 text-gray-900">{userData.medical.info}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    
                    {/* Profile Actions */}
                    <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Edit Profile
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ProfilePage;