-- Create value_chain_entries table
CREATE TABLE public.value_chain_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id),
  stage TEXT NOT NULL,
  activity TEXT NOT NULL,
  description TEXT,
  quantity NUMERIC,
  unit TEXT,
  emission_factor NUMERIC,
  emissions NUMERIC,
  scope INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_value_chain_entries_product_id ON public.value_chain_entries(product_id);
CREATE INDEX idx_value_chain_entries_stage ON public.value_chain_entries(stage);

-- Enable RLS
ALTER TABLE public.value_chain_entries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user access
CREATE POLICY "Users can view value chain entries for their own products" 
ON public.value_chain_entries 
FOR SELECT 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert value chain entries for their own products" 
ON public.value_chain_entries 
FOR INSERT 
WITH CHECK (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can update value chain entries for their own products" 
ON public.value_chain_entries 
FOR UPDATE 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete value chain entries for their own products" 
ON public.value_chain_entries 
FOR DELETE 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_value_chain_entries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_value_chain_entries_updated_at
  BEFORE UPDATE ON public.value_chain_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_value_chain_entries_updated_at();