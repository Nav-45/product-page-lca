-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  sku TEXT,
  total_co2 NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ingredients table
CREATE TABLE public.ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity NUMERIC,
  unit TEXT,
  name TEXT NOT NULL,
  supplier TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public access for now)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Products can be created by everyone" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Products can be updated by everyone" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Products can be deleted by everyone" 
ON public.products 
FOR DELETE 
USING (true);

-- Create policies for ingredients (public access for now)
CREATE POLICY "Ingredients are viewable by everyone" 
ON public.ingredients 
FOR SELECT 
USING (true);

CREATE POLICY "Ingredients can be created by everyone" 
ON public.ingredients 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Ingredients can be updated by everyone" 
ON public.ingredients 
FOR UPDATE 
USING (true);

CREATE POLICY "Ingredients can be deleted by everyone" 
ON public.ingredients 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();