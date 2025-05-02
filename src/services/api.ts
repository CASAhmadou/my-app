const API_BASE = "http://localhost:3000";

export const getTodos = async () => {
    const res = await fetch(`${API_BASE}/todos`);
    if(!res.ok) throw new Error("Erreur lors de la récupération des todos");
    return res.json();
}

export const addTodo = async (todo: string) => {
    const res = await fetch(`${API_BASE}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo }),
    });
    if(!res.ok) throw new Error("Erreur lors de la mise à jour");
    const data = await res.json();
    return data;
  };
  
  export const updateTodo = async (id: number, updated: any) => {
    if(!id) throw new Error("Id manquant pour la mise à jour");
    const res = await fetch(`${API_BASE}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if(!res.ok) throw new Error("Erreur lors de la mise à jour");
    return res.json();
  };
  
  export const deleteTodo = async (id: number) => {
    return await fetch(`${API_BASE}/todos/${id}`, {
      method: "DELETE",
    });
  };
  
  // -------- AUTH --------
  export const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if(!res.ok) throw new Error("Erreur lors de la mise à jour");
    return res.json();
  };
  
  export const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if(!res.ok) throw new Error("Erreur lors de la mise à jour");
    return res.json();
  };