import React, { useState, useEffect } from "react";
import { auth, firestore } from '../../firebase-config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const Notification = () => {
  const [frequency, setFrequency] = useState('daily');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Load current user's frequency setting
  useEffect(() => {
    const loadUserSettings = async () => {
      if (auth.currentUser) {
        const userDoc = doc(firestore, 'users', auth.currentUser.uid);
        try {
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            setFrequency(docSnap.data().updateFrequency);
          }
        } catch (error) {
          console.error("Error loading user settings:", error);
        }
      }
    };
    loadUserSettings();
  }, []);

  const handleSave = async () => {
    if (!auth.currentUser) return;

    setIsSaving(true);
    setSaveStatus('');

    try {
      const userDoc = doc(firestore, 'users', auth.currentUser.uid);
      await updateDoc(userDoc, {
        updateFrequency: frequency
      });
      setSaveStatus('Settings saved successfully!');
    } catch (error) {
      console.error("Error updating frequency:", error);
      setSaveStatus('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Notification Settings</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Update Frequency
        </label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-[#0360F0] text-white px-4 py-2 rounded-md hover:bg-blue-500 disabled:bg-gray-400"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>

      {saveStatus && (
        <p className={`mt-2 text-sm ${saveStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {saveStatus}
        </p>
      )}
    </div>
  );
};

// make me a drop down menu

export default Notification;
