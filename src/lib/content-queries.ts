import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const packagesQuery = queryOptions({
  queryKey: ["packages"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const guidesQuery = queryOptions({
  queryKey: ["guides"],
  queryFn: async () => {
    const { data, error } = await supabase.from("guides").select("*").order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const trainingTopicsQuery = queryOptions({
  queryKey: ["training_topics"],
  queryFn: async () => {
    const { data, error } = await supabase.from("training_topics").select("*").order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const trainingSessionsQuery = queryOptions({
  queryKey: ["training_sessions"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("training_sessions")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const galleryQuery = queryOptions({
  queryKey: ["gallery_images"],
  queryFn: async () => {
    const { data, error } = await supabase.from("gallery_images").select("*").order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const testimonialsQuery = queryOptions({
  queryKey: ["testimonials"],
  queryFn: async () => {
    const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
    if (error) throw error;
    return data;
  },
});
