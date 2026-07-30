import { useEffect, useState } from "react";
import { Trash2, Mail, MailOpen, CheckCheck } from "lucide-react";
import { getContacts, updateContact, deleteContact } from "../api/contact";
import "./admin.css";

const statusFilters = ["all", "unread", "read", "replied"];

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getContacts(filter === "all" ? undefined : filter)
      .then((res) => setMessages(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const handleStatusChange = async (msg, status) => {
    try {
      await updateContact(msg._id, status);
      load();
    } catch (err) {
      alert(err.message || "Failed to update message");
    }
  };

  const handleDelete = async (msg) => {
    if (!window.confirm(`Delete message from "${msg.name}"?`)) return;
    try {
      await deleteContact(msg._id);
      load();
    } catch (err) {
      alert(err.message || "Failed to delete message");
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Messages</h1>
          <p>Contact form submissions from your site.</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {statusFilters.map((s) => (
          <button
            key={s}
            className="admin-btn-secondary"
            style={
              filter === s
                ? { borderColor: "var(--color-violet)", color: "var(--color-text)" }
                : undefined
            }
            onClick={() => setFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-empty">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="admin-empty">No messages here.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m._id}>
                  <td>
                    <div>{m.name}</div>
                    <div style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
                      {m.email}
                    </div>
                  </td>
                  <td>{m.subject || "—"}</td>
                  <td style={{ whiteSpace: "normal", maxWidth: 260 }}>{m.message}</td>
                  <td>
                    <span className={`admin-status-badge admin-status-badge--${m.status}`}>
                      {m.status}
                    </span>
                  </td>
                  <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="admin-table__actions">
                      {m.status !== "read" && (
                        <button
                          className="admin-icon-btn"
                          title="Mark as read"
                          onClick={() => handleStatusChange(m, "read")}
                        >
                          <MailOpen size={15} />
                        </button>
                      )}
                      {m.status !== "replied" && (
                        <button
                          className="admin-icon-btn"
                          title="Mark as replied"
                          onClick={() => handleStatusChange(m, "replied")}
                        >
                          <CheckCheck size={15} />
                        </button>
                      )}
                      {m.status !== "unread" && (
                        <button
                          className="admin-icon-btn"
                          title="Mark as unread"
                          onClick={() => handleStatusChange(m, "unread")}
                        >
                          <Mail size={15} />
                        </button>
                      )}
                      <button
                        className="admin-icon-btn admin-icon-btn--danger"
                        onClick={() => handleDelete(m)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default AdminMessages;
