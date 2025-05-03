
import { Icons } from "./Icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="bg-[#121212] min-w-[240px] p-6 hidden md:block">
      <div className="flex items-center">
        <Icons.spotify className="h-10 w-auto text-primary" />
        <span className="ml-2 text-xl font-bold text-white">for Learning</span>
      </div>
      
      <ul className="mt-8 space-y-4">
        <li>
          <Link to="/" className="flex items-center group">
            <Button 
              variant="ghost" 
              className="w-full justify-start px-3 font-semibold text-white"
            >
              <Icons.home className="h-6 w-6 mr-4 text-white" />
              Home
            </Button>
          </Link>
        </li>
        <li>
          <Button 
            variant="ghost" 
            className="w-full justify-start px-3 font-semibold text-muted-foreground hover:text-white"
          >
            <Icons.search className="h-6 w-6 mr-4 text-muted-foreground group-hover:text-white" />
            Search
          </Button>
        </li>
        <li>
          <Button 
            variant="ghost" 
            className="w-full justify-start px-3 font-semibold text-muted-foreground hover:text-white"
          >
            <Icons.library className="h-6 w-6 mr-4 text-muted-foreground group-hover:text-white" />
            Your Library
          </Button>
        </li>
      </ul>
      
      <div className="mt-8 space-y-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start px-3 font-semibold text-muted-foreground hover:text-white"
        >
          <div className="h-6 w-6 mr-4 bg-muted-foreground hover:bg-white rounded-sm flex items-center justify-center">
            <Icons.plus className="h-3 w-3 text-black" />
          </div>
          Create Playlist
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start px-3 font-semibold text-muted-foreground hover:text-white"
        >
          <div className="h-6 w-6 mr-4 bg-gradient-to-br from-purple-800 to-blue-500 rounded-sm flex items-center justify-center">
            <Icons.heart className="h-3 w-3 text-white" />
          </div>
          Liked Lessons
        </Button>
      </div>
      
      <div className="mt-8 pt-8 border-t border-muted">
        <div className="text-sm text-muted-foreground">
          <p className="hover:text-white cursor-pointer py-1">AI & Machine Learning</p>
          <p className="hover:text-white cursor-pointer py-1">History & Culture</p>
          <p className="hover:text-white cursor-pointer py-1">Science & Space</p>
          <p className="hover:text-white cursor-pointer py-1">Art & Literature</p>
          <p className="hover:text-white cursor-pointer py-1">Technology</p>
          <p className="hover:text-white cursor-pointer py-1">Philosophy</p>
        </div>
      </div>
    </div>
  );
}
