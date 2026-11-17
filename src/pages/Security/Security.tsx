
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import DashboardLayout from "../../components/layout/DashboardLayout";
import securityService, {
  type SecurityEvent,
  type SecuritySummary,
} from "../../services/securityService";

import "./Security.css";

function Security() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
const [summary, setSummary] = useState<SecuritySummary>({
  totalEvents: 0,
  highSeverityEvents: 0,
  unauthorizedAccessAttempts: 0,
  invalidJwtAttempts: 0,
  sqlInjectionAttempts: 0,
  xssAttempts: 0,
});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [testing, setTesting] = useState(false);

  const fetchSecurityData = async () => {
    try {
      setError("");

      const [eventsData, summaryData] = await Promise.all([
        securityService.getEvents(),
        securityService.getSummary(),
      ]);

      setEvents(eventsData);
      setSummary(summaryData);
    } catch (err) {
      console.error("Security data error:", err);
      setError("Unable to load security data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // TEMPORARY API RATE LIMIT TEST
  const testApiRateLimit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first. JWT token not found.");
      return;
    }

    setTesting(true);

    const results: { request: number; status: number }[] = [];

    console.log("Starting API Rate Limit Test...");

    try {
      for (let i = 1; i <= 65; i++) {
        const response = await fetch(
          "http://localhost:8080/api/security/summary",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        results.push({
          request: i,
          status: response.status,
        });

        console.log(`Request ${i}: HTTP ${response.status}`);
      }

      console.table(results);

      const successful = results.filter(
        (result) => result.status === 200
      ).length;

      const blocked = results.filter(
        (result) => result.status === 429
      ).length;

      alert(
        `API Rate Limit Test completed!\nSuccessful: ${successful}\nBlocked: ${blocked}\n\nCheck the browser console for details.`
      );
    } catch (err) {
      console.error("Rate limit test failed:", err);
      alert("Rate limit test failed. Check the browser console.");
    } finally {
      setTesting(false);
    }
  };

  // TEMPORARY UNAUTHORIZED ACCESS TEST
  const testUnauthorizedAccess = async () => {
    setTesting(true);

    const results: {
      test: string;
      status: number | string;
    }[] = [];

    console.log("Starting Unauthorized Access Test...");

    try {
      // TEST 1: Access without JWT token
      const response1 = await fetch(
        "http://localhost:8080/api/dashboard",
        {
          method: "GET",
        }
      );

      results.push({
        test: "No JWT token",
        status: response1.status,
      });

      console.log(
        "Test 1 - No JWT token:",
        response1.status
      );

      // TEST 2: Access with invalid JWT token
      const response2 = await fetch(
        "http://localhost:8080/api/dashboard",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer invalid.jwt.token",
          },
        }
      );

      results.push({
        test: "Invalid JWT token",
        status: response2.status,
      });

      console.log(
        "Test 2 - Invalid JWT token:",
        response2.status
      );

      // TEST 3: Access with valid JWT token
      const token = localStorage.getItem("token");

      if (token) {
        const response3 = await fetch(
          "http://localhost:8080/api/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        results.push({
          test: "Valid JWT token",
          status: response3.status,
        });

        console.log(
          "Test 3 - Valid JWT token:",
          response3.status
        );
      } else {
        results.push({
          test: "Valid JWT token",
          status: "Skipped - no token found",
        });
      }

      console.table(results);

      alert(
        "Unauthorized Access Test completed!\n\n" +
        "No token: " + results[0].status +
        "\nInvalid token: " + results[1].status +
        "\nValid token: " + (results[2]?.status ?? "Skipped") +
        "\n\nRefresh Security Centre to view the recorded events."
      );

      // Refresh dashboard data after testing
      await fetchSecurityData();

    } catch (err) {
      console.error("Unauthorized access test failed:", err);
      alert("Test failed. Check the browser console.");
    } finally {
      setTesting(false);
    }
  };


  useEffect(() => {
    fetchSecurityData();

    const interval = setInterval(fetchSecurityData, 30000);

    return () => clearInterval(interval);
  }, []);

  const failedLogins = events.filter(
    (event) => event.eventType === "LOGIN_FAILURE"
  ).length;

  const bruteForceAlerts = events.filter(
    (event) => event.eventType === "BRUTE_FORCE"
  ).length;

  const successfulLogins = events.filter(
    (event) => event.eventType === "LOGIN_SUCCESS"
  ).length;

  const severityData = [
    {
      name: "Low",
      value: events.filter((event) => event.severity === "LOW").length,
      color: "#22c55e",
    },
    {
      name: "Medium",
      value: events.filter((event) => event.severity === "MEDIUM").length,
      color: "#eab308",
    },
    {
      name: "High",
      value: events.filter((event) => event.severity === "HIGH").length,
      color: "#f97316",
    },
    {
      name: "Critical",
      value: events.filter((event) => event.severity === "CRITICAL").length,
      color: "#ef4444",
    },
  ].filter((item) => item.value > 0);

  const chartData = (() => {
    const grouped: Record<string, { failed: number; successful: number }> = {};

    events.forEach((event) => {
      const date = new Date(event.eventTime);

      if (Number.isNaN(date.getTime())) return;

      const label = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (!grouped[label]) {
        grouped[label] = { failed: 0, successful: 0 };
      }

      if (event.eventType === "LOGIN_FAILURE") {
        grouped[label].failed++;
      }

      if (event.eventType === "LOGIN_SUCCESS") {
        grouped[label].successful++;
      }
    });

    return Object.entries(grouped)
      .map(([time, values]) => ({ time, ...values }))
      .slice(-10);
  })();


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return Number.isNaN(date.getTime())
      ? "Unknown"
      : date.toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="security-page">
        <div className="security-header">
          <div>
            <span className="security-eyebrow">SECURITY OPERATIONS</span>
            <h1>Security Centre</h1>
            <p>Monitor threats and suspicious activities across SecureBank.</p>
          </div>

          <div className="security-header-actions">
            <button
              className="security-refresh"
              onClick={testApiRateLimit}
              disabled={testing}
            >
              Test API Rate Limit
            </button>

            <button
              className="security-test-unauthorized"
              onClick={testUnauthorizedAccess}
              disabled={testing}
            >
              Test Unauthorized Access
            </button>

            <button
              className="security-refresh"
              onClick={fetchSecurityData}
              disabled={loading || testing}
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {error && <div className="security-error">{error}</div>}

        {loading ? (
          <div className="security-loading">Loading security data...</div>
        ) : (
          <>
            <div className="security-stats">
              <div className="security-stat-card">
                <div className="stat-icon blue">◈</div>
                <span>Total Security Events</span>
                <h2>{summary.totalEvents}</h2>
                <small>All recorded events</small>
              </div>

<div className="security-stat-card">
  <div className="stat-icon red">⚔</div>
  <span>SQL Injection Attempts</span>
  <h2>{summary.sqlInjectionAttempts}</h2>
  <small>Detected suspicious SQL patterns</small>
</div>

<div className="security-stat-card">
  <div className="stat-icon red">⚔</div>
  <span>XSS Attempts</span>
  <h2>{summary.xssAttempts}</h2>
  <small>Detected suspicious XSS patterns</small>
</div>
              <div className="security-stat-card">
                <div className="stat-icon red">⚠</div>
                <span>High / Critical Alerts</span>
                <h2>{summary.highSeverityEvents}</h2>
                <small>Requires attention</small>
              </div>

              <div className="security-stat-card">
                <div className="stat-icon yellow">⌁</div>
                <span>Failed Login Attempts</span>
                <h2>{failedLogins}</h2>
                <small>Among latest 100 events</small>
              </div>

              <div className="security-stat-card">
                <div className="stat-icon purple">⌘</div>
                <span>Brute Force Alerts</span>
                <h2>{bruteForceAlerts}</h2>
                <small>Detected attack thresholds</small>
              </div>
              <div className="security-stat-card">
                <div className="stat-icon red">🛡</div>
                <span>Unauthorized Access</span>
                <h2>{summary.unauthorizedAccessAttempts}</h2>
                <small>Requests without authentication</small>
              </div>

              <div className="security-stat-card">
                <div className="stat-icon purple">🔑</div>
                <span>Invalid JWT Attempts</span>
                <h2>{summary.invalidJwtAttempts}</h2>
                <small>Invalid or expired tokens</small>
              </div>
            </div>

            <div className="security-chart-grid">
              <div className="security-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Login Activity</h3>
                    <p>Successful and failed logins by time</p>
                  </div>
                  <span className="live-indicator">● LIVE</span>
                </div>

                {chartData.length === 0 ? (
                  <div className="security-empty">
                    No login activity recorded yet.
                  </div>
                ) : (
                  <div className="security-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient
                            id="failedGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#ef4444"
                              stopOpacity={0.35}
                            />
                            <stop
                              offset="95%"
                              stopColor="#ef4444"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>

                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#273449"
                        />

                        <XAxis
                          dataKey="time"
                          stroke="#8b98aa"
                          fontSize={11}
                        />

                        <YAxis stroke="#8b98aa" fontSize={11} />

                        <Tooltip
                          contentStyle={{
                            background: "#172338",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                        />

                        <Area
                          type="monotone"
                          dataKey="failed"
                          name="Failed logins"
                          stroke="#ef4444"
                          fill="url(#failedGradient)"
                        />

                        <Area
                          type="monotone"
                          dataKey="successful"
                          name="Successful logins"
                          stroke="#22c55e"
                          fill="transparent"
                        />

                        <Legend />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className="security-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Threat Severity</h3>
                    <p>Distribution of latest 100 events</p>
                  </div>
                </div>

                {severityData.length === 0 ? (
                  <div className="security-empty">
                    No security events available.
                  </div>
                ) : (
                  <div className="security-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={severityData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="45%"
                          outerRadius={90}
                          innerRadius={55}
                          paddingAngle={4}
                        >
                          {severityData.map((item) => (
                            <Cell
                              key={item.name}
                              fill={item.color}
                            />
                          ))}
                        </Pie>

                        <Tooltip
                          contentStyle={{
                            background: "#172338",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                        />

                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>

            <div className="security-activity">
              <div className="panel-heading">
                <div>
                  <h3>Recent Security Events</h3>
                  <p>Latest recorded security activities</p>
                </div>
                <span className="event-count">
                  {events.length} events
                </span>
              </div>

              <div className="security-table-wrapper">
                <table className="security-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Description</th>
                      <th>Email</th>
                      <th>IP Address</th>
                      <th>Severity</th>
                      <th>Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {events.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="security-no-data">
                          No security events recorded yet.
                        </td>
                      </tr>
                    ) : (
                      events.map((event) => (
                        <tr key={event.id}>
                          <td className="event-type">
                            {event.eventType.replaceAll("_", " ")}
                          </td>
                          <td>{event.description || "-"}</td>
                          <td>{event.email || "-"}</td>
                          <td>{event.ipAddress || "-"}</td>
                          <td>
                            <span
                              className={`severity-badge ${event.severity.toLowerCase()}`}
                            >
                              {event.severity}
                            </span>
                          </td>
                          <td>{formatDate(event.eventTime)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="security-footer">
              Successful logins in latest 100 events: {successfulLogins}
              <span> · Auto-refreshes every 30 seconds</span>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Security;
