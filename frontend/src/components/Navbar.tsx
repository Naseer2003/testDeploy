// src/components/Navbar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

// shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// axios instance
import { api } from "@/config/api";

const Navbar: React.FC = () => {
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  /* ---------- logout ---------- */
  const handleLogout = () =>
    api
      .post("/user/logout", {}, { withCredentials: true })
      .finally(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("adminToken"); // also clear admin
        navigate("/");
      });

  /* ---------- admin login dialog ---------- */
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", data.token);
      setOpen(false);
      navigate("/home");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <div className="flex">
      <nav className="bg-[#2b2b2b] dark:bg-black border-b text-white dark:text-gray-100 w-full flex items-center px-6 py-2 shadow-md transition-colors duration-300">
        {/* Logo */}
        <div
          className="flex flex-col leading-tight cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <span className="font-bold text-lg tracking-wide">
            DEZIGN <span className="text-red-500">SHARK</span>
            <sup className="text-xs">®</sup>
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-300">
            ALL ABOUT DESIGN
          </span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <ModeToggle />

          {/* show Admin Login only when NOT an admin */}
          {!adminToken && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Admin Login</DialogTitle>
                </DialogHeader>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Enter credentials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Password</Label>
                        <Input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </DialogContent>
            </Dialog>
          )}

          {/* Logout / User login */}
          {token || adminToken ? (
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;