interface NodeData {
  label: string;
  input?: string;
  template?: string;
  output?: string;
  status?: string;
  onChange?: (value: string, field?: string) => void;
}