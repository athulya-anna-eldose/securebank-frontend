import { useEffect, useState, type FormEvent } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getProfile,
  updateProfile,
  type ProfileData,
} from "../../services/profileService";

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

  // Fetch profile details when the page loads
  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "Unable to load profile information."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // Handle profile update
  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const updatedProfile = await updateProfile({
        fullName: profile.fullName,
        phone: profile.phone,
        address: profile.address,
      });

      setProfile(updatedProfile);
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Unable to update profile. Please try again."
      );
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
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
                required
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                value={profile.email}
                disabled
              />
            </label>
 <label>
              Account Number
              <input
                type="tel"
                value={profile.accountNumber}
                disabled
              />
            </label>
            <label>
              Phone Number
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                required
              />
            </label>

            <label>
              Address
              <input
                type="text"
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
              />
            </label>

            {error && <p className="profile-error">{error}</p>}

            {success && <p className="profile-success">{success}</p>}

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