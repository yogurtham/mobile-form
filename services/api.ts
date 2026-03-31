export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));

  return { success: true, message: 'Message sent successfully!' };
}
