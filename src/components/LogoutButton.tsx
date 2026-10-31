import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "@/context/auth-provider";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

export function LogoutButton() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear token from state and localStorage
    auth?.logout();

    // 2. Redirect to login page and replace history so they can't go back
    navigate("/login", { replace: true });
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleLogout}
      className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </Button>
  );
}