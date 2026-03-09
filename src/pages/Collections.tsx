import { useState, useEffect } from "react";
import { FolderPlus, Folder, Trash2, Plus, X, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Collection {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  item_count: number;
}

interface CollectionItem {
  id: string;
  generation_id: string;
  added_at: string;
  generation?: {
    id: string;
    title: string;
    platform: string;
    framework: string;
    created_at: string;
  };
}

interface Generation {
  id: string;
  title: string;
  platform: string;
  framework: string;
}

const platformLabels: Record<string, string> = {
  sap: "SAP", salesforce: "Salesforce", veeva: "Veeva", servicenow: "ServiceNow",
  workday: "Workday", oracle: "Oracle", web: "Web", api: "REST API",
  mobile_ios: "iOS", mobile_android: "Android",
};

const Collections = () => {
  const { user } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [availableGenerations, setAvailableGenerations] = useState<Generation[]>([]);

  const fetchCollections = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("collections")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      // Get item counts
      const withCounts = await Promise.all(
        data.map(async (c) => {
          const { count } = await supabase
            .from("collection_items")
            .select("*", { count: "exact", head: true })
            .eq("collection_id", c.id);
          return { ...c, item_count: count || 0 };
        })
      );
      setCollections(withCounts);
    }
    setLoading(false);
  };

  const fetchItems = async (collectionId: string) => {
    const { data } = await supabase
      .from("collection_items")
      .select("id, generation_id, added_at")
      .eq("collection_id", collectionId)
      .order("added_at", { ascending: false });

    if (data) {
      // Fetch generation details for each item
      const withGenerations = await Promise.all(
        data.map(async (item) => {
          const { data: gen } = await supabase
            .from("generations")
            .select("id, title, platform, framework, created_at")
            .eq("id", item.generation_id)
            .single();
          return { ...item, generation: gen || undefined };
        })
      );
      setItems(withGenerations);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [user]);

  useEffect(() => {
    if (selectedCollection) fetchItems(selectedCollection);
  }, [selectedCollection]);

  const handleCreate = async () => {
    if (!user || !newName.trim()) return;
    const { error } = await supabase.from("collections").insert({
      user_id: user.id,
      name: newName.trim(),
      description: newDesc.trim() || null,
    });
    if (error) {
      toast.error("Failed to create collection");
    } else {
      toast.success("Collection created");
      setCreateOpen(false);
      setNewName("");
      setNewDesc("");
      fetchCollections();
    }
  };

  const handleDelete = async (id: string) => {
    // Delete items first, then collection
    await supabase.from("collection_items").delete().eq("collection_id", id);
    const { error } = await supabase.from("collections").delete().eq("id", id);
    if (!error) {
      toast.success("Collection deleted");
      if (selectedCollection === id) setSelectedCollection(null);
      fetchCollections();
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    const { error } = await supabase.from("collection_items").delete().eq("id", itemId);
    if (!error) {
      toast.success("Removed from collection");
      if (selectedCollection) fetchItems(selectedCollection);
      fetchCollections();
    }
  };

  const openAddDialog = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("generations")
      .select("id, title, platform, framework")
      .order("created_at", { ascending: false })
      .limit(50);
    setAvailableGenerations(data || []);
    setAddDialogOpen(true);
  };

  const handleAddToCollection = async (generationId: string) => {
    if (!selectedCollection) return;
    const { error } = await supabase.from("collection_items").insert({
      collection_id: selectedCollection,
      generation_id: generationId,
    });
    if (error) {
      toast.error(error.message.includes("duplicate") ? "Already in collection" : "Failed to add");
    } else {
      toast.success("Added to collection");
      fetchItems(selectedCollection);
      fetchCollections();
      setAddDialogOpen(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-muted-foreground">Sign in to manage collections.</p>
      </div>
    );
  }

  const selectedCol = collections.find((c) => c.id === selectedCollection);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Collections
          </h1>
          <Button onClick={() => setCreateOpen(true)} size="sm" className="gap-2">
            <FolderPlus className="w-4 h-4" /> New Collection
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Collection List */}
          <div className="space-y-2">
            {loading ? (
              <p className="text-muted-foreground text-sm">Loading...</p>
            ) : collections.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No collections yet. Create one to organize your scripts.
              </div>
            ) : (
              collections.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCollection(c.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center justify-between group ${
                    selectedCollection === c.id
                      ? "border-primary/40 bg-primary/5 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Folder className="w-4 h-4 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">{c.name}</div>
                      {c.description && <div className="text-xs text-muted-foreground truncate">{c.description}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{c.item_count}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Collection Contents */}
          <div className="lg:col-span-2">
            {selectedCol ? (
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">{selectedCol.name}</h2>
                  <Button onClick={openAddDialog} variant="outline" size="sm" className="gap-1.5">
                    <Plus className="w-3.5 h-3.5" /> Add Script
                  </Button>
                </div>
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">No scripts in this collection yet.</p>
                ) : (
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">
                              {item.generation?.title || "Unknown script"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {platformLabels[item.generation?.platform || ""] || item.generation?.platform} · {item.generation?.framework}
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleRemoveItem(item.id)} className="p-1 text-muted-foreground hover:text-destructive">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-5 flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-sm">Select a collection to view its scripts.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Collection Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>New Collection</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Collection name"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Description (optional)"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button onClick={handleCreate} disabled={!newName.trim()} className="w-full">
              Create Collection
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Script Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="bg-card border-border max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Script to Collection</DialogTitle>
          </DialogHeader>
          {availableGenerations.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No generated scripts found. Generate one first!</p>
          ) : (
            <div className="space-y-2">
              {availableGenerations.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleAddToCollection(g.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">{g.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {platformLabels[g.platform] || g.platform} · {g.framework}
                  </div>
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Collections;
