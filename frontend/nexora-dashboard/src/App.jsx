import { useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

const graphData = {
  nodes: [
    { id: "C-102", label: "Case C-102", type: "case" },
    { id: "Person A", label: "Person A", type: "person" },
    { id: "Person B", label: "Person B", type: "person" },
    { id: "Vehicle X", label: "Vehicle X", type: "vehicle" },
    { id: "C-087", label: "Case C-087", type: "case" },
    { id: "Location Y", label: "Location Y", type: "location" }
  ],

  links: [
    { source: "C-102", target: "Person A", label: "Associated With" },
    { source: "C-102", target: "Person B", label: "Associated With" },
    { source: "Person B", target: "Location Y", label: "Located At" },
    { source: "Person A", target: "Vehicle X", label: "Uses" },
    { source: "Vehicle X", target: "C-087", label: "Linked To" }
  ]
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [activeSection, setActiveSection] =
    useState("Dashboard");

  const [search, setSearch] = useState("");
  const [result, setResult] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const menuItems = [
    "Dashboard",
    "Cases",
    "Entities",
    "Network Analysis",
    "Timeline",
    "Reports"
  ];

  /* ================= LOGIN ================= */

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setActiveSection("Dashboard");
  };

  /* ================= SEARCH ================= */

  const handleSearch = () => {
    if (search.trim() === "") {
      setResult(false);
      setShowDetails(false);
    } else {
      setResult(true);
      setShowDetails(false);
    }
  };

  /* ================= LOGIN SCREEN ================= */

  if (!isLoggedIn) {
    return (
      <div className="login-page">

        <div className="login-card">

          <div className="login-logo">
            NEXORA
          </div>

          <p className="login-subtitle">
            Investigation Intelligence Platform
          </p>

          <div className="demo-badge">
            SYNTHETIC DEMO ENVIRONMENT
          </div>

          <form onSubmit={handleLogin}>

            <label>Investigator ID</label>

            <input
              type="text"
              placeholder="Enter investigator ID"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="submit"
              className="login-button"
            >
              Secure Login
            </button>

          </form>

          <p className="login-note">
            Demo access: enter any ID and password.
          </p>

        </div>

      </div>
    );
  }

  /* ================= MAIN APPLICATION ================= */

  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <h1>NEXORA</h1>

        <p className="subtitle">
          Investigation Intelligence
        </p>

        <nav>

          {menuItems.map((item) => (
            <button
              key={item}
              className={
                activeSection === item
                  ? "active-menu"
                  : ""
              }
              onClick={() => {
                setActiveSection(item);
                setResult(false);
                setShowDetails(false);
              }}
            >
              {item}
            </button>
          ))}

        </nav>

      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main className="main-content">

        {/* TOP HEADER */}

        <div className="top-header">

          <div>

            <span className="system-status">
              ● SYSTEM ONLINE
            </span>

            <span className="demo-status">
              SYNTHETIC DEMO DATA
            </span>

          </div>

          <div className="investigator-area">

            <span className="notification">
              🔔
            </span>

            <div className="investigator-info">

              <strong>
                Investigator
              </strong>

              <span>
                {username || "Demo User"}
              </span>

            </div>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= DASHBOARD ===================== */}
        {/* ================================================= */}

        {activeSection === "Dashboard" && (
          <>

            <header>

              <h2>
                Investigation Dashboard
              </h2>

              <p>
                AI-Powered Criminal Network Analysis System
              </p>

            </header>

            {/* ================= STATISTICS ================= */}

            <section className="stats">

              <div className="card">
                <h3>245</h3>
                <p>Total Cases</p>
              </div>

              <div className="card">
                <h3>680</h3>
                <p>Entities</p>
              </div>

              <div className="card">
                <h3>1,240</h3>
                <p>Relationships</p>
              </div>

              <div className="card">
                <h3>12</h3>
                <p>Patterns for Review</p>
              </div>

            </section>

            {/* ================= SEARCH ================= */}

            <section className="panel">

              <h3>
                Search Investigation Data
              </h3>

              <input
                type="text"
                placeholder="Search case, person, vehicle..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <button onClick={handleSearch}>
                Search
              </button>

              {result && (
                <div className="case-result">

                  <h3>
                    Case C-102
                  </h3>

                  <p>
                    <strong>Status:</strong>{" "}
                    Under Investigation
                  </p>

                  <p>
                    <strong>Linked Entities:</strong>{" "}
                    5
                  </p>

                  <p>
                    <strong>Related Cases:</strong>{" "}
                    2
                  </p>

                  <button
                    onClick={() =>
                      setShowDetails(true)
                    }
                  >
                    View Case Details
                  </button>

                  {showDetails && (
                    <div className="case-details">

                      <h3>
                        Case C-102 Details
                      </h3>

                      <p>
                        <strong>Status:</strong>{" "}
                        Under Investigation
                      </p>

                      <p>
                        <strong>Primary Entities:</strong>{" "}
                        Person A, Person B
                      </p>

                      <p>
                        <strong>Vehicle:</strong>{" "}
                        Vehicle X
                      </p>

                      <p>
                        <strong>Location:</strong>{" "}
                        Location Y
                      </p>

                      <p>
                        <strong>Related Case:</strong>{" "}
                        C-087
                      </p>

                      <button
                        onClick={() =>
                          setShowDetails(false)
                        }
                      >
                        Close
                      </button>

                    </div>
                  )}

                </div>
              )}

            </section>

            {/* ================= AI INSIGHTS ================= */}

            <section className="panel ai-insights">

              <div className="insight-header">

                <div>

                  <h3>
                    🤖 AI Investigation Insights
                  </h3>

                  <p>
                    Analytical leads identified from
                    synthetic investigation data
                  </p>

                </div>

                <span className="ai-badge">
                  AI ANALYSIS
                </span>

              </div>

              <div className="insight-grid">

                <div className="insight-card">

                  <span className="insight-icon">
                    🔗
                  </span>

                  <div>

                    <h4>
                      Cross-Case Connection
                    </h4>

                    <p>
                      A relationship was detected
                      between Case C-102 and Case C-087
                      through Vehicle X.
                    </p>

                  </div>

                </div>

                <div className="insight-card">

                  <span className="insight-icon">
                    🚗
                  </span>

                  <div>

                    <h4>
                      Repeated Vehicle
                    </h4>

                    <p>
                      Vehicle X appears across multiple
                      synthetic investigation records.
                    </p>

                  </div>

                </div>

                <div className="insight-card">

                  <span className="insight-icon">
                    👤
                  </span>

                  <div>

                    <h4>
                      Common Entity
                    </h4>

                    <p>
                      Person B is connected with more
                      than one investigation record.
                    </p>

                  </div>

                </div>

                <div className="insight-card">

                  <span className="insight-icon">
                    📍
                  </span>

                  <div>

                    <h4>
                      Shared Location
                    </h4>

                    <p>
                      Location Y appears in multiple
                      relationship records.
                    </p>

                  </div>

                </div>

              </div>

              <div className="verification-note">

                ⚠️ AI-generated insights are analytical
                leads only. Final verification must be
                performed by authorized investigators.

              </div>

            </section>

            {/* ================= PATTERNS ================= */}

            <section className="panel">

              <h3>
                Patterns for Review
              </h3>

              <div className="patterns">

                <div className="pattern-card">

                  <h4>
                    Repeated Vehicle Connection
                  </h4>

                  <p>
                    Vehicle X appears in multiple
                    case records.
                  </p>

                  <span>
                    Review Required
                  </span>

                </div>

                <div className="pattern-card">

                  <h4>
                    Common Person Across Cases
                  </h4>

                  <p>
                    Person B is associated with more
                    than one case.
                  </p>

                  <span>
                    Review Required
                  </span>

                </div>

                <div className="pattern-card">

                  <h4>
                    Shared Location
                  </h4>

                  <p>
                    Location Y appears in multiple
                    investigation records.
                  </p>

                  <span>
                    Review Required
                  </span>

                </div>

              </div>

            </section>

          </>
        )}

        {/* ================================================= */}
        {/* ================= CASES ========================= */}
        {/* ================================================= */}

        {activeSection === "Cases" && (
          <>

            <header>

              <h2>
                Cases
              </h2>

              <p>
                Investigation case records
              </p>

            </header>

            <section className="panel">

              <h3>
                Active Investigation Cases
              </h3>

              <div className="related-cases">

                <div className="related-case">

                  <h4>
                    Case C-102
                  </h4>

                  <p>
                    Status: Under Investigation
                  </p>

                  <span>
                    5 Linked Entities
                  </span>

                </div>

                <div className="related-case">

                  <h4>
                    Case C-087
                  </h4>

                  <p>
                    Status: Under Review
                  </p>

                  <span>
                    3 Linked Entities
                  </span>

                </div>

                <div className="related-case">

                  <h4>
                    Case C-115
                  </h4>

                  <p>
                    Status: Under Investigation
                  </p>

                  <span>
                    4 Linked Entities
                  </span>

                </div>

              </div>

            </section>

          </>
        )}

        {/* ================================================= */}
        {/* ================= ENTITIES ====================== */}
        {/* ================================================= */}

        {activeSection === "Entities" && (
          <>

            <header>

              <h2>
                Entities
              </h2>

              <p>
                People, vehicles, locations and cases
              </p>

            </header>

            <section className="panel">

              <h3>
                Entity Records
              </h3>

              <div className="related-cases">

                <div className="related-case">

                  <h4>
                    Person A
                  </h4>

                  <p>
                    Entity Type: Person
                  </p>

                  <span>
                    Linked to Case C-102
                  </span>

                </div>

                <div className="related-case">

                  <h4>
                    Person B
                  </h4>

                  <p>
                    Entity Type: Person
                  </p>

                  <span>
                    Linked to 2 Cases
                  </span>

                </div>

                <div className="related-case">

                  <h4>
                    Vehicle X
                  </h4>

                  <p>
                    Entity Type: Vehicle
                  </p>

                  <span>
                    Linked to C-102 and C-087
                  </span>

                </div>

                <div className="related-case">

                  <h4>
                    Location Y
                  </h4>

                  <p>
                    Entity Type: Location
                  </p>

                  <span>
                    Linked to Person B
                  </span>

                </div>

              </div>

            </section>

          </>
        )}

        {/* ================================================= */}
        {/* ================ NETWORK ANALYSIS =============== */}
        {/* ================================================= */}

        {activeSection === "Network Analysis" && (
          <>

            <header>

              <h2>
                Network Analysis
              </h2>

              <p>
                Interactive relationship network
              </p>

            </header>

            <section className="panel">

              <h3>
                Entity Relationship Graph
              </h3>

              <div className="network-box">

                <ForceGraph2D
                  graphData={graphData}
                  width={800}
                  height={400}
                  nodeLabel="label"
                  nodeAutoColorBy="type"

                  nodeCanvasObject={(
                    node,
                    ctx,
                    globalScale
                  ) => {

                    const label =
                      node.label;

                    const fontSize =
                      12 / globalScale;

                    ctx.beginPath();

                    ctx.arc(
                      node.x,
                      node.y,
                      6,
                      0,
                      2 * Math.PI
                    );

                    ctx.fill();

                    ctx.font =
                      `${fontSize}px Arial`;

                    ctx.textAlign =
                      "center";

                    ctx.textBaseline =
                      "middle";

                    ctx.fillStyle =
                      "#ffffff";

                    ctx.fillText(
                      label,
                      node.x,
                      node.y + 14
                    );

                  }}

                  linkCanvasObject={(
                    link,
                    ctx,
                    globalScale
                  ) => {

                    const start =
                      link.source;

                    const end =
                      link.target;

                    if (
                      !start ||
                      !end ||
                      start.x === undefined ||
                      start.y === undefined ||
                      end.x === undefined ||
                      end.y === undefined
                    ) {
                      return;
                    }

                    const x =
                      (start.x + end.x) / 2;

                    const y =
                      (start.y + end.y) / 2;

                    const fontSize =
                      10 / globalScale;

                    ctx.font =
                      `${fontSize}px Arial`;

                    ctx.fillStyle =
                      "#94a3b8";

                    ctx.textAlign =
                      "center";

                    ctx.textBaseline =
                      "middle";

                    ctx.fillText(
                      link.label,
                      x,
                      y
                    );

                  }}

                />

              </div>

            </section>

            <section className="panel">

              <h3>
                Network Insight
              </h3>

              <p>
                The graph shows possible relationships
                between cases, people, vehicles and
                locations.
              </p>

              <p className="info-text">
                AI-generated connections are analytical
                leads and require investigator verification.
              </p>

            </section>

          </>
        )}

        {/* ================================================= */}
        {/* ================= TIMELINE ====================== */}
        {/* ================================================= */}

        {activeSection === "Timeline" && (
          <>

            <header>

              <h2>
                Timeline Analysis
              </h2>

              <p>
                Chronological investigation events
              </p>

            </header>

            <section className="panel">

              <div className="timeline">

                <div className="timeline-item">

                  <span>
                    10 Jan 2026
                  </span>

                  <p>
                    Initial case report created
                  </p>

                </div>

                <div className="timeline-item">

                  <span>
                    14 Jan 2026
                  </span>

                  <p>
                    Person A identified
                  </p>

                </div>

                <div className="timeline-item">

                  <span>
                    18 Jan 2026
                  </span>

                  <p>
                    Vehicle X linked to the investigation
                  </p>

                </div>

                <div className="timeline-item">

                  <span>
                    22 Jan 2026
                  </span>

                  <p>
                    Related Case C-087 detected
                  </p>

                </div>

              </div>

            </section>

          </>
        )}

        {/* ================================================= */}
        {/* ================= REPORTS ======================= */}
        {/* ================================================= */}

        {activeSection === "Reports" && (
          <>

            <header>

              <h2>
                Reports
              </h2>

              <p>
                Investigation analysis reports
              </p>

            </header>

            <section className="panel">

              <h3>
                Available Reports
              </h3>

              <div className="related-cases">

                <div className="related-case">

                  <h4>
                    Case Network Report
                  </h4>

                  <p>
                    Summary of entities and relationships
                    detected in Case C-102.
                  </p>

                  <span>
                    Demo Report
                  </span>

                </div>

                <div className="related-case">

                  <h4>
                    Pattern Analysis Report
                  </h4>

                  <p>
                    Potential recurring patterns identified
                    for investigator review.
                  </p>

                  <span>
                    Demo Report
                  </span>

                </div>

                <div className="related-case">

                  <h4>
                    Timeline Report
                  </h4>

                  <p>
                    Chronological summary of investigation
                    events.
                  </p>

                  <span>
                    Demo Report
                  </span>

                </div>

              </div>

            </section>

            <section className="panel">

              <h3>
                System Note
              </h3>

              <p>
                NEXORA is a decision-support prototype.
                Analytical results are intended to assist
                investigators and must be verified by
                authorized personnel.
              </p>

            </section>

          </>
        )}

      </main>

    </div>
  );
}

export default App;