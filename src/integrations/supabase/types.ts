export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          booking_status: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          currency: string | null
          end_date: string
          group_size: number
          id: string
          payment_status: string | null
          provider_id: string
          service_id: string
          special_requests: string | null
          start_date: string
          total_amount: number
          traveler_id: string
          updated_at: string
        }
        Insert: {
          booking_date: string
          booking_status?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          currency?: string | null
          end_date: string
          group_size?: number
          id?: string
          payment_status?: string | null
          provider_id: string
          service_id: string
          special_requests?: string | null
          start_date: string
          total_amount: number
          traveler_id: string
          updated_at?: string
        }
        Update: {
          booking_date?: string
          booking_status?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          currency?: string | null
          end_date?: string
          group_size?: number
          id?: string
          payment_status?: string | null
          provider_id?: string
          service_id?: string
          special_requests?: string | null
          start_date?: string
          total_amount?: number
          traveler_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_bookings_service"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          comment: string
          created_at: string
          id: string
          provider_id: string | null
          rating: number
          service_type: string | null
          temple_name: string | null
          title: string
          updated_at: string
          user_id: string
          visit_date: string | null
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          provider_id?: string | null
          rating: number
          service_type?: string | null
          temple_name?: string | null
          title: string
          updated_at?: string
          user_id: string
          visit_date?: string | null
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          provider_id?: string | null
          rating?: number
          service_type?: string | null
          temple_name?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          visit_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          location: string | null
          name: string
          place_type: string
          rating: number | null
          state_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name: string
          place_type: string
          rating?: number | null
          state_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name?: string
          place_type?: string
          rating?: number | null
          state_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "places_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          role: string | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          role?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          role?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      provider_documents: {
        Row: {
          created_at: string
          document_type: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          provider_id: string
          rejection_reason: string | null
          updated_at: string
          uploaded_at: string
          verification_status: string | null
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          document_type: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          provider_id: string
          rejection_reason?: string | null
          updated_at?: string
          uploaded_at?: string
          verification_status?: string | null
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          document_type?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          provider_id?: string
          rejection_reason?: string | null
          updated_at?: string
          uploaded_at?: string
          verification_status?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_documents_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          address: string
          business_name: string
          business_type: string
          city: string
          contact_person: string
          created_at: string
          description: string | null
          email: string
          experience_years: number | null
          id: string
          phone: string
          pincode: string
          services: string[]
          state: string
          updated_at: string
          user_id: string | null
          verification_status: string | null
          website_url: string | null
        }
        Insert: {
          address: string
          business_name: string
          business_type: string
          city: string
          contact_person: string
          created_at?: string
          description?: string | null
          email: string
          experience_years?: number | null
          id?: string
          phone: string
          pincode: string
          services: string[]
          state: string
          updated_at?: string
          user_id?: string | null
          verification_status?: string | null
          website_url?: string | null
        }
        Update: {
          address?: string
          business_name?: string
          business_type?: string
          city?: string
          contact_person?: string
          created_at?: string
          description?: string | null
          email?: string
          experience_years?: number | null
          id?: string
          phone?: string
          pincode?: string
          services?: string[]
          state?: string
          updated_at?: string
          user_id?: string | null
          verification_status?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          approval_status: string | null
          availability_status: string | null
          created_at: string
          description: string | null
          duration_days: number | null
          excludes: string[] | null
          id: string
          image_urls: string[] | null
          includes: string[] | null
          location: string
          max_group_size: number | null
          name: string
          price_currency: string | null
          price_per_day: number | null
          provider_id: string
          service_type: string
          state: string
          updated_at: string
        }
        Insert: {
          approval_status?: string | null
          availability_status?: string | null
          created_at?: string
          description?: string | null
          duration_days?: number | null
          excludes?: string[] | null
          id?: string
          image_urls?: string[] | null
          includes?: string[] | null
          location: string
          max_group_size?: number | null
          name: string
          price_currency?: string | null
          price_per_day?: number | null
          provider_id: string
          service_type: string
          state: string
          updated_at?: string
        }
        Update: {
          approval_status?: string | null
          availability_status?: string | null
          created_at?: string
          description?: string | null
          duration_days?: number | null
          excludes?: string[] | null
          id?: string
          image_urls?: string[] | null
          includes?: string[] | null
          location?: string
          max_group_size?: number | null
          name?: string
          price_currency?: string | null
          price_per_day?: number | null
          provider_id?: string
          service_type?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      states: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      travel_requests: {
        Row: {
          accommodation: string
          budget: string
          created_at: string
          destination: string
          duration: string
          group_size: string
          id: string
          journey_date: string | null
          special_requirements: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          accommodation: string
          budget: string
          created_at?: string
          destination: string
          duration: string
          group_size: string
          id?: string
          journey_date?: string | null
          special_requirements?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          accommodation?: string
          budget?: string
          created_at?: string
          destination?: string
          duration?: string
          group_size?: string
          id?: string
          journey_date?: string | null
          special_requirements?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role_enum: "pilgrim" | "provider"
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
    Enums: {
      user_role_enum: ["pilgrim", "provider"],
    },
  },
} as const
