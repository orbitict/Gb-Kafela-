export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17";
  };
  public: {
    Tables: {
      gallery_images: {
        Row: {
          caption: string;
          category: string;
          id: string;
          image_url: string;
          sort_order: number;
        };
        Insert: {
          caption?: string;
          category?: string;
          id?: string;
          image_url: string;
          sort_order?: number;
        };
        Update: {
          caption?: string;
          category?: string;
          id?: string;
          image_url?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      guides: {
        Row: {
          bio: string;
          experience: string;
          id: string;
          name: string;
          photo_url: string;
          sort_order: number;
        };
        Insert: {
          bio?: string;
          experience?: string;
          id?: string;
          name: string;
          photo_url?: string;
          sort_order?: number;
        };
        Update: {
          bio?: string;
          experience?: string;
          id?: string;
          name?: string;
          photo_url?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      packages: {
        Row: {
          details: string;
          duration: string;
          food: string;
          hotel: string;
          id: string;
          is_active: boolean;
          is_popular: boolean;
          name_bn: string;
          name_en: string;
          other_facilities: string;
          price: number;
          slug: string;
          sort_order: number;
          tagline: string;
          training: string;
          transport: string;
          updated_at: string;
        };
        Insert: {
          details?: string;
          duration?: string;
          food?: string;
          hotel?: string;
          id?: string;
          is_active?: boolean;
          is_popular?: boolean;
          name_bn: string;
          name_en: string;
          other_facilities?: string;
          price?: number;
          slug: string;
          sort_order?: number;
          tagline?: string;
          training?: string;
          transport?: string;
          updated_at?: string;
        };
        Update: {
          details?: string;
          duration?: string;
          food?: string;
          hotel?: string;
          id?: string;
          is_active?: boolean;
          is_popular?: boolean;
          name_bn?: string;
          name_en?: string;
          other_facilities?: string;
          price?: number;
          slug?: string;
          sort_order?: number;
          tagline?: string;
          training?: string;
          transport?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      registrations: {
        Row: {
          address: string;
          code: string;
          created_at: string;
          date_of_birth: string | null;
          full_name: string;
          guardian_name: string;
          id: string;
          mobile: string;
          nid_number: string;
          note: string;
          package_slug: string;
          passport_number: string;
          status: string;
        };
        Insert: {
          address?: string;
          code?: string;
          created_at?: string;
          date_of_birth?: string | null;
          full_name: string;
          guardian_name?: string;
          id?: string;
          mobile: string;
          nid_number?: string;
          note?: string;
          package_slug: string;
          passport_number?: string;
          status?: string;
        };
        Update: {
          address?: string;
          code?: string;
          created_at?: string;
          date_of_birth?: string | null;
          full_name?: string;
          guardian_name?: string;
          id?: string;
          mobile?: string;
          nid_number?: string;
          note?: string;
          package_slug?: string;
          passport_number?: string;
          status?: string;
        };
        Relationships: [];
      };
      site_content: {
        Row: {
          key: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          key: string;
          updated_at?: string;
          value?: Json;
        };
        Update: {
          key?: string;
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          hajj_year: string;
          id: string;
          photo_url: string;
          pilgrim_name: string;
          quote: string;
          sort_order: number;
        };
        Insert: {
          hajj_year?: string;
          id?: string;
          photo_url?: string;
          pilgrim_name: string;
          quote: string;
          sort_order?: number;
        };
        Update: {
          hajj_year?: string;
          id?: string;
          photo_url?: string;
          pilgrim_name?: string;
          quote?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      training_sessions: {
        Row: {
          id: string;
          instructor: string;
          location: string;
          session_date: string | null;
          session_time: string;
          sort_order: number;
          title: string;
          topic: string;
        };
        Insert: {
          id?: string;
          instructor?: string;
          location?: string;
          session_date?: string | null;
          session_time?: string;
          sort_order?: number;
          title: string;
          topic?: string;
        };
        Update: {
          id?: string;
          instructor?: string;
          location?: string;
          session_date?: string | null;
          session_time?: string;
          sort_order?: number;
          title?: string;
          topic?: string;
        };
        Relationships: [];
      };
      training_topics: {
        Row: {
          content: string;
          id: string;
          sort_order: number;
          title: string;
        };
        Insert: {
          content?: string;
          id?: string;
          sort_order?: number;
          title: string;
        };
        Update: {
          content?: string;
          id?: string;
          sort_order?: number;
          title?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "staff";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
    },
  },
} as const;
