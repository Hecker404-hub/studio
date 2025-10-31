import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "../user-nav";
import { ThemeToggle } from "../theme-toggle";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex w-full items-center justify-end gap-4">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
