import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import DeleteFeedback from "./delete-feedback";
import { FeedbackWithAuthor } from "@/types";
import { SwitchFeedbackStatus } from "./switch-feedback-status";

interface FeedbackTableProps {
  allFeedback: FeedbackWithAuthor[];
}

export function FeedbackTable({ allFeedback }: FeedbackTableProps) {
  return (
    <Table>
      <TableCaption>Feedback left for your sites</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Feedback</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Visible</TableHead>
          <TableHead className="w-[50px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {allFeedback.map((feedback) => (
          <TableRow key={feedback.id}>
            <TableCell>{feedback.author.name}</TableCell>
            <TableCell className="max-w-[300px]">
              <p className=" truncate">{feedback.text}</p>
            </TableCell>
            <TableCell>
              <Badge variant="secondary" className="truncate">
                {feedback.route}
              </Badge>
            </TableCell>
            <TableCell>
              <SwitchFeedbackStatus feedback={feedback} />
            </TableCell>
            <TableCell>
              <DeleteFeedback feedbackId={feedback.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
