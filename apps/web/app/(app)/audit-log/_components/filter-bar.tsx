"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterBarProps = {
  actionFilter: string;
  userFilter: string;
  onActionChange: (value: string) => void;
  onUserChange: (value: string) => void;
  availableActions: string[];
  availableUsers: string[];
};

export function FilterBar({
  actionFilter,
  userFilter,
  onActionChange,
  onUserChange,
  availableActions,
  availableUsers,
}: FilterBarProps) {
  return (
    <div className="mb-6 flex items-center gap-4 rounded-lg border border-wuko-border bg-wuko-card p-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-wuko-text-muted">Action</span>
        <Select value={actionFilter} onValueChange={onActionChange}>
          <SelectTrigger className="h-8 w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actions</SelectItem>
            {availableActions.map((action) => (
              <SelectItem key={action} value={action}>
                {action}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-wuko-text-muted">User</span>
        <Select value={userFilter} onValueChange={onUserChange}>
          <SelectTrigger className="h-8 w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Anyone</SelectItem>
            {availableUsers.map((user) => (
              <SelectItem key={user} value={user}>
                {user}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}