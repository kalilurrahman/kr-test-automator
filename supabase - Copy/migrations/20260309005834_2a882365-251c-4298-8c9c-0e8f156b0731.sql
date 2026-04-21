-- Create templates table for pre-built test templates
CREATE TABLE public.templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  description text,
  platform text NOT NULL,
  business_case_text text NOT NULL,
  suggested_framework text,
  suggested_scopes text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  icon text,
  category text
);

-- Create collections table for user collections
CREATE TABLE public.collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create junction table for generations in collections
CREATE TABLE public.collection_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
  generation_id uuid NOT NULL REFERENCES public.generations(id) ON DELETE CASCADE,
  added_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(collection_id, generation_id)
);

-- Enable RLS
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;

-- Templates are public read
CREATE POLICY "Anyone can view templates" ON public.templates
  FOR SELECT USING (true);

-- Collections RLS
CREATE POLICY "Users can view their own collections" ON public.collections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own collections" ON public.collections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own collections" ON public.collections
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own collections" ON public.collections
  FOR DELETE USING (auth.uid() = user_id);

-- Collection items RLS (through collection ownership)
CREATE POLICY "Users can view items in their collections" ON public.collection_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.collections WHERE id = collection_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can add items to their collections" ON public.collection_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.collections WHERE id = collection_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can remove items from their collections" ON public.collection_items
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.collections WHERE id = collection_id AND user_id = auth.uid())
  );