import { useState, FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Max 100 characters"),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Max 2000 characters"),
});

type FeedbackErrors = Partial<Record<keyof z.infer<typeof feedbackSchema>, string>>;

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FeedbackErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = feedbackSchema.safeParse({ name, email, message });
    if (!parsed.success) {
      const fieldErrors: FeedbackErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FeedbackErrors;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("feedback_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
        user_agent: navigator.userAgent.slice(0, 500),
      });
      if (error) throw error;
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Feedback received — thank you!");
    } catch (err) {
      toast.error("Could not submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Feedback · TestForge AI</title>
        <meta name="description" content="Share suggestions, bugs and improvements for TestForge AI. Goes straight to the maintainer." />
        <link rel="canonical" href="/feedback" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Send feedback
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Bug, idea, missing platform, broken link — all welcome. Submissions reach the maintainer directly.
          </p>
        </header>

        {submitted ? (
          <Card className="p-8 bg-card border-border text-center">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Thanks — got it!
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Your feedback was received. I read every message personally.
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Send another
            </Button>
          </Card>
        ) : (
          <Card className="p-6 bg-card border-border">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <Label htmlFor="fb-name">Name</Label>
                <Input
                  id="fb-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "fb-name-err" : undefined}
                  className="mt-1.5"
                />
                {errors.name && <p id="fb-name-err" className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="fb-email">Email</Label>
                <Input
                  id="fb-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  maxLength={255}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "fb-email-err" : undefined}
                  className="mt-1.5"
                />
                {errors.email && <p id="fb-email-err" className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="fb-message">Message</Label>
                <Textarea
                  id="fb-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What would make this better?"
                  rows={6}
                  maxLength={2000}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "fb-message-err" : "fb-message-help"}
                  className="mt-1.5"
                />
                {errors.message ? (
                  <p id="fb-message-err" className="text-xs text-destructive mt-1">{errors.message}</p>
                ) : (
                  <p id="fb-message-help" className="text-xs text-muted-foreground mt-1">
                    {message.length}/2000
                  </p>
                )}
              </div>

              <Button type="submit" disabled={submitting} className="w-full gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                  </>
                ) : (
                  "Send feedback"
                )}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </>
  );
};

export default Feedback;
