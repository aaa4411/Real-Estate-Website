import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Building, DollarSign, Info, Menu, Map } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserMenu from "@/components/auth/UserMenu";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-xl font-bold text-primary flex items-center gap-2"
              >
                <Home className="h-6 w-6" />
                <span>DreamHome</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/buy"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Building className="mr-1 h-4 w-4" />
                Buy
              </Link>
              <Link
                to="/rent"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Building className="mr-1 h-4 w-4" />
                Rent
              </Link>
              <Link
                to="/sell"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <DollarSign className="mr-1 h-4 w-4" />
                Sell
              </Link>
              <Link
                to="/map"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Map className="mr-1 h-4 w-4" />
                Map View
              </Link>
              <Link
                to="/about"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Info className="mr-1 h-4 w-4" />
                About Us
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
            <UserMenu />
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/buy">Buy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/rent">Rent</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/sell">Sell</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/map">Map View</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/signin">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/signup">Sign Up</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
