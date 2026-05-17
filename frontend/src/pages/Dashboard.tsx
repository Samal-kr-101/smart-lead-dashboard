import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  source: string;
}

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("New");
  const [source, setSource] = useState("Website");

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

  //  ROLE SYSTEM
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  // SPINNER
  const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // FETCH
  const fetchLeads = async (pageNumber: number = 1) => {
    try {
      setLoading(true);

      const res = await API.get(
        `/leads?search=${search}&status=${statusFilter}&source=${sourceFilter}&page=${pageNumber}`
      );

      setLeads(res.data.data);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(page);
  }, [search, statusFilter, sourceFilter, page]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, sourceFilter]);

  // EDIT
  const startEdit = (lead: Lead) => {
    setEditingId(lead._id);
    setName(lead.name);
    setEmail(lead.email);
    setPhone(lead.phone);
    setStatus(lead.status);
    setSource(lead.source);
  };

  // CREATE / UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editingId) {
        await API.put(`/leads/${editingId}`, {
          name,
          email,
          phone,
          status,
          source,
        });

        toast.success("Lead Updated");
        setEditingId(null);
      } else {
        await API.post("/leads", {
          name,
          email,
          phone,
          status,
          source,
        });

        toast.success("Lead Created");
      }

      setName("");
      setEmail("");
      setPhone("");
      setStatus("New");
      setSource("Website");

      fetchLeads(page);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  // DELETE (ADMIN ONLY)
  const deleteLead = async (id: string) => {
    if (!isAdmin) {
      toast.error("Access denied");
      return;
    }

    try {
      setLoading(true);
      await API.delete(`/leads/${id}`);
      toast.success("Lead Deleted");
      fetchLeads(page);
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

    // csv
    const exportToCSV = () => {
  if (!leads.length) {
    toast.error("No leads to export");
    return;
  }

  // CSV headers
  const headers = ["Name", "Email", "Phone", "Status", "Source"];

  // Convert leads into rows
  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.phone,
    lead.status,
    lead.source,
  ]);

  // Merge headers + rows
  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  // Create file
  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  // Create download link
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "leads.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

return (
  <div className="dashboard">

    {/* LOADING */}
    {loading && <LoadingSpinner />}

    {/* HEADER */}
    <div className="dashboard-header">

  {/* LEFT */}
  <div className="header-left">

    <h1 className="dashboard-heading">
      Lead Dashboard
    </h1>

    <p className="dashboard-subtitle">
      Manage and track your leads
    </p>

  </div>

  {/* RIGHT */}
  <div className="header-user">

    <div className="user-details">

      <h3>{user.name}</h3>

      {/* <span
        className={`role-badge ${
          isAdmin ? "admin-badge" : "sales-badge"
        }`}
      >
        {user.role}
      </span> */}

    </div>

  </div>


      {/* <button
        className="logout-btn"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Logout
      </button> */}

    </div>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="lead-form"
    >

      <div className="form-grid">

        <input
          className="form-input"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Name"
        />

        <input
          className="form-input"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
        />

        <input
          className="form-input"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          placeholder="Phone"
        />

        <select
          className="form-select"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="New">New</option>
          <option value="Qualified">
            Qualified
          </option>
          <option value="Closed">
            Closed
          </option>
        </select>

        <select
          className="form-select"
          value={source}
          onChange={(e) =>
            setSource(e.target.value)
          }
        >
          <option value="Website">
            Website
          </option>
          <option value="Instagram">
            Instagram
          </option>
          <option value="LinkedIn">
            LinkedIn
          </option>
        </select>

      </div>

      <button className="submit-btn">
        {editingId
          ? "Update Lead"
          : "Add Lead"}
      </button>

    </form>

    {/* FILTER BAR */}
    <div className="filter-bar">

      <input
        className="search-input"
        placeholder="Search leads..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        className="filter-select"
        onChange={(e) =>
          setStatusFilter(e.target.value)
        }
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Qualified">
          Qualified
        </option>
        <option value="Closed">
          Closed
        </option>
      </select>

      <select
        className="filter-select"
        onChange={(e) =>
          setSourceFilter(e.target.value)
        }
      >
        <option value="">All Sources</option>
        <option value="Website">
          Website
        </option>
        <option value="Instagram">
          Instagram
        </option>
        <option value="LinkedIn">
          LinkedIn
        </option>
      </select>

      <button
        onClick={exportToCSV}
        className="export-btn"
      >
        Export CSV
      </button>

    </div>

    {/* LEADS */}
    <div className="leads-container">

      {leads.map((lead) => (

        <div
          key={lead._id}
          className="lead-card"
        >

          <div className="lead-top">

            <h2>{lead.name}</h2>

            <span
              className={`lead-status ${
                lead.status.toLowerCase()
              }`}
            >
              {lead.status}
            </span>

          </div>

          <p>{lead.email}</p>

          <p>{lead.phone}</p>

          <p>{lead.source}</p>

          <div className="lead-actions">

            <button
              onClick={() =>
                startEdit(lead)
              }
              className="edit-btn"
            >
              Edit
            </button>

            {isAdmin && (
              <button
                onClick={() =>
                  deleteLead(lead._id)
                }
                className="delete-btn"
              >
                Delete
              </button>
            )}

          </div>

        </div>

      ))}

    </div>

    {/* PAGINATION */}
    <div className="pagination">

      <button
        className="page-btn"
        onClick={() =>
          goToPage(page - 1)
        }
      >
        Prev
      </button>

      <span className="page-number">
        {page} / {totalPages}
      </span>

      <button
        className="page-btn"
        onClick={() =>
          goToPage(page + 1)
        }
      >
        Next
      </button>

    </div>

  </div>
);
}
export default Dashboard;