import { createContext, useContext, useEffect, useState } from "react";
import { Session, User, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

type UserRole = "user" | "admin" | "moderator";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signUp: (
    email: string,
    password: string,
    metadata?: { [key: string]: any },
  ) => Promise<{
    error: AuthError | Error | null;
    data: any | null;
  }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: AuthError | Error | null;
    data: any | null;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{
    error: AuthError | Error | null;
    data: any | null;
  }>;
  updateProfile: (data: { [key: string]: any }) => Promise<{
    error: AuthError | Error | null;
    data: any | null;
  }>;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userRole: UserRole | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock user for development when Supabase is not configured
  const mockUser = {
    id: "mock-user-id",
    email: "admin@example.com",
    user_metadata: {
      name: "Admin User",
      role: "admin",
    },
  };

  const isUsingMock = () => {
    return (
      import.meta.env.VITE_SUPABASE_URL ===
        "https://your-project-url.supabase.co" ||
      import.meta.env.VITE_SUPABASE_URL ===
        "https://placeholder-project.supabase.co"
    );
  };

  useEffect(() => {
    // Skip actual Supabase calls if using placeholder URL
    if (isUsingMock()) {
      console.log("Using mock authentication - Supabase not configured");
      setUser(mockUser as unknown as User);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error("Auth initialization error:", error);
      setLoading(false);
    }
  }, []);

  const signUp = async (
    email: string,
    password: string,
    metadata?: { [key: string]: any },
  ) => {
    // Mock signup for development
    if (isUsingMock()) {
      console.log("Mock signup:", { email, password, metadata });
      setUser(mockUser as unknown as User);
      return { error: null, data: { user: mockUser } };
    }

    try {
      setLoading(true);
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (response.error) {
        toast({
          title: "Sign up failed",
          description: response.error.message,
          variant: "destructive",
        });
      } else if (response.data?.user) {
        toast({
          title: "Account created",
          description: "Please check your email for verification instructions.",
        });
      }

      return response;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Sign up failed",
        description: (error as Error).message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error: error as Error, data: null };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Mock signin for development
    if (isUsingMock()) {
      console.log("Mock signin:", { email, password });
      setUser(mockUser as unknown as User);
      return { error: null, data: { user: mockUser } };
    }

    try {
      setLoading(true);
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (response.error) {
        toast({
          title: "Sign in failed",
          description: response.error.message,
          variant: "destructive",
        });
      } else if (response.data?.user) {
        toast({
          title: "Welcome back",
          description: `Signed in as ${response.data.user.email}`,
        });
      }

      return response;
    } catch (error) {
      console.error("Signin error:", error);
      toast({
        title: "Sign in failed",
        description: (error as Error).message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error: error as Error, data: null };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    // Mock signout for development
    if (isUsingMock()) {
      console.log("Mock signout");
      setUser(null);
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
        });
      }
    } catch (error) {
      console.error("Signout error:", error);
      toast({
        title: "Sign out failed",
        description: (error as Error).message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    if (isUsingMock()) {
      console.log("Mock reset password:", { email });
      return { error: null, data: {} };
    }

    try {
      setLoading(true);
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (response.error) {
        toast({
          title: "Password reset failed",
          description: response.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password reset email sent",
          description: "Check your email for the password reset link.",
        });
      }

      return response;
    } catch (error) {
      console.error("Reset password error:", error);
      toast({
        title: "Password reset failed",
        description: (error as Error).message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error: error as Error, data: null };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: { [key: string]: any }) => {
    if (isUsingMock()) {
      console.log("Mock update profile:", data);
      return {
        error: null,
        data: {
          user: {
            ...mockUser,
            user_metadata: { ...mockUser.user_metadata, ...data },
          },
        },
      };
    }

    try {
      setLoading(true);
      const response = await supabase.auth.updateUser({
        data,
      });

      if (response.error) {
        toast({
          title: "Profile update failed",
          description: response.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        });
      }

      return response;
    } catch (error) {
      console.error("Update profile error:", error);
      toast({
        title: "Profile update failed",
        description: (error as Error).message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error: error as Error, data: null };
    } finally {
      setLoading(false);
    }
  };

  // Check if user has admin role
  const getUserRole = (): UserRole | null => {
    if (!user) return null;
    return (user.user_metadata?.role as UserRole) || "user";
  };

  const isAdmin = getUserRole() === "admin";
  const userRole = getUserRole();

  const value = {
    session,
    user,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    isAdmin,
    userRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
