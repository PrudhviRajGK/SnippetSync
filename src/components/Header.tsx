
import { Button } from "@/components/ui/button";
import { Icons } from "./Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-10 bg-black/75 backdrop-blur-md px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-black/80 text-white"
        >
          <Icons.chevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-black/80 text-white"
        >
          <Icons.chevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" className="hidden md:flex bg-black text-white border-neutral-700 hover:bg-neutral-800">
          Upgrade
        </Button>
        
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full h-8 pl-1 pr-2 flex gap-2 bg-black hover:bg-neutral-800">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SL</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm">Profile</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-52 bg-neutral-800 border-neutral-700 text-white"
          >
            <DropdownMenuItem className="hover:bg-neutral-700 cursor-pointer">Account</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-neutral-700 cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-neutral-700 cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-neutral-700" />
            <DropdownMenuItem className="hover:bg-neutral-700 cursor-pointer">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
