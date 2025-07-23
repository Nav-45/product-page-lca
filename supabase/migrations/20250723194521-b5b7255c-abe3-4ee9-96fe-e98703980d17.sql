-- Enable RLS on tables that are missing it
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packaging ENABLE ROW LEVEL SECURITY;

-- Add missing UPDATE and DELETE policies for products table
CREATE POLICY "Users can update their own products" 
ON public.products 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products" 
ON public.products 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add missing SELECT, UPDATE, DELETE policies for ingredients table
CREATE POLICY "Users can view ingredients for their own products" 
ON public.ingredients 
FOR SELECT 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can update ingredients for their own products" 
ON public.ingredients 
FOR UPDATE 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete ingredients for their own products" 
ON public.ingredients 
FOR DELETE 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

-- Add missing policies for other tables as needed
CREATE POLICY "Users can view their own invoices" 
ON public.invoices 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own invoices" 
ON public.invoices 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own invoices" 
ON public.invoices 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add policies for invoice_items
CREATE POLICY "Users can view invoice items for their own invoices" 
ON public.invoice_items 
FOR SELECT 
USING (
  invoice_id IN (
    SELECT id FROM public.invoices WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can update invoice items for their own invoices" 
ON public.invoice_items 
FOR UPDATE 
USING (
  invoice_id IN (
    SELECT id FROM public.invoices WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete invoice items for their own invoices" 
ON public.invoice_items 
FOR DELETE 
USING (
  invoice_id IN (
    SELECT id FROM public.invoices WHERE user_id = auth.uid()
  )
);

-- Add policies for packaging
CREATE POLICY "Users can view packaging for their own products" 
ON public.packaging 
FOR SELECT 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can update packaging for their own products" 
ON public.packaging 
FOR UPDATE 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete packaging for their own products" 
ON public.packaging 
FOR DELETE 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);