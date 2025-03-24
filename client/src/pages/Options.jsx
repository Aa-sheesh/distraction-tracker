import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://distraction-tracker.onrender.com/api";

function Options() {
  const [categories, setCategories] = useState({});
  const [newDomain, setNewDomain] = useState("");
  const [newCategory, setNewCategory] = useState("uncategorized");
  const [error, setError] = useState(null);

  // Check if chrome.storage is available
  const isChromeStorageAvailable =
    typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;

  // Load stored categories from both Chrome storage and backend
  useEffect(() => {
    if (isChromeStorageAvailable) {
      chrome.storage.local.get(["categories"], (result) => {
        if (chrome.runtime.lastError) {
          setError(chrome.runtime.lastError);
          return;
        }
        if (result.categories) {
          setCategories(result.categories);
        }
      });
    } else {
      // Fallback for non-extension context
      setCategories({});
    }

    // Fetch categories from backend and merge (backend takes precedence)
    axios
      .get(`${API_URL}/categories`)
      .then((response) => {
        setCategories((prev) => ({ ...prev, ...response.data }));
      })
      .catch((err) =>
        console.error("Error fetching backend categories:", err)
      );
  }, [isChromeStorageAvailable]);

  // Utility function: sanitize input domain to only store hostname.
  const sanitizeDomain = (domainInput) => {
    try {
      const urlObj = new URL(domainInput);
      return urlObj.hostname;
    } catch (e) {
      // If input is already a hostname (or not a valid URL), return as is
      return domainInput.trim();
    }
  };

  // Save updated categories to both Chrome storage and backend
  const saveCategories = (updatedCategories) => {
    // Save to Chrome storage if available
    if (isChromeStorageAvailable) {
      chrome.storage.local.set({ categories: updatedCategories }, () => {
        if (chrome.runtime.lastError) {
          setError(chrome.runtime.lastError);
          return;
        }
        setCategories(updatedCategories);
      });
    } else {
      setCategories(updatedCategories);
    }

    // Save to backend
    axios
      .post(`${API_URL}/categories`, { categories: updatedCategories })
      .then((response) => {
        console.log("Backend categories updated:", response.data);
      })
      .catch((err) =>
        console.error("Error updating backend categories:", err)
      );
  };

  // Add a new mapping
  const handleAddMapping = () => {
    if (!newDomain.trim()) return;
    // Sanitize the domain input to only store the hostname
    const sanitizedDomain = sanitizeDomain(newDomain);
    const updatedCategories = { ...categories, [sanitizedDomain]: newCategory };
    saveCategories(updatedCategories);
    setNewDomain("");
    setNewCategory("uncategorized");
  };

  // Delete a mapping
  const handleDeleteMapping = (domain) => {
    const updatedCategories = { ...categories };
    delete updatedCategories[domain];
    saveCategories(updatedCategories);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Options</h2>
      <h3>Set Site Categories</h3>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter domain (e.g., https://in.linkedin.com/)"
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option value="productive">Productive</option>
          <option value="distracting">Distracting</option>
          <option value="uncategorized">Uncategorized</option>
        </select>
        <button onClick={handleAddMapping} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>
      <h3>Current Mappings</h3>
      {Object.keys(categories).length === 0 ? (
        <p>No categories set.</p>
      ) : (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Domain
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Category
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(categories).map(([domain, category]) => (
              <tr key={domain}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {domain}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {category}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <button onClick={() => handleDeleteMapping(domain)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Options;
