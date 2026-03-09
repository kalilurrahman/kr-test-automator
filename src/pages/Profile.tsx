import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar, FileText, Star, FolderOpen, Save, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ProfileData {
  display_name: string | null;
  email: string | null;
  created_at: string;
}

interface Stats {
  totalScripts: number;
  starredScripts: number;
  collections: number;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<Stats>({ totalScripts: 0, starredScripts: 0, collections: 0 });
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [profileRes, genCountRes, starredRes, colRes] = await Promise.all([
        supabase.from("profiles").select("display_name, email, created_at").eq("id", user.id).single(),
        supabase.from("generations").select("*", { count: "exact", head: true }),
        supabase.from("generations").select("*", { count: "exact", head: true }).eq("is_starred", true),
        supabase.from("collections").select("*", { count: "exact", head: true }),
      ]);
      if (profileRes.data) {
        setProfile(profileRes.data);
        setDisplayName(profileRes.data.display_name || "");
      }
      setStats({
        totalScripts: genCountRes.count || 0,
        starredScripts: starredRes.count || 0,
        collections: colRes.count || 0,
      });
      setLoading(false);
    };
    load();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim(), updated_at: new Date().toISOString() })
      .eq("id", user.id);
    setSaving(false);
    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated");
    }
  };

  const handleDeleteAccount = async () => {
    // Just sign out for now — full account deletion requires admin
    await signOut();
    navigate("/");
    toast.success("Signed out successfully");
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-muted-foreground">Sign in to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Profile
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: FileText, label: "Scripts", value: stats.totalScripts },
            { icon: Star, label: "Starred", value: stats.starredScripts },
            { icon: FolderOpen, label: "Collections", value: stats.collections },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4 text-center">
              <Icon className="w-5 h-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Profile Form */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5 mb-6">
          <h2 className="text-lg font-semibold text-foreground">Account Details</h2>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-3.5 h-3.5" /> Email
            </Label>
            <Input value={user.email || ""} disabled className="bg-muted border-border" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <User className="w-3.5 h-3.5" /> Display Name
            </Label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" /> Member Since
            </Label>
            <Input
              value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
              disabled
              className="bg-muted border-border"
            />
          </div>

          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="rounded-xl border border-destructive/30 bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">Danger Zone</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Sign out of your account. Your data will be preserved.
          </p>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
