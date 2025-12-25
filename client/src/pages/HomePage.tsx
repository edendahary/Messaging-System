import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useMessagesQuery } from "../api/messages.service";
import { useDialog } from "../hooks/useDialog";
import CustomDialog from "../components/CustomDialog";
import MessageForm from "../components/messages/MessageForm";
import StatusChip from "../components/StatusChip";

const HomePage = () => {
  const { open, showDialog, hideDialog } = useDialog();
  const { data, isLoading, isError } = useMessagesQuery();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", p: 3, gap: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mb: 2, textAlign: "center" }}
          >
            Messages
          </Typography>
          <Button variant="contained" onClick={showDialog}>
            Add Message
          </Button>
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgba(221, 221, 221, 0.8)" }}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    To
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Content
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Created
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    ID
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography variant="body2">Loading...</Typography>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography color="error">
                      Failed to load messages
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (data?.length ?? 0) === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography color="text.secondary">
                      No messages yet
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data!.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.to}</TableCell>
                    <TableCell sx={{ whiteSpace: "pre-wrap" }}>
                      {row.content}
                    </TableCell>
                    <TableCell>
                      <StatusChip status={row.status} />
                    </TableCell>
                    <TableCell>
                      {new Date(row.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "monospace", fontSize: 12 }}>
                      {row.id}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <CustomDialog
        open={open}
        onClose={hideDialog}
        title="New Message"
        width="700px"
        content={<MessageForm onClose={hideDialog} />}
      />
    </>
  );
};

export default HomePage;
