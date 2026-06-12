"use client";

import { subj } from "@/lib/curriculum";

interface TaskRowProps {
  task: {
    id: string;
    title: string;
    subject: string;
    slot?: string;
    score?: number | null;
    notes?: string;
    status?: string;
  };
  onStatusChange?: (id: string, status: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  showScore?: boolean;
  showNotes?: boolean;
}

export default function TaskRow({
  task,
  onStatusChange,
  onDelete,
  showActions = false,
  showScore = false,
  showNotes = false,
}: TaskRowProps) {
  const subject = subj(task.subject);

  return (
    <div className="task">
      <span className="t-ico">{subject.icon}</span>

      <div className="t-main">
        <div className="t-title">{task.title}</div>
        <div className="t-sub">
          {subject.name}
          {task.slot ? ` · ${task.slot}` : ""}
        </div>

        {showNotes && (
          <input
            className="note-input"
            type="text"
            placeholder="Notes..."
            value={task.notes ?? ""}
            onChange={(e) =>
              onStatusChange?.(task.id, `notes:${e.target.value}`)
            }
          />
        )}
      </div>

      {showScore && (
        <input
          className="score-input"
          type="number"
          min={0}
          max={100}
          placeholder="Score"
          value={task.score ?? ""}
          onChange={(e) =>
            onStatusChange?.(task.id, `score:${e.target.value}`)
          }
        />
      )}

      {showActions && (
        <div className="row" style={{ gap: 6 }}>
          {task.status !== "taught" && (
            <button
              className="btn btn-sm btn-soft"
              onClick={() => onStatusChange?.(task.id, "taught")}
            >
              Mark taught
            </button>
          )}
          {task.status !== "done" && (
            <button
              className="btn btn-sm"
              onClick={() => onStatusChange?.(task.id, "done")}
            >
              Mark done
            </button>
          )}
          {task.status !== "planned" && (
            <button
              className="btn btn-sm btn-soft"
              onClick={() => onStatusChange?.(task.id, "planned")}
            >
              Reopen
            </button>
          )}
          {onDelete && (
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
