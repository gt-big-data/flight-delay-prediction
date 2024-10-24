import React from "react";
import { icons, images } from "../../constants";

const Profile = ({ userName, userEmail, onLogout }) => {
  return (
    <div className="flex flex-col h-full justify-between">
      {/* User Information */}
      <div className="space-y-2 border border-gray-200 rounded-lg p-4 pb-2 mb-4 shadow-sm">
        {/* <h2 className="text-base font-semibold text-gray-800">User</h2> */}
        <div className="">
          {/* Profile Picture */}
          <div className="flex items-center space-x-3 mb-2">
            <img
              src={icons.user}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <div>
              <p className="font-medium text-base">{userName}</p>
              <p className="text-sm">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="bg-red-600 text-white text-sm font-semibold py-2 px-6 rounded-md hover:bg-red-400 transition-colors w-full"
        >
          Sign Out
        </button>

        {/* Footer Section */}
        {/* <div className="text-xs text-gray-500 text-center">
          <p>Georgia Tech Big Data Big Impact (BDBI)</p>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
