const API = import.meta.env.VITE_API_URL

export function fetchListings() {
    return fetch(`${API}/api/listings`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      });
  }
  
  export function updateListingStatus(
    id: number,
    status: "approved" | "declined"
  ) {
    return fetch(`${API}/api/listings/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    });
  }