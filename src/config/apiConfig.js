// ❌ No real backend URL for now
// export const API_BASE_URL = "https://your-backend.com/api";

// ✅ Temporary placeholder (kept with the same name)
export const API_BASE_URL = null;

// ✅ Static / mock data for frontend development
export const staticData = {
  testimonials: [
    {
      id: 1,
      name: "Amit Patel",
      rating: 5,
      review: "Excellent quality and service!",
      image: "/users/user1.jpg",
    },
    {
      id: 2,
      name: "Riya Shah",
      rating: 4,
      review: "Very professional installation.",
      image: "/users/user2.jpg",
    },
  ],

  locations: [
    { id: 1, city: "Surat", address: "Adajan, Surat" },
    { id: 2, city: "Ahmedabad", address: "Satellite, Ahmedabad" },
  ],

  blogs: [
    {
      id: 1,
      title: "Benefits of Window Film",
      description: "Learn how window film protects your home.",
      image: "/blogs/blog1.jpg",
    },
  ],
};
