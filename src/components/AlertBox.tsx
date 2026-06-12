interface AlertBoxProps {
  messages: string[];
}

export default function AlertBox({ messages }: AlertBoxProps) {
  if (!messages || messages.length === 0) return null;

  return (
    <div className="card">
      <h2>Needs attention</h2>
      {messages.map((msg, i) => (
        <div key={i} className="alert">
          {msg}
        </div>
      ))}
    </div>
  );
}
