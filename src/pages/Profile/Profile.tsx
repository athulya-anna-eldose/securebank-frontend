
import { useEffect, useState, type FormEvent } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getProfile,
  updateProfile,
  type ProfileData,
} from "../../services/profileService";

function getErrorMessage(err: any): string {
  const data = err.response?.data;

  if (typeof data === "string") {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.errors && Array.isArray(data.errors)) {
    return data.errors
      .map((item: any) => item.defaultMessage || item.message)
      .filter(Boolean)
      .join(", ");
  }

  if (data?.errors && typeof data.errors === "object") {
    return Object.values(data.errors).join(", ");
  }

  if (data?.detail) {
    return data.detail;
  }

  if (err.response?.status === 400) {
    return "Invalid details. Please check your name, phone number and address.";
  }

  return "Unable to update profile. Please try again.";
}

function Profile() {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "",
    email: "",
    accountNumber: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err: any) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedProfile = await updateProfile({
        fullName: profile.fullName,
        phone: profile.phone,
        address: profile.address,
      });

      setProfile(updatedProfile);
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      console.error("Profile update error:", err);
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout>
      <h1 className="page-title">My Profile</h1>

      <p className="page-description">
        View and manage your personal information.
      </p>

      <div className="content-card">
        <h3>Personal Information</h3>

        {loading ? (
          <p>Loading profile...</p>
        ) : (
          <form className="bank-form" onSubmit={handleUpdate}>
            <label>
              Full Name
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => {
                  setProfile({ ...profile, fullName: e.target.value });
                  setError("");
                  setSuccess("");
                }}
                required
                minLength={2}
                maxLength={60}
              />
            </label>

            <label>
              Email Address
              <input type="email" value={profile.email} disabled />
            </label>

            <label>
              Account Number
              <input
                type="text"
                value={profile.accountNumber}
                disabled
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => {
                  setProfile({ ...profile, phone: e.target.value });
                  setError("");
                  setSuccess("");
                }}
                required
                pattern="^\+?[0-9]{10,15}$"
                title="Enter 10 to 15 digits, optionally starting with +"
              />
            </label>

            <label>
              Address
              <input
                type="text"
                value={profile.address}
                onChange={(e) => {
                  setProfile({ ...profile, address: e.target.value });
                  setError("");
                  setSuccess("");
                }}
                maxLength={250}
              />
            </label>

            {error && (
              <p className="profile-error" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="profile-success" role="status">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="bank-button"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Profile"}
            </button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Profile;
