
import DashboardLayout from "../../components/layout/DashboardLayout";

function Profile() {
  return (
    <DashboardLayout>
      <h1 className="page-title">My Profile</h1>
      <p className="page-description">
        View and manage your personal information.
      </p>

      <div className="content-card">
        <h3>Personal Information</h3>

        <form className="bank-form">
          <label>
            Full Name
            <input type="text" defaultValue="Account Holder" />
          </label>

          <label>
            Email Address
            <input type="email" defaultValue="user@example.com" />
          </label>

          <label>
            Phone Number
            <input type="tel" placeholder="Enter phone number" />
          </label>

          <label>
            Address
            <input type="text" placeholder="Enter your address" />
          </label>

          <button type="button" className="bank-button">
            Update Profile
          </button>
        </form>
      </div>

      <div className="content-card">
        <h3>Account Information</h3>
        <p>Account Number: SB000123456</p>
        <p>Account Type: Savings Account</p>
        <p>Account Status: Active</p>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
