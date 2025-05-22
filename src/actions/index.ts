import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "@/lib/supabase/server";
import { resendContactEmail } from "@/lib/email";

const schema = z.object({
  name: z
    .string({
      invalid_type_error: "Name is required.",
      required_error: "Name is required.",
    })
    .trim()
    .min(1, "Name is required."),
  email: z
    .string({
      invalid_type_error: "Email is required.",
      required_error: "Email is required.",
    })
    .trim()
    .email("Invalid email address."),
  message: z
    .string({
      invalid_type_error: "Message is required.",
      required_error: "Message is required.",
    })
    .trim()
    .min(10, "Message must be at least 10 characters."),
  website: z.string().trim().optional(),
});

export const server = {
  sendContactEmail: defineAction({
    accept: "form",
    input: schema,
    handler: async ({ name, email, message }) => {
      await supabase
        .from("contact_submissions")
        .insert([{ name, email, message }]);

      await resendContactEmail({
        name,
        email,
        message,
      });
    },
  }),
};
