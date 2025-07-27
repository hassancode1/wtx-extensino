import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { loading, login } = useAuth();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login({
      username,
      password,
    });
  };
  return (
    <>
      <div className="flex-1 flex flex-col justify-center w-full p-5 mx-auto">
        <div className="text-center mb-4">
          <h2 className="font-semibold text-xl mb-2">Secure Login</h2>
          <p className="text-[0.6rem]  text-muted-foreground">
            Enter your credentials to access the clinical note assistant
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-[0.6rem] font-medium">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 placeholder:text-[0.6rem]  text-[0.6rem]"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-[0.6rem] font-medium">
              Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 placeholder:text-[0.6rem] text-[0.6rem]"
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full bg-[none] px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
