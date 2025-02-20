import React from 'react'

function Profile() {
  // Mock user data - in a real app, this would come from an authentication context
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2024-01-01'
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-gray-900">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <p className="mt-1 text-gray-900">{user.joinDate}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <button className="btn-secondary">
              Change Password
            </button>
            <button className="btn-secondary">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile