const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body)
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

export const notesApi = {
  getAllNotes: () => apiRequest("/notes"),
  getActiveNotes: () => apiRequest("/notes/active"),
  getArchivedNotes: () => apiRequest("/notes/archived"),
  getNoteById: (id) => apiRequest(`/notes/${id}`),

  createNote: (noteData) => {
    const payload = {
      title: noteData.title,
      content: noteData.content,
      tags: noteData.tags || [],
      background_color: noteData.backgroundColor || "#ffffff",
    }

    return apiRequest("/notes", {
      method: "POST",
      body: payload,
    })
  },

  updateNote: async (id, noteData) => {
    try {
      await apiRequest(`/notes/${id}`)
    } catch (error) {
      if (error.message.includes("404") || error.message.includes("Not found")) {
        throw new Error(`Note with ID ${id} no longer exists. Please refresh the page.`)
      }
      throw error
    }
  
    const payload = {
      title: noteData.title,
      content: noteData.content,
      tags: noteData.tags || [],
      background_color: noteData.backgroundColor || "#ffffff",
    }
  
    if (noteData.hasOwnProperty("isArchived")) {
      payload.is_archived = Boolean(noteData.isArchived)
    }
  
    return apiRequest(`/notes/${id}`, {
      method: "PUT",
      body: payload,
    })
  },

  deleteNote: (id) => {
    return apiRequest(`/notes/${id}`, {
      method: "DELETE",
    })
  },

  checkHealth: () => apiRequest("/"),
}
