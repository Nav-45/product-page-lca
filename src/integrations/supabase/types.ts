export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ingredients: {
        Row: {
          created_at: string | null
          emission_factor: number | null
          id: string
          name: string | null
          product_id: string | null
          quantity: number | null
          supplier: string | null
          unit: string | null
        }
        Insert: {
          created_at?: string | null
          emission_factor?: number | null
          id?: string
          name?: string | null
          product_id?: string | null
          quantity?: number | null
          supplier?: string | null
          unit?: string | null
        }
        Update: {
          created_at?: string | null
          emission_factor?: number | null
          id?: string
          name?: string | null
          product_id?: string | null
          quantity?: number | null
          supplier?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          date: string | null
          emission_factor: number | null
          emissions: number | null
          id: string
          invoice_id: string | null
          lca_stage: string | null
          matched_activity_id: string | null
          original_text: string | null
          quantity: number | null
          scope: number | null
          unit: string | null
        }
        Insert: {
          date?: string | null
          emission_factor?: number | null
          emissions?: number | null
          id?: string
          invoice_id?: string | null
          lca_stage?: string | null
          matched_activity_id?: string | null
          original_text?: string | null
          quantity?: number | null
          scope?: number | null
          unit?: string | null
        }
        Update: {
          date?: string | null
          emission_factor?: number | null
          emissions?: number | null
          id?: string
          invoice_id?: string | null
          lca_stage?: string | null
          matched_activity_id?: string | null
          original_text?: string | null
          quantity?: number | null
          scope?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          file_url: string | null
          filename: string | null
          id: string
          status: string | null
          uploaded_at: string
          user_id: string | null
        }
        Insert: {
          file_url?: string | null
          filename?: string | null
          id?: string
          status?: string | null
          uploaded_at?: string
          user_id?: string | null
        }
        Update: {
          file_url?: string | null
          filename?: string | null
          id?: string
          status?: string | null
          uploaded_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lca_classification: {
        Row: {
          activity_name: string
          activity_type: string
          created_at: string
          id: string
          lca_stage: string | null
          product_id: string | null
          scope: number | null
          source: string
          unit: string | null
        }
        Insert: {
          activity_name: string
          activity_type: string
          created_at?: string
          id?: string
          lca_stage?: string | null
          product_id?: string | null
          scope?: number | null
          source: string
          unit?: string | null
        }
        Update: {
          activity_name?: string
          activity_type?: string
          created_at?: string
          id?: string
          lca_stage?: string | null
          product_id?: string | null
          scope?: number | null
          source?: string
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lca_classification_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      own_item_data: {
        Row: {
          activity_name: string | null
          emission_factor: number | null
          id: string
          lca_stage: string | null
          location: string | null
          scope: number | null
          unit: string | null
        }
        Insert: {
          activity_name?: string | null
          emission_factor?: number | null
          id?: string
          lca_stage?: string | null
          location?: string | null
          scope?: number | null
          unit?: string | null
        }
        Update: {
          activity_name?: string | null
          emission_factor?: number | null
          id?: string
          lca_stage?: string | null
          location?: string | null
          scope?: number | null
          unit?: string | null
        }
        Relationships: []
      }
      packaging: {
        Row: {
          id: string
          name: string | null
          product_id: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          product_id?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packaging_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          name: string
          sku: string | null
          total_co2: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          name: string
          sku?: string | null
          total_co2?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          name?: string
          sku?: string | null
          total_co2?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      value_chain_entries: {
        Row: {
          activity: string
          created_at: string
          description: string | null
          emission_factor: number | null
          emissions: number | null
          id: string
          product_id: string | null
          quantity: number | null
          scope: number | null
          stage: string
          unit: string | null
          updated_at: string
        }
        Insert: {
          activity: string
          created_at?: string
          description?: string | null
          emission_factor?: number | null
          emissions?: number | null
          id?: string
          product_id?: string | null
          quantity?: number | null
          scope?: number | null
          stage: string
          unit?: string | null
          updated_at?: string
        }
        Update: {
          activity?: string
          created_at?: string
          description?: string | null
          emission_factor?: number | null
          emissions?: number | null
          id?: string
          product_id?: string | null
          quantity?: number | null
          scope?: number | null
          stage?: string
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "value_chain_entries_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
