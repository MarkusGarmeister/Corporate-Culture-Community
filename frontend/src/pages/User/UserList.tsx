import {
  List,
  Datagrid,
  TextField,
  EmailField,
  FunctionField,
  useGetIdentity,
  BulkDeleteButton,
  useUpdateMany,
  useListContext,
  useNotify,
  useRefresh,
  useUnselectAll,
  useDataProvider,
} from "react-admin";
import {
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { NotFound } from "../404NotFound";
import { useState } from "react";

const ApproveButton = () => {
  const { selectedIds } = useListContext();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();
  const unselectAll = useUnselectAll("users");
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await Promise.all(
        selectedIds.map((id) =>
          dataProvider.create(`users/${id}/approve`, { data: {} }),
        ),
      );
      notify(`Successfully approved ${selectedIds.length} user(s)`, {
        type: "success",
      });
      refresh();
      unselectAll();
    } catch {
      notify("Error approving users", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleApprove} disabled={isLoading}>
      {isLoading ? "Approving..." : "Approve"}
    </Button>
  );
};

const BulkChangeRole = () => {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const { selectedIds } = useListContext();
  const [updateMany] = useUpdateMany();
  const notify = useNotify();
  const refresh = useRefresh();
  const unselectAll = useUnselectAll("users");

  const handleConfirm = () => {
    updateMany(
      "users",
      { ids: selectedIds, data: { role: selectedRole } },
      {
        onSuccess: () => {
          notify(`Successfully updated ${selectedIds.length} user(s)`, {
            type: "success",
          });
          refresh();
          unselectAll();
          setOpen(false);
          setSelectedRole("");
        },
        onError: () => {
          notify("Error updating users", { type: "error" });
        },
      },
    );
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Change Role</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Change User Role</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2, minWidth: 200 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRole}
              label="Role"
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="ambassador">Ambassador</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={!selectedRole}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const UserActionButtons = () => (
  <>
    <ApproveButton />
    <BulkChangeRole />
    <BulkDeleteButton />
  </>
);

export const UserList = () => {
  const { data: identity } = useGetIdentity();
  if (identity?.role !== "admin") {
    return <NotFound />;
  }

  return (
    <List>
      <Datagrid bulkActionButtons={<UserActionButtons />} rowClick="show">
        <TextField source="id" />
        <TextField source="first_name" />
        <TextField source="last_name" />
        <EmailField source="email" />
        <TextField source="company" />
        <TextField source="work_position" />
        <FunctionField
          label="Role"
          render={(record: any) => (
            <Chip
              label={record.role}
              color={
                record.role === "admin"
                  ? "error"
                  : record.role === "pending"
                    ? "warning"
                    : "success"
              }
              size="small"
            />
          )}
        />
      </Datagrid>
    </List>
  );
};
